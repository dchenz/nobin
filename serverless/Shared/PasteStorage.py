import base64
import os
import secrets
from datetime import datetime
from typing import Optional

from azure.core.exceptions import ResourceNotFoundError

from Shared.AzureTables import connect_table

table_storage_account = os.environ.get("TableStorageAccount")
if not table_storage_account:
    raise ValueError("Cannot find setting 'TableStorageAccount'")


def create_paste(header: str, body: str, duration: Optional[int]) -> tuple[str, str]:
    current_time = int(datetime.utcnow().timestamp())
    paste_id = generate_paste_id()
    paste_edit_key = secrets.token_hex(16)
    pastes = connect_table(table_storage_account, "pastes")
    pk, rk = to_table_keys(paste_id)
    pastes.create_entity(
        {
            "PartitionKey": pk,
            "RowKey": rk,
            "edit_key": paste_edit_key,
            "created_at": current_time,
            "header": header,
            "body": body,
            "duration": duration,
        }
    )
    return paste_id, paste_edit_key


def read_paste(paste_id: str, edit_key: Optional[str]) -> Optional[dict]:
    try:
        pastes = connect_table(table_storage_account, "pastes")
        pk, rk = to_table_keys(paste_id)
        paste_entity = pastes.get_entity(pk, rk)
        if is_paste_expired(paste_entity):
            # Will be deleted using a schedule triggered clean-up.
            return None
        return {
            "id": paste_id,
            "created_at": paste_entity["created_at"],
            "header": paste_entity["header"],
            "body": paste_entity["body"],
            "duration": paste_entity.get("duration"),
            "editable": paste_entity["edit_key"] == edit_key,
        }
    except ResourceNotFoundError:
        return None


def generate_paste_id() -> str:
    now = datetime.now().timestamp()
    fy2022 = datetime(2022, 7, 1).timestamp()
    minutes_since_fy2022 = int(now - fy2022) // 60
    t_a = minutes_since_fy2022.to_bytes(3, "big")
    t_b = secrets.token_bytes(3)
    # Make the ID look random since the higher-order
    # bytes of minutes_since_fy2022 rarely change.
    collection_id = t_b[0:1] + t_a[0:1] + t_b[1:2] + t_a[1:2] + t_b[2:3] + t_a[2:3]
    return base64.b64encode(collection_id, altchars=b"az").decode()


def is_paste_expired(paste: dict) -> bool:
    current_time = int(datetime.utcnow().timestamp())
    expiry_time = paste["created_at"] + paste["duration"] * 60
    return current_time >= expiry_time


def to_table_keys(paste_id: str) -> tuple[str, str]:
    return paste_id[: len(paste_id) // 2], paste_id[len(paste_id) // 2 :]


def from_table_keys(partition_key: str, row_key: str) -> str:
    return partition_key + row_key

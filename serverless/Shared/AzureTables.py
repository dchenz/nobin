import os

from azure.core.credentials import AzureNamedKeyCredential
from azure.data.tables import TableClient


def connect_table(account: str, table: str) -> TableClient:
    setting = f"StorageAccountKey_{account}"
    storage_account_key = os.environ.get(setting)
    if not storage_account_key:
        raise ValueError(f"Cannot find setting '{setting}'")
    shared_key = AzureNamedKeyCredential(account, storage_account_key)
    return TableClient(
        f"https://{account}.table.core.windows.net",
        table,
        credential=shared_key,
    )

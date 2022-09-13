import logging
from http import HTTPStatus

import azure.functions as func
from jsonschema import ValidationError
from Shared.HttpUtils import get_request_body, respond_fail, respond_success
from Shared.PasteStorage import create_paste


def main(req: func.HttpRequest) -> func.HttpResponse:

    schema = {
        "type": "object",
        "properties": {
            "header": {"type": "string"},
            "body": {"type": "string"},
            "duration": {
                "type": ["integer", "null"],
                "minimum": 5,
                "maximum": 365 * 24 * 60,
            },
        },
        "required": ["header", "body"],
    }

    try:
        body = get_request_body(req, schema)
    except ValidationError as e:
        return respond_fail(HTTPStatus.BAD_REQUEST, str(e))

    paste_id, paste_edit_key = create_paste(
        body["header"], body["body"], body.get("duration")
    )

    logging.info(f"Created a new paste (ID: {paste_id})")

    return respond_success({"id": paste_id, "edit_key": paste_edit_key})

import json
from http import HTTPStatus
from typing import Any

import azure.functions as func
from jsonschema import ValidationError, validate


def respond_success(data: Any) -> func.HttpResponse:
    return func.HttpResponse(
        json.dumps({"success": True, "data": data}),
        status_code=200,
        mimetype="application/json",
    )


def respond_fail(status: HTTPStatus, message: str = "") -> func.HttpResponse:
    return func.HttpResponse(
        json.dumps({"success": False, "data": message}),
        status_code=int(status),
        mimetype="application/json",
    )


def get_request_body(req: func.HttpRequest, schema: dict) -> Any:
    try:
        body = req.get_json()
        validate(body, schema)
        return body
    except ValueError:
        raise ValidationError("Body is required")

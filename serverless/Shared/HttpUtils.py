import json
import logging
from http import HTTPStatus
from typing import Any, Optional

import azure.functions as func
from jsonschema import ValidationError, validate

from Shared.Captcha import verify_captcha_token


def require_captcha(req: func.HttpRequest) -> Optional[func.HttpResponse]:
    captcha_token = req.headers.get("X-GOOGLE-CAPTCHA")
    if not captcha_token or not verify_captcha_token(captcha_token):
        logging.info("Request rejected due to bad captcha token")
        return respond_fail(HTTPStatus.UNAUTHORIZED, "Bad X-GOOGLE-CAPTCHA")


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

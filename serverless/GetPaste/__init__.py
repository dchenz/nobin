import logging
from http import HTTPStatus

import azure.functions as func
from Shared.HttpUtils import respond_fail, respond_success
from Shared.PasteStorage import read_paste


def main(req: func.HttpRequest) -> func.HttpResponse:

    paste_id = req.route_params.get("id")
    if not paste_id:
        return respond_fail(HTTPStatus.BAD_REQUEST)

    paste_edit_key = req.params.get("edit_key")

    paste_object = read_paste(paste_id, paste_edit_key)
    if not paste_object:
        return respond_fail(HTTPStatus.NOT_FOUND)

    logging.info(f"Fetched paste ID {paste_id}")

    return respond_success(paste_object)

import logging
import os
from json import JSONDecodeError

import requests


def verify_captcha_token(token: str) -> bool:
    secret_key = os.environ.get("GoogleCaptchaSecret")
    if not secret_key:
        raise ValueError("Cannot find setting 'GoogleCaptchaSecret'")
    google_endpoint = "https://www.google.com/recaptcha/api/siteverify"
    try:
        response = requests.post(
            google_endpoint, data={"secret": secret_key, "response": token}
        )
        verificationResult = response.json()
        return verificationResult.get("success", False)
    except requests.exceptions.RequestException as e:
        logging.error(str(e))
        return False
    except JSONDecodeError as e:
        logging.error(str(e))
        return False

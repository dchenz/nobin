import { BackendURL } from "../shared/Routes";
import { PasteCreateRequest, PasteRef } from "../shared/types/Paste";
import { Maybe } from "../shared/types/Responses";

/**
 * SubmitPaste sends a POST request to the API for creating a new paste.
 *
 * @param paste         Encrypted paste object.
 * @param captchaToken  Response token from Google Captcha V2.
 *
 * @returns     API response. On success, the "data" field contains the
 *              new paste's ID and edit key.
 *              On failure, the "data" field contains an error message.
 */
export async function submitPaste(
  paste: PasteCreateRequest,
  captchaToken: string
): Promise<Maybe<PasteRef>> {

  const body = {
    header: JSON.stringify(paste.content.header),
    body: paste.content.body,
    duration: paste.duration
  };
  const response = await fetch(`${BackendURL}/api/paste`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-GOOGLE-CAPTCHA": captchaToken
    },
    body: JSON.stringify(body)
  });
  const jsonResult = await response.json();
  if (jsonResult.success) {
    jsonResult.data.editKey = jsonResult.data.edit_key;
    delete jsonResult.data.edit_key;
  }
  return jsonResult;
}

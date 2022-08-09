import { PasteCreateRequest, PasteRef } from "../shared/types/Paste";
import { Maybe } from "../shared/types/Responses";

/**
 * SubmitPaste sends a POST request to the API for creating a new paste.
 *
 * @param paste Encrypted paste object.
 *
 * @returns     API response. On success, the "data" field contains the
 *              new paste's ID and edit key.
 *              On failure, the "data" field contains an error message.
 */
export async function submitPaste(paste: PasteCreateRequest): Promise<Maybe<PasteRef>> {
  const body = {
    header: JSON.stringify(paste.content.header),
    body: paste.content.body,
    duration: paste.duration
  };
  const response = await fetch("/api/paste", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
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
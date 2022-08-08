import { PasteCreateRequest, PasteRef } from "../shared/types/Paste";
import { Maybe } from "../shared/types/Responses";

/**
 * SubmitPaste sends a POST request to the API for creating a new paste.
 *
 * @param paste Encrypted paste object.
 *
 * @returns     API response. On success, the "data" field contains the
 *              new paste's ID and edit key, if it was configured as editable.
 *              On failure, the "data" field contains an error message.
 */
export async function submitPaste(paste: PasteCreateRequest): Promise<Maybe<PasteRef>> {
  const body = {
    header: JSON.stringify(paste.content.header),
    body: paste.content.body,
    duration: paste.duration,
    editable: paste.editable
  };
  const response = await fetch("/api/paste", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  return await response.json();
}
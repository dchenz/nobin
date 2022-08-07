import { Paste, PasteOptions, PasteSubmitResponse } from "../shared/types/Paste";

/**
 * SubmitPaste sends a POST request to the API for creating a new paste.
 *
 * @param paste Encrypted paste object.
 * @param ops   Other paste settings (expiry, can edit).
 *
 * @returns     API response. On success, the "data" field contains the
 *              new paste's ID and edit key, if it was configured as editable.
 *              On failure, the "data" field contains an error message.
 */
export async function submitPaste(paste: Paste, ops: PasteOptions): Promise<PasteSubmitResponse> {
  const body = {
    headers: JSON.stringify(paste.header),
    content: paste.body,
    duration: ops.duration,
    editable: ops.editable
  };
  const response = await fetch("/paste", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  return await response.json();
}
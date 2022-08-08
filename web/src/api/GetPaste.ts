import { PasteFull } from "../shared/types/Paste";

/**
 * GetPaste sends a GET request to the API for reading a specific paste.
 *
 * @param id Paste ID.
 * @returns  Paste object, if it exists, else returns NULL.
 */
export async function getPaste(id: string): Promise<PasteFull | null> {
  const url = "/api/paste/" + encodeURIComponent(id);
  const response = await fetch(url);
  const { success, data } = await response.json();
  if (!success && response.status == 404) {
    return null;
  }
  return {
    id: data.id,
    createdAt: data.created_at,
    content: {
      header: JSON.parse(data.header),
      body: data.body
    },
    editable: data.editable,
    duration: data.duration
  };
}
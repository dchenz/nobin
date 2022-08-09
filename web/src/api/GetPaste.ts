import { PasteFull } from "../shared/types/Paste";

/**
 * GetPaste sends a GET request to the API for reading a specific paste.
 *
 * @param id      Paste ID.
 * @param editKey Secret key that allows paste editing.
 * @returns       Paste object, if it exists, else returns NULL.
 */
export async function getPaste(id: string, editKey?: string): Promise<PasteFull | null> {
  let url = "/api/paste/" + encodeURIComponent(id);
  if (editKey) {
    url += `?edit_key=${encodeURIComponent(editKey)}`;
  }
  const response = await fetch(url);
  const { success, data } = await response.json();
  if (!success && response.status == 404) {
    return null;
  }
  return {
    id: data.id,
    createdAt: new Date(data.created_at * 1000),
    content: {
      header: JSON.parse(data.header),
      body: data.body
    },
    editable: data.editable,
    duration: data.duration
  };
}
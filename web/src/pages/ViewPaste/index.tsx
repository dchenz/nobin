import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPaste } from "../../api/GetPaste";
import { PasteFull } from "../../shared/types/Paste";
import PasteNotFound from "./PasteNotFound";
import UnlockPage from "./UnlockPage";

/**
 * ViewPaste is the page for reading a paste (requires decryption).
 * It is rendered on the route "/p/{id}".
 */
export default function ViewPaste(): JSX.Element {
  const [paste, setPaste] = useState<PasteFull | null>(null);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      console.error("ID should not be undefined in ViewPaste.");
      return;
    }
    getPaste(id)
      .then((res: PasteFull | null) => {
        setPaste(res);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // The API should be fairly quick to respond.
  if (isLoading) {
    return <></>;
  }

  // If the page is not loading anymore and paste state
  // is still NULL, then the paste ID does not exist.
  if (!paste) {
    return <PasteNotFound />;
  }

  return <UnlockPage paste={paste} />;
}
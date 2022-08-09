import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getPaste } from "../../api/GetPaste";
import { PasteFull } from "../../shared/types/Paste";
import PasteNotFound from "./PasteNotFound";
import UnlockPage from "./UnlockPage";
import ViewPastePage from "./ViewPastePage";

/**
 * ViewPaste is the page for reading a paste (requires decryption).
 * It is rendered on the route "/p/{id}".
 */
export default function ViewPaste(): JSX.Element {
  const [paste, setPaste] = useState<PasteFull | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isUnlocked, setUnlocked] = useState(false);
  const { id } = useParams();
  const [queryParams] = useSearchParams();

  useEffect(() => {
    if (!id) {
      console.error("ID should not be undefined in ViewPaste.");
      return;
    }
    getPaste(id, queryParams.get("edit_key") ?? undefined)
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

  if (isUnlocked) {
    return <ViewPastePage paste={paste} />;
  }

  const onDecrypt = (decrypted: PasteFull) => {
    setPaste(decrypted);
    setUnlocked(true);
  };

  return (
    <UnlockPage
      paste={paste}
      onDecrypt={onDecrypt}
    />
  );
}
import { Container, Grid, TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import { PasteFull } from "../../shared/types/Paste";
import EditButtons from "./EditButtons";
import PasteInfoTable from "./PasteInfoTable";

type ViewPastePageProps = {
  paste: PasteFull
}

/**
 * ViewPastePage is the component for viewing a decrypted paste.
 */
export default function ViewPastePage({ paste }: ViewPastePageProps): JSX.Element {
  const [pasteContent, setPasteContent] = useState(paste.content.body);
  const [isEditing, setEditing] = useState(false);

  const onPasteDelete = () => {
    return;
  };

  return (
    <Container>
      <Grid container py={3}>
        <Grid item md={8} p={1} width="100%">
          <PasteInfoTable paste={paste} />
        </Grid>
        <Grid item md={4} p={1} width="100%" textAlign="right">
          {
            paste.editable ?
              <EditButtons
                isEditing={isEditing}
                setEditing={setEditing}
                deletePaste={onPasteDelete}
              /> : null
          }
        </Grid>
        <Grid item md={12} p={1} width="100%">
          <TextareaAutosize
            className="paste-input"
            placeholder="Paste here..."
            minRows={12}
            value={pasteContent}
            onChange={(e) => {
              if (isEditing) {
                setPasteContent(e.target.value);
              }
            }}
            readOnly={!isEditing}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

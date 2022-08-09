import { Button, ButtonGroup, Container, Grid, TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import { PasteFull } from "../../shared/types/Paste";
import PasteInfoTable from "./PasteInfoTable";

type ViewPastePageProps = {
  paste: PasteFull
}

/**
 * ViewPastePage is the component for viewing a decrypted paste.
 */
export default function ViewPastePage({ paste }: ViewPastePageProps): JSX.Element {
  const [pasteContent, setPasteContent] = useState(paste.content.body);
  return (
    <Container>
      <Grid container py={3}>
        <Grid item md={8} p={1} width="100%">
          <PasteInfoTable paste={paste} />
        </Grid>
        <Grid item md={4} p={1} width="100%" textAlign="right">
          {
            paste.editable ?
              <ButtonGroup orientation="vertical">
                <Button
                  variant="contained"
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                >
                  Delete
                </Button>
              </ButtonGroup> : null
          }
        </Grid>
        <Grid item md={12} p={1} width="100%">
          <TextareaAutosize
            className="paste-input"
            placeholder="Paste here..."
            minRows={12}
            value={pasteContent}
            onChange={(e) => {
              if (paste.editable) {
                setPasteContent(e.target.value);
              }
            }}
            readOnly={!paste.editable}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

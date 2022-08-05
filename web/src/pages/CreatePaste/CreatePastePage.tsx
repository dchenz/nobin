import { Container, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import "./styles.scss";

export default function CreatePastePage(): JSX.Element {
  const [pasteContent, setPasteContent] = useState("");
  return (
    <Container>
      <Grid container>
        <Grid item md={12}>
          <h1>Create a new encrypted paste</h1>
          <TextField
            className="paste-input"
            placeholder="Paste here..."
            fullWidth
            multiline
            rows={16}
            value={pasteContent}
            onChange={(e) => setPasteContent(e.target.value)}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
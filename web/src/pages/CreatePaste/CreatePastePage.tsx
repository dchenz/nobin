import { Container, Grid, TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import Error from "../../components/Error";
import NewPassword from "../../components/NewPassword";
import ExpiryPicker from "./ExpiryPicker";
import "./styles.scss";

/**
 * CreatePastePage is the main component for creating a new paste.
 */
export default function CreatePastePage(): JSX.Element {
  const [pasteContent, setPasteContent] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [expiryDuration, setExpiryDuration] = useState(0); // Minutes

  return (
    <Container>
      <Grid container component="form">
        <Grid item xs={12} p={1} width="100%">
          <h1>Create a new encrypted paste</h1>
          <TextareaAutosize
            className="paste-input"
            placeholder="Paste here..."
            minRows={12}
            value={pasteContent}
            onChange={(e) => setPasteContent(e.target.value)}
          />
        </Grid>
        <Grid item md={6} p={1} width="100%">
          <h3>Password</h3>
          <Error variant="warning">
            <NewPassword
              password={password}
              confirmPassword={confirmPassword}
              onPasswordChange={setPassword}
              onConfirmPasswordChange={setConfirmPassword}
            />
          </Error>
        </Grid>
        <Grid item md={6} p={1} width="100%">
          <h3>Expiry</h3>
          <ExpiryPicker
            minutesDuration={expiryDuration}
            setMinutesDuration={setExpiryDuration}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
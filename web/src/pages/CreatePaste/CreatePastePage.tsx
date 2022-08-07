import { Button, Container, Grid, TextareaAutosize } from "@mui/material";
import React, { useMemo, useState } from "react";
import { submitPaste } from "../../api/SubmitPaste";
import Error from "../../components/Error";
import { encrypt } from "../../functions/Crypto";
import { PasteSubmitResponse } from "../../shared/types/Paste";
import ExpiryPicker from "./ExpiryPicker";
import NewPassword from "./NewPassword";
import "./styles.scss";

/**
 * CreatePastePage is the main component for creating a new paste.
 */
export default function CreatePastePage(): JSX.Element {
  const [pasteContent, setPasteContent] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [duration, setDuration] = useState(0); // Minutes

  const canSubmit = useMemo(() => {
    // Fail submission if password is left blank.
    // Fail submission if passwords don't match.
    if (password == "" || password != confirmPassword) {
      return false;
    }
    // Fail submission if duration is non-zero and less than 5 minutes.
    // Fail submission if duration is greater than one year.
    if ((duration > 0 && duration < 5) || duration > 365 * 24 * 60) {
      return false;
    }
    // Fail submission if paste is blank.
    if (pasteContent == "") {
      return false;
    }
    return true;
  }, [password, confirmPassword, duration, pasteContent]);

  const onPasteSubmit = () => {
    if (canSubmit) {
      const encryptedPaste = encrypt(pasteContent, password);
      submitPaste(encryptedPaste, {
        duration: duration,
        editable: false
      })
        .then((response: PasteSubmitResponse) => console.log(response))
        .catch(console.error);
    }
  };

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
          <Error>
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
          <Error>
            <ExpiryPicker
              minutesDuration={duration}
              setMinutesDuration={setDuration}
            />
          </Error>
        </Grid>
        <Grid item md={12} p={1} width="100%">
          <Button
            variant="contained"
            onClick={onPasteSubmit}
            disabled={!canSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}


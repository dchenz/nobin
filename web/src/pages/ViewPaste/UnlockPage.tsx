import { Box, Button, Container, Grid, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import Error from "../../components/Error";
import ErrorContext from "../../components/Error/Context";
import { decrypt } from "../../functions/Crypto";
import { PasteFull } from "../../shared/types/Paste";

type UnlockPageProps = {
  paste: PasteFull
  onDecrypt: (_: PasteFull) => void
}

/**
 * UnlockPage is the component that prompts the user for paste password.
 */
export default function UnlockPage(props: UnlockPageProps): JSX.Element {
  return (
    <Container>
      <Grid container py={3}>
        <Grid item md={12} p={1} width="100%" textAlign="center">
          <h1>Unlock this paste</h1>
          <Box width="50%" margin="0 auto">
            <Error>
              <UnlockPasswordPrompt {...props} />
            </Error>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

/**
 * UnlockPasswordPrompt displays the password input field and
 * includes an appropriate error if the entered password is incorrect.
 */
function UnlockPasswordPrompt({ paste, onDecrypt }: UnlockPageProps): JSX.Element {
  const { setError } = useContext(ErrorContext);
  const [password, setPassword] = useState("");

  const onPasswordSubmit = () => {
    if (password == "") {
      return;
    }
    const plainTextPaste = decrypt(paste.content, password);
    if (plainTextPaste) {
      const p = { ...paste, content: { ...paste.content } };
      p.content.body = plainTextPaste;
      onDecrypt(p);
    } else {
      setError({
        message: "Incorrect password.",
        severity: "error"
      });
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onPasswordSubmit();
    }}>
      <Box py={1}>
        <TextField
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(null);
          }}
          fullWidth
        />
      </Box>
      <Box py={1}>
        <Button
          variant="contained"
          type="submit"
          disabled={password == ""}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
}
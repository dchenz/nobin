import { Alert, Box, FormGroup, TextField } from "@mui/material";
import React, { useState } from "react";

type NewPasswordProps = {
  password: string
  confirmPassword: string
  onPasswordChange: (_: string) => void
  onConfirmPasswordChange: (_: string) => void
}

export default function NewPassword(props: NewPasswordProps): JSX.Element {
  const [mismatch, setMismatch] = useState(false);

  // Test for password mismatch when both fields are non-empty.
  const onInputBlur = () => {
    if (props.password && props.confirmPassword) {
      setMismatch(props.password != props.confirmPassword);
    }
  };

  return (
    <React.Fragment>
      <FormGroup>
        <Box py={1}>
          <TextField
            type="password"
            placeholder="Enter password"
            value={props.password}
            onChange={(e) => {
              props.onPasswordChange(e.target.value);
              setMismatch(false);
            }}
            onBlur={onInputBlur}
            fullWidth
          />
        </Box>
        <Box py={1}>
          <TextField
            type="password"
            placeholder="Confirm password"
            value={props.confirmPassword}
            onChange={(e) => {
              props.onConfirmPasswordChange(e.target.value);
              setMismatch(false);
            }}
            onBlur={onInputBlur}
            fullWidth
          />
        </Box>
      </FormGroup>
      {
        mismatch ?
          <Alert severity="warning">
            Passwords don&apos;t match...
          </Alert> : null
      }
    </React.Fragment>
  );
}
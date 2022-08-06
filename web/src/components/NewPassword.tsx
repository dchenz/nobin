import { Box, FormGroup, TextField } from "@mui/material";
import React, { useContext } from "react";
import ErrorContext from "./Error/Context";

type NewPasswordProps = {
  password: string
  confirmPassword: string
  onPasswordChange: (_: string) => void
  onConfirmPasswordChange: (_: string) => void
}

export default function NewPassword(props: NewPasswordProps): JSX.Element {
  const { setError, clearError } = useContext(ErrorContext);

  // Test for password mismatch when both fields are non-empty.
  const onInputBlur = () => {
    if (props.password && props.confirmPassword) {
      if (props.password != props.confirmPassword) {
        setError("Passwords don't match...");
      }
    }
  };

  return (
    <FormGroup>
      <Box py={1}>
        <TextField
          type="password"
          placeholder="Enter password"
          value={props.password}
          onChange={(e) => {
            props.onPasswordChange(e.target.value);
            clearError();
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
            clearError();
          }}
          onBlur={onInputBlur}
          fullWidth
        />
      </Box>
    </FormGroup>
  );
}
import { Box, FormGroup, TextField } from "@mui/material";
import React, { useContext } from "react";
import ErrorContext from "../../components/Error/Context";
import { MISMATCH_PASSWORDS } from "./Validation";

type NewPasswordProps = {
  password: string
  confirmPassword: string
  onPasswordChange: (_: string) => void
  onConfirmPasswordChange: (_: string) => void
}

/**
 * NewPassword renders two input fields to create a password.
 * If the values don't match, it displays a warning.
 */
export default function NewPassword(props: NewPasswordProps): JSX.Element {
  const { setError } = useContext(ErrorContext);

  // Test for password mismatch when both fields are non-empty.
  const onInputBlur = () => {
    if (props.password && props.confirmPassword) {
      if (props.password != props.confirmPassword) {
        setError(MISMATCH_PASSWORDS);
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
            setError(null);
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
            setError(null);
          }}
          onBlur={onInputBlur}
          fullWidth
        />
      </Box>
    </FormGroup>
  );
}
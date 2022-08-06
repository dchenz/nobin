import { Alert, AlertColor, Box } from "@mui/material";
import React, { useState } from "react";
import ErrorContext, { ErrorMessage } from "./Context";

type ErrorProps = {
  variant: AlertColor
  children: React.ReactNode
}

export default function Error(props: ErrorProps): JSX.Element {
  const [error, setError] = useState<ErrorMessage>(null);
  const clearError = () => setError(null);
  return (
    <ErrorContext.Provider value={{ error, setError, clearError }}>
      {props.children}
      <Box py={1}>
        {
          error ?
            <Alert severity={props.variant}>
              {error}
            </Alert> : null
        }
      </Box>
    </ErrorContext.Provider>
  );
}
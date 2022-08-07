import { Alert, Box } from "@mui/material";
import React, { useState } from "react";
import ErrorContext, { ErrorMessage } from "./Context";

type ErrorProps = {
  overrideError?: ErrorMessage
  children: React.ReactNode
}

/**
 * Error is a wrapper over React components that provides
 * error utilities using context. It allows any child component
 * to trigger/hide an alert that displays below them.
 */
export default function Error(props: ErrorProps): JSX.Element {
  const [error, setError] = useState<ErrorMessage | null>(null);
  const displayedError = props.overrideError ?? error;
  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {props.children}
      <Box py={1}>
        {
          displayedError ?
            <Alert severity={displayedError.severity}>
              {displayedError.message}
            </Alert> : null
        }
      </Box>
    </ErrorContext.Provider>
  );
}
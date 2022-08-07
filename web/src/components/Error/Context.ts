import { AlertColor } from "@mui/material";
import { createContext } from "react";

export type ErrorMessage = {
  message: string
  severity: AlertColor
}

export type ErrorContextType = {
  error: ErrorMessage | null
  setError: (_: ErrorMessage | null) => void
}

export default createContext<ErrorContextType>({
  error: null,
  setError: (_: ErrorMessage | null) => { return; }
});
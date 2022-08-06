import { createContext } from "react";

export type ErrorMessage = string | null

export type ErrorContextType = {
  error: ErrorMessage
  setError: (_: ErrorMessage) => void
  clearError: () => void
}

export default createContext<ErrorContextType>({
  error: null,
  setError: (_: ErrorMessage) => { return; },
  clearError: () => { return; }
});
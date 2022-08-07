import { ErrorMessage } from "../../components/Error/Context";

export const MISMATCH_PASSWORDS: ErrorMessage = {
  message: "Passwords don't match.",
  severity: "warning"
};

export const MINIMUM_DURATION: ErrorMessage = {
  message: "Minimum paste duration is 5 minutes.",
  severity: "error"
};

export const MAXIMUM_DURATION: ErrorMessage = {
  message: "Maximum paste duration is 1 year.",
  severity: "error"
};
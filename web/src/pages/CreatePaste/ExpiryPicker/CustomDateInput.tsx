import { TextField } from "@mui/material";
import React, { forwardRef } from "react";

type DateInputProps = {
  value?: string,
  onClick?: () => void
}

/**
 * DateInput is a custom input component used by DatePicker
 * that activates the date picker on click. It shows the selected
 * date formatted or "No Expiry", if none is selected.
 */
const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  (props, ref): JSX.Element => (
    <TextField
      ref={ref}
      value={props.value == "" ? "No Expiry" : props.value}
      onClick={props.onClick}
      fullWidth
    />
  )
);
DateInput.displayName = "DateInput";

export default DateInput;
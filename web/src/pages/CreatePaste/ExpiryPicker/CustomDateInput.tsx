import { TextField } from "@mui/material";
import React, { forwardRef } from "react";

type DateInputProps = {
  value?: string,
  onClick?: () => void
}

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
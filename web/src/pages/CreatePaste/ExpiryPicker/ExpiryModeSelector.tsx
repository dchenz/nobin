import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useContext } from "react";
import ErrorContext from "../../../components/Error/Context";

type ExpiryModeSelectorProps = {
  mode: string
  setMode: (_: string) => void
}

/**
 * ExpiryModeSelector renders radio buttons to select an input mode.
 * The value can be either "duration" (default) or "date".
 */
function ExpiryModeSelector(props: ExpiryModeSelectorProps): JSX.Element {
  const { clearError } = useContext(ErrorContext);
  return (
    <RadioGroup
      value={props.mode}
      onChange={(e) => {
        props.setMode(e.target.value);
        clearError();
      }}
      row
    >
      <FormControlLabel
        control={<Radio />}
        value="duration"
        label="Duration"
      />
      <FormControlLabel
        control={<Radio />}
        value="date"
        label="Date"
      />
    </RadioGroup>
  );
}

export default ExpiryModeSelector;
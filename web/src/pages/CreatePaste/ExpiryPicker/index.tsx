import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useState } from "react";
import ExpiryDatePicker from "./ExpiryDatePicker";
import ExpiryDurationPicker from "./ExpiryDurationPicker";

type ExpiryPickerProps = {
  minutesDuration: number
  setMinutesDuration: (_: number) => void
}

export default function ExpiryPicker(props: ExpiryPickerProps): JSX.Element {
  const [mode, setMode] = useState("duration");
  return (
    <React.Fragment>
      <Box py={1}>
        {
          mode == "duration" ?
            <ExpiryDurationPicker {...props} /> :
            <ExpiryDatePicker {...props} />
        }
      </Box>
      <Box py={1}>
        <RadioGroup
          value={mode}
          onChange={(e) => setMode(e.target.value)}
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
      </Box>
    </React.Fragment>
  );
}
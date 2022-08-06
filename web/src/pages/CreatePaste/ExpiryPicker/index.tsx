import { Box } from "@mui/material";
import React, { useState } from "react";
import Error from "../../../components/Error";
import ExpiryDatePicker from "./ExpiryDatePicker";
import ExpiryDurationPicker from "./ExpiryDurationPicker";
import ExpiryModeSelector from "./ExpiryModeSelector";

type ExpiryPickerProps = {
  minutesDuration: number
  setMinutesDuration: (_: number) => void
}

/**
 * ExpiryPicker handles the selection of an expiry value in minutes.
 * The user can choose either "duration" or "date" input modes.
 */
export default function ExpiryPicker(props: ExpiryPickerProps): JSX.Element {
  const [mode, setMode] = useState("duration");
  return (
    <Error variant="warning">
      <Box py={1}>
        {
          mode == "duration" ?
            <ExpiryDurationPicker {...props} /> :
            <ExpiryDatePicker {...props} />
        }
      </Box>
      <Box py={1}>
        <ExpiryModeSelector
          mode={mode}
          setMode={setMode}
        />
      </Box>
    </Error>
  );
}
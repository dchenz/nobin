import { FormGroup, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

type ExpiryDurationPickerProps = {
  minutesDuration: number
  setMinutesDuration: (_: number) => void
}

/**
 * ExpiryDurationPicker contains two input fields. The text field allows
 * only non-negative integer values. The dropdown is used to select
 * a unit of time, which can be "minutes", "hours" (default) or "days".
 */
function ExpiryDurationPicker(props: ExpiryDurationPickerProps): JSX.Element {
  const [durationUnits, setDurationUnits] = useState("hours");
  const [numericText, setNumericText] = useState("0");

  // Don't change value if non-digits are typed, including negative numbers.
  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numString = e.target.value;
    if (/^\d*$/.test(numString)) {
      setNumericText(numString);
    }
  };

  // If input is left blank, set value to 0,
  // otherwise convert value into minutes.
  const onDurationChange = () => {
    if (numericText == "") {
      props.setMinutesDuration(0);
      setNumericText("0");
    } else {
      let units = parseInt(numericText);
      if (durationUnits == "hours") {
        units *= 60;
      } else if (durationUnits == "days") {
        units *= 1440;
      }
      props.setMinutesDuration(units);
    }
  };

  useEffect(onDurationChange, [durationUnits]);

  return (
    <FormGroup row>
      <TextField
        type="text"
        value={numericText}
        onChange={onNumberChange}
        onBlur={onDurationChange}
        sx={{ width: "50%" }}
      />
      <Select
        value={durationUnits}
        onChange={(e) => setDurationUnits(e.target.value)}
        sx={{ width: "50%" }}
      >
        <MenuItem value="minutes">minutes</MenuItem>
        <MenuItem value="hours">hours</MenuItem>
        <MenuItem value="days">days</MenuItem>
      </Select>
    </FormGroup>
  );
}

export default ExpiryDurationPicker;
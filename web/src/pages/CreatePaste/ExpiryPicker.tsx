import { Box, FormGroup, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import ErrorContext from "../../components/Error/Context";
import { MAXIMUM_DURATION, MINIMUM_DURATION } from "./Validation";

type ExpiryDurationPickerProps = {
  minutesDuration: number
  setMinutesDuration: (_: number) => void
}

/**
 * ExpiryDurationPicker contains two input fields. The text field allows
 * only non-negative integer values. The dropdown is used to select
 * a unit of time, which can be "minutes", "hours" (default) or "days".
 */
export default function ExpiryPicker(props: ExpiryDurationPickerProps): JSX.Element {
  const { error, setError } = useContext(ErrorContext);
  const [durationUnits, setDurationUnits] = useState("hours");
  const [numericText, setNumericText] = useState("0");

  useEffect(() => {
    if (props.minutesDuration == 0) {
      setError(null);
      return;
    }
    if (props.minutesDuration < 5) {
      setError(MINIMUM_DURATION);
    } else if (props.minutesDuration > 365 * 24 * 60) {
      setError(MAXIMUM_DURATION);
    } else {
      setError(null);
    }
  }, [props.minutesDuration]);

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
        units *= 60 * 24;
      }
      props.setMinutesDuration(units);
    }
  };

  // Re-compute the number of minutes if user selects another time unit.
  useEffect(onDurationChange, [durationUnits]);

  // Convert the minutes duration into expected expiry datetime.
  const expiryDateText = useMemo(() => {
    if (props.minutesDuration == 0) {
      return "Expiry: None";
    }
    const now = new Date();
    const expiry = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes() + props.minutesDuration
    );
    return `Expiry: ${expiry.toLocaleString()}`;
  }, [props.minutesDuration]);

  return (
    <React.Fragment>
      <Box py={1}>
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
      </Box>
      {
        error ? null :
          <Box py={1}>
            <Typography color="secondary">
              <i>{expiryDateText}</i>
            </Typography>
          </Box>
      }
    </React.Fragment>
  );
}

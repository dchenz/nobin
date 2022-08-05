import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomDateInput from "./CustomDateInput";
import "./styles.scss";

type ExpiryDatePickerProps = {
  minutesDuration: number
  setMinutesDuration: (_: number) => void
}

export default function ExpiryDatePicker(props: ExpiryDatePickerProps): JSX.Element {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const now = new Date();

  // Timezones shouldn't matter here since only the time difference is needed.
  const onDateSelect = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const expiryTime = date.getTime();
      const minutesUntilExpire = Math.floor((expiryTime - now.getTime()) / 60000);
      props.setMinutesDuration(minutesUntilExpire);
    }
  };

  // Yesterday and days before yesterday shouldn't be selectable.
  // TODO: Show error if the selected time is before now.
  const todayOrLater = (date: Date) =>
    date >= new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return (
    <DatePicker
      selected={selectedDate}
      onChange={onDateSelect}
      placeholderText="Select expiry time"
      customInput={<CustomDateInput />}
      filterDate={todayOrLater}
      dateFormat="do MMMM yyyy, h:mm a"
      showTimeInput
      isClearable
      closeOnScroll
    />
  );
}


import React, { FC, useEffect, useState } from "react";

import BaseDatetimeInput from "./BaseDatetimeInput";
import BaseInput from './BaseInput'
interface AppProps {
  error?: React.ReactNode;
  onChange?: (dateTime: any) => void;
}

const DatetimePicker: FC<AppProps> = ({ onChange, error }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [dateTime, setDatetime] = useState(null);

  useEffect(() => {
    if (dateTime === null) return;

    if (onChange) {
      onChange(dateTime);
    }
  }, [dateTime]);

  return (
    <section
      className={`gap-10 rounded-md bg-white px-7 py-3 ring-1 ring-gray-200 ${
        error && "ring-red-500"
      }`}
    >
      <div className="box-content grid grid-cols-1 gap-x-10 gap-y-6">
        <BaseDatetimeInput
          onChange={(date) => setStartDate(date)}
          label="Start on a specific date & time"
        />
        <BaseInput
          onChange={(date) => setEndDate(date)}
          label="End on a specific date & time"
        />
      </div>
      {error && (
        <div className="mt-1 rounded bg-red-100 px-2 py-1 text-sm text-red-700">
          Please correct the errors highlighted.
        </div>
      )}
    </section>
  );
};

export default DateTimeRangePicker;

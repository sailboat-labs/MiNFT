import React, { FC, useEffect, useState } from "react";

import BaseDatePicker from "./BaseDatePicker";

interface AppProps {
  error?: React.ReactNode;
  onRangeChange?: (startDate: Date, endDate: Date) => void;
}

const DateTimeRangePicker: FC<AppProps> = ({ onRangeChange, error }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    if (startDate === null && endDate === null) return;

    if (onRangeChange) {
      onRangeChange(startDate as Date, endDate as Date);
    }
  }, [startDate, endDate]);

  return (
    <section
      className={`gap-10 rounded-md bg-white p-5 ring-1 ring-gray-200 ${
        error && "ring-red-500"
      }`}
    >
      <div className="box-content grid w-fit grid-cols-2 gap-x-10">
        <BaseDatePicker
          onChange={(date) => setStartDate(date)}
          label="Start on a specific date & time"
        />
        <BaseDatePicker
          onChange={(date) => setEndDate(date)}
          label="End on a specific date & time"
        />
      </div>
      {error && (
        <div className="mt-1 rounded bg-red-100 px-2 py-1 text-sm text-red-700">
          Lorem ipsum dolor sit.
        </div>
      )}
    </section>
  );
};

export default DateTimeRangePicker;
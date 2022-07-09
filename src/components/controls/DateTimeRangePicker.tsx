import React from "react";

import BaseDatePicker from "./BaseDatePicker";

const DateTimeRangePicker = () => {
  return (
    <section className="gap-10">
      <div className="box-content grid w-fit grid-cols-2 gap-x-10 rounded-md bg-white p-5 ring-1 ring-gray-200">
        <BaseDatePicker label="Start on a specific date & time" />
        <BaseDatePicker label="End on a specific date & time" />
      </div>
    </section>
  );
};

export default DateTimeRangePicker;

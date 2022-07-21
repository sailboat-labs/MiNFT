import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useState } from "react";

const WhitelistDates = () => {
  const [value, setValue] = useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <>
      {" "}
      <DesktopDatePicker
        label="Date desktop"
        inputFormat="MM/dd/yyyy"
        value={value}
        onChange={handleChange}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        renderInput={(params: any) => <TextField {...params} />}
      />
    </>
  );
};

export default WhitelistDates;

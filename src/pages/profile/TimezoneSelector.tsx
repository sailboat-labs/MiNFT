import { useState } from "react";
import TimezoneSelect from "react-timezone-select";

export default function TimezoneSelector() {
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  return (
    <div className="mt-10  flex flex-col items-center">
      <TimezoneSelect
        className="min-w-36"
        value={selectedTimezone}
        onChange={(e) => {
          setSelectedTimezone(e.value);
        }}
      />
      <div className="mt-2">{JSON.stringify(selectedTimezone, null, 2)}</div>
    </div>
  );
}

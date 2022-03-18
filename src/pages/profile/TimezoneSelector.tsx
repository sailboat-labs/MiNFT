import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMoralis } from "react-moralis";
import TimezoneSelect from "react-timezone-select";

import { User } from "@/types";

interface ITimeZoneSelectorProps {
  timeZone?: string;
}

export default function TimezoneSelector({ timeZone }: ITimeZoneSelectorProps) {
  const { account } = useMoralis();
  const [selectedTimezone, setSelectedTimezone] = useState(
    timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  async function updateTimeZone() {
    const user: User = {
      walletId: account!,
      timeZone: selectedTimezone,
      lastUpdated: new Date().toISOString(),
    };

    

    const { data } = await axios.put("/api/user", { user });

    if (data.success) {
      // toast.success(`Updated`);
    } else {
      toast.error(`Unable to update`);
    }
  }


  useEffect(()=>{
    if(!selectedTimezone) return;
    updateTimeZone()
  },[selectedTimezone])

  return (
    <div className="mt-10  flex flex-col items-center">
      <TimezoneSelect
        className="min-w-36"
        value={selectedTimezone}
        onChange={(e) => {
          setSelectedTimezone(e.value);
        }}
      />
      <div className="mt-2">{JSON.stringify(selectedTimezone)}</div>
    </div>
  );
}

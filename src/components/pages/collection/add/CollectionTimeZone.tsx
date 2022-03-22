import { useEffect, useState } from "react";
import TimezoneSelect from "react-timezone-select";

import useAuthenticationDialog from "@/hooks/UseAuthDialog";

type props = {
  setCollectionTimezone: any;
  collectionTimezone: string;
};

export default function CollectionTimezoneSelector({
  setCollectionTimezone,
  collectionTimezone,
}: props) {
  const [selectedTimezone, setSelectedTimezone] =
    useState<string>(collectionTimezone);

  const { account, isAuthenticated } = useAuthenticationDialog();

  useEffect(()=>{
    if(!collectionTimezone) return;
    setSelectedTimezone(collectionTimezone)
  },[collectionTimezone])

  return (
    <div className="flex flex-col items-center">
      <TimezoneSelect
        className="min-w-36"
        value={selectedTimezone}
        onChange={(e) => {
          setSelectedTimezone(e.value);
          setCollectionTimezone(e.value);
        }}
      />
      {/* <div className="mt-2">
        {selectedTimezone ?? user?.timeZone ?? "Etc/GMT"}
      </div> */}
    </div>
  );
}

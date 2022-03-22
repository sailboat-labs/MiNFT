import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { zonedTimeToUtc } from "date-fns-tz";
import { useRouter } from "next/router";
import { useEffect } from "react";

import useAuthenticationDialog from "@/hooks/UseAuthDialog";
import useUserData from "@/hooks/useUserData";
import TimezoneSelector from "@/pages/profile/TimezoneSelector";
import CollectionTimezoneSelector from "./CollectionTimeZone";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MintDates(props: any) {
  const { user, setWalletId } = useUserData();
  const { account } = useAuthenticationDialog();

  const router = useRouter();

  useEffect(() => {
    if (!account) return;
    setWalletId(account);
  }, [account]);

  return (
    <div className="mt-10 flex flex-col gap-5 capitalize">
      <div className="flex flex-col items-center md:flex-row">
        <span className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 dark:text-gray-200 ">
          Pre-sale Mint date and time
        </span>
        <input
          onChange={(e) => {
            props.setShowPresaleDate(e.target.checked);
          }}
          type="checkbox"
          className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300"
        />
        <span
          className={`whitespace-nowrap py-2 px-6 text-sm text-gray-500 transition-all dark:rounded-lg  dark:text-white  ${
            props.showPresaleDate
              ? "pointer-events-auto translate-x-0 opacity-100"
              : "pointer-events-none translate-x-5 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center gap-5 md:flex-row">
            <div className="rounded-lg dark:bg-white">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  value={props.presaleMintDateTime}
                  onChange={props.setPresaleMintDateTime}
                  renderInput={(
                    params: JSX.IntrinsicAttributes & TextFieldProps
                  ) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className="flex flex-row items-center gap-2">
              <CollectionTimezoneSelector
                setCollectionTimezone={props.setCollectionTimezone}
                collectionTimezone={props.collectionTimezone}
              />
              <div className="flex flex-col">
                <span
                  onClick={() => {
                    props.setCollectionTimezone(user?.timeZone);
                    console.log(props.collectionTimezone);
                  }}
                  className="flex cursor-pointer items-center gap-2 text-xs text-blue-500 transition-all hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500"
                >
                  Use your timezone
                </span>
              </div>
            </div>
          </div>
        </span>
      </div>
      <div className="flex items-center ">
        <span className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 dark:text-gray-200 ">
          Public Mint date and time
        </span>
        <input
          onChange={(e) => {
            props.setShowPublicDate(e.target.checked);
          }}
          type="checkbox"
          className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300"
        />
        <span
          className={`whitespace-nowrap py-2 px-6 text-sm text-gray-500 transition-all dark:rounded-lg  dark:text-white ${
            props.showPublicDate
              ? "pointer-events-auto translate-x-0 opacity-100"
              : "pointer-events-none translate-x-5 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center gap-5 md:flex-row">
            <div className="rounded-lg dark:bg-white">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  value={props.publicMintDateTime}
                  onChange={props.setPublicMintDateTime}
                  renderInput={(
                    params: JSX.IntrinsicAttributes & TextFieldProps
                  ) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className="flex flex-row items-center gap-2">
              <CollectionTimezoneSelector
                setCollectionTimezone={props.setCollectionTimezone}
                collectionTimezone={props.collectionTimezone}
              />
              <div className="flex flex-col">
                <span
                  onClick={() => {
                    props.setCollectionTimezone(user?.timeZone);
                  }}
                  className="flex cursor-pointer items-center gap-2 text-xs text-blue-500 transition-all hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500"
                >
                  Use your timezone
                </span>
              </div>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
}

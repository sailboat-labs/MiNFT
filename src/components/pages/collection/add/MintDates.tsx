import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useEffect } from "react";

import useAuthenticationDialog from "@/hooks/UseAuthDialog";
import useUserData from "@/hooks/useUserData";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MintDates(props: any) {
  const { user, setWalletId } = useUserData();
  const { account } = useAuthenticationDialog();

  useEffect(() => {
    if (!account) return;
    setWalletId(account);
  }, [account]);

  return (
    <div className="mt-10 flex flex-col gap-5">
      <div className="flex items-center ">
        <span className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 dark:text-gray-200 ">
          Your TimeZone:
        </span>
        {user?.timeZone}
      </div>
      <div className="flex items-center ">
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
          className={`whitespace-nowrap py-2 px-6 text-sm text-gray-500 transition-all dark:ml-5 dark:rounded-lg dark:bg-white dark:text-white  ${
            props.showPresaleDate
              ? "pointer-events-auto translate-x-0 opacity-100"
              : "pointer-events-none translate-x-5 opacity-0"
          }`}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              value={props.presaleMintDateTime}
              onChange={props.setPresaleMintDateTime}
              renderInput={(
                params: JSX.IntrinsicAttributes & TextFieldProps
              ) => <TextField {...params} />}
            />
          </LocalizationProvider>
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
          className={`whitespace-nowrap py-2 px-6 text-sm text-gray-500 transition-all dark:ml-5 dark:rounded-lg dark:bg-white dark:text-white ${
            props.showPublicDate
              ? "pointer-events-auto translate-x-0 opacity-100"
              : "pointer-events-none translate-x-5 opacity-0"
          }`}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              value={props.publicMintDateTime}
              onChange={props.setPublicMintDateTime}
              renderInput={(
                params: JSX.IntrinsicAttributes & TextFieldProps
              ) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </span>
      </div>
    </div>
  );
}

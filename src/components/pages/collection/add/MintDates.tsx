import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useEffect } from "react";

import useAuthenticationDialog from "@/hooks/UseAuthDialog";
import useUserData from "@/hooks/useUserData";
import { useRouter } from "next/router";

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
    <div className="mt-10 flex flex-col gap-5">
      <div className="flex items-start ">
        <span className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 dark:text-gray-200 ">
          Your TimeZone:
        </span>
        <div className="flex flex-col">
          {user?.timeZone}{" "}
          <span
            onClick={() => {
              router.push("/profile");
            }}
            className="flex items-center gap-3 cursor-pointer text-xs text-blue-500 transition-all hover:text-blue-700 dark:hover:text-blue-500 dark:text-blue-300"
          >
            Go to your profile to change your timezone
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
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

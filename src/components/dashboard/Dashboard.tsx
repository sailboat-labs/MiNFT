import { useState } from "react";

import ButtonLink from "../links/ButtonLink";

export default function DashboardHome() {
  const [error, setError] = useState("hidden");

  const [userEmail, setUserEmail] = useState("username@domain.com");

  const [emailDivStyles, setEmailDivStyles] = useState(
    "mt-3 flex h-12 w-4/5 flex-row items-center rounded-lg border border-gray-300"
  );

  const handleError = (e: {
    preventDefault: () => void;
    target: { value: string };
  }) => {
    e.preventDefault();
    const userEmailInput = e.target.value;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(userEmailInput)) {
      setUserEmail(userEmailInput);
      setError("hidden");
      setEmailDivStyles(
        "mt-3 flex h-12 w-4/5 flex-row items-center rounded-lg border border-gray-300"
      );
    } else {
      setError("flex flex-row items-center text-sm text-red-500 h-5 mt-2");
      setEmailDivStyles(
        "mt-3 flex h-12 w-4/5 flex-row items-center rounded-lg border-2 border-red-500 outline-none ring ring-red-300"
      );
    }
  };

  return (
    // <div className="ml-96 bg-white pl-10 pt-60 font-dmsans opacity-100">
    <div className="w- w- border-t border-gray-300 bg-white pl-10 pt-24 font-dmsans opacity-100">
      {/* User Information */}
      <div>
        <div className="-mt-16 text-2xl font-bold text-gray-700">
          User Information
        </div>
        <div className="mt-2 w-3/4 text-lg font-normal text-gray-500">
          Enter the required information below to register. You can change it
          anytime you want.
        </div>
      </div>
      {/* Profile photo */}
      <div className="mt-5">
        <span className="font-dmsans text-lg font-semibold text-gray-700">
          Profile photo
        </span>
        <div className="border-box ml-36 pt-5">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-indigo-800">
            <svg
              className="h-11 w-11"
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.1243 2.06901C20.7686 0.327772 23.2314 0.327774 23.8757 2.06901L28.4331 14.3852C28.6357 14.9327 29.0673 15.3643 29.6148 15.5669L41.931 20.1243C43.6722 20.7686 43.6722 23.2314 41.931 23.8757L29.6148 28.4331C29.0673 28.6357 28.6357 29.0673 28.4331 29.6148L23.8757 41.931C23.2314 43.6722 20.7686 43.6722 20.1243 41.931L15.5669 29.6148C15.3643 29.0673 14.9327 28.6357 14.3852 28.4331L2.06901 23.8757C0.327772 23.2314 0.327774 20.7686 2.06901 20.1243L14.3852 15.5669C14.9327 15.3643 15.3643 14.9327 15.5669 14.3852L20.1243 2.06901Z"
                fill="white"
              />
            </svg>
          </div>
          <div className=" ml-20 -mt-10 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.0186 10.6787L13.3236 7.98371L15.2716 6.03471L17.9656 8.72871L16.0186 10.6787ZM9.07961 17.6247L6.10261 17.8957L6.36661 14.9397L11.9836 9.32271L14.6796 12.0187L9.07961 17.6247ZM19.4036 7.33771L19.4026 7.33671L16.6646 4.59871C15.9236 3.85971 14.6506 3.82471 13.9486 4.52971L4.95261 13.5257C4.62661 13.8507 4.42461 14.2827 4.38261 14.7397L4.00361 18.9097C3.97761 19.2047 4.08261 19.4967 4.29261 19.7067C4.48161 19.8957 4.73661 19.9997 4.99961 19.9997C5.03061 19.9997 5.06061 19.9987 5.09061 19.9957L9.26061 19.6167C9.71861 19.5747 10.1496 19.3737 10.4746 19.0487L19.4716 10.0517C20.1996 9.32171 20.1686 8.1037 19.4036 7.33771Z"
                fill="#FFF"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Email address */}
      <div className="mt-10 w-3/4">
        <div className="font-dmsans text-lg font-semibold text-gray-700 opacity-100">
          Email address
        </div>
        <div className={emailDivStyles}>
          <input
            className="h-full w-11/12 rounded-lg border-0 outline-0 focus:outline-none active:outline-none"
            type="text"
            placeholder="username@domain.com"
            onChange={handleError}
          />
          <svg
            className="mx-3"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.1816 15.0908C9.4776 15.0908 8.0906 13.7038 8.0906 11.9998C8.0906 10.2958 9.4776 8.90882 11.1816 8.90882C12.8856 8.90882 14.2726 10.2958 14.2726 11.9998C14.2726 13.7038 12.8856 15.0908 11.1816 15.0908ZM12.9546 2.04382C9.9536 1.76182 7.0186 2.82482 4.9056 4.95282C2.7916 7.07982 1.7506 10.0228 2.0506 13.0258C2.4086 16.5978 4.6596 19.7078 7.9266 21.1408C9.2336 21.7138 10.6196 21.9948 11.9956 21.9948C14.1636 21.9948 16.3086 21.2958 18.0796 19.9398C18.5186 19.6038 18.6016 18.9758 18.2656 18.5368C17.9296 18.0998 17.3026 18.0168 16.8636 18.3518C14.5456 20.1268 11.4296 20.4908 8.7296 19.3088C6.1616 18.1828 4.3226 15.6388 4.0406 12.8258C3.8006 10.4208 4.6326 8.06482 6.3246 6.36182C8.0146 4.65982 10.3666 3.80782 12.7696 4.03582C16.8246 4.41282 19.9996 8.00982 19.9996 12.2248V12.8998C19.9996 13.3678 19.8136 13.8038 19.4746 14.1278C19.1366 14.4518 18.6886 14.6178 18.2216 14.5978C17.3276 14.5588 16.5996 13.7178 16.5996 12.7238V8.39982C16.5996 7.84682 16.1526 7.39982 15.5996 7.39982C15.0906 7.39982 14.6886 7.78282 14.6246 8.27482C13.7166 7.43482 12.5126 6.90882 11.1816 6.90882C8.3746 6.90882 6.0906 9.19382 6.0906 11.9998C6.0906 14.8068 8.3746 17.0908 11.1816 17.0908C12.8816 17.0908 14.3806 16.2448 15.3056 14.9608C15.9506 15.9008 16.9736 16.5448 18.1336 16.5958C19.1466 16.6498 20.1206 16.2778 20.8576 15.5728C21.5946 14.8678 21.9996 13.9188 21.9996 12.8998V12.2248C21.9996 6.98782 18.0276 2.51682 12.9546 2.04382Z"
              fill="#757D8A"
            />
          </svg>
        </div>
        <div className={error}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.0001 13C13.0001 13.552 12.5521 14 12.0001 14C11.4481 14 11.0001 13.552 11.0001 13V9C11.0001 8.448 11.4481 8 12.0001 8C12.5521 8 13.0001 8.448 13.0001 9V13ZM12.0001 17C11.4481 17 11.0001 16.552 11.0001 16C11.0001 15.448 11.4481 15 12.0001 15C12.5521 15 13.0001 15.448 13.0001 16C13.0001 16.552 12.5521 17 12.0001 17ZM22.5611 16.303L14.8891 3.584C14.2901 2.592 13.2101 2 12.0001 2C10.7901 2 9.71006 2.592 9.11106 3.584L1.43906 16.303C0.871058 17.246 0.854058 18.38 1.39406 19.336C1.97306 20.363 3.09806 21 4.32806 21H19.6721C20.9021 21 22.0271 20.363 22.6061 19.336C23.1461 18.38 23.1291 17.246 22.5611 16.303Z"
              fill="#FF0000"
            />
          </svg>
          <span className="ml-1">
            Please enter an email address in the format{" "}
            <span className="font-bold"> username@domain.com</span>{" "}
          </span>
        </div>
      </div>

      <div className="mt-12 w-4/5">
        <span className="font-dmsans text-lg font-semibold text-gray-700 opacity-100">
          Full name
        </span>
        <div className="mt-3 flex h-12 w-3/4 flex-row justify-between">
          <input
            className="h-full w-64 rounded-lg border border-gray-300"
            type="text"
            placeholder="First Name"
          />
          <input
            className="h-full w-64 rounded-lg border border-gray-300"
            type="text"
            placeholder="Second Name"
          />
        </div>
      </div>

      <div className="mt-6 w-4/5">
        <span className="font-dmsans text-lg font-semibold text-gray-700 opacity-100">
          Add your wallet address
        </span>
        <div className="mt-3 h-12">
          <input
            className="h-full w-3/4 rounded-lg border border-gray-300"
            type="text"
            placeholder="Ox..."
          />
        </div>
      </div>

      <div className="mt-6 w-4/5">
        <span className="font-dmsans text-lg font-semibold text-gray-700 opacity-100">
          Add Twitter account
        </span>
        <div className="mt-3 h-12">
          <input
            className="h-full w-3/4 rounded-lg border border-gray-300"
            type="text"
            placeholder="@twitter_account"
          />
          {/* Insert Twitter Logo here */}
        </div>
      </div>

      <div className="font-montserrat">
        <ButtonLink
          href="#"
          className="mt-10 mb-14 flex h-10 w-72 items-center justify-center rounded-lg border-0 bg-indigo-900 text-base font-bold text-white hover:bg-indigo-600"
        >
          Save changes
        </ButtonLink>
      </div>
    </div>
  );
}

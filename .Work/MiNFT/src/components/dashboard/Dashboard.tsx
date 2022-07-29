import { SetStateAction, useState } from "react";

import ButtonLink from "../links/ButtonLink";

export default function DashboardHome() {
  const [profilePhoto, setProfilePhoto] = useState("");

  const changeProfilePhoto = () => {
    document.getElementById("profilePhoto")?.click();
  };

  const [error, setError] = useState("hidden");

  const [userEmail, setUserEmail] = useState("username@domain.com");

  const [emailDivStyles, setEmailDivStyles] = useState(
    "mt-3 flex h-12 w-4/5 flex-row items-center rounded-lg border border-gray-300 focus-within:border-2 focus-within:border-indigo-500 focus-within:ring focus-within:ring-indigo-300"
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

  const [firstname, setFirstName] = useState("");

  const clearFirstName = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setFirstName("");
  };

  const updateFirstName = (e: {
    preventDefault: () => void;
    target: { value: SetStateAction<string> };
  }) => {
    e.preventDefault();
    setFirstName(e.target.value);
  };

  const [secondname, setSecondName] = useState("");

  const clearSecondName = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSecondName("");
  };

  const updateSecondName = (e: {
    preventDefault: () => void;
    target: { value: SetStateAction<string> };
  }) => {
    e.preventDefault();
    setSecondName(e.target.value);
  };

  return (
    // <div className="ml-96 bg-white pl-10 pt-60 font-dmsans opacity-100">
    <div className="border-t border-gray-300 bg-white pl-10 pt-24 font-dmsans opacity-100">
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

      {/* PROFILE PHOTO */}
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
          <button
            className="ml-20 -mt-10 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500"
            onClick={changeProfilePhoto}
          >
            <input
              type="file"
              className="hidden"
              id="profilePhoto"
              accept="image/png, image/jpeg"
            />
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
          </button>
        </div>
      </div>

      <form>
        {/* Email address */}
        <div className="mt-10 w-3/4">
          <div className="font-dmsans text-lg font-semibold text-gray-700 opacity-100">
            Email address
          </div>
          <div className={emailDivStyles}>
            <input
              id="emailInput"
              className="h-full w-11/12 rounded-lg border-0"
              type="text"
              rounded-lg
              border-0
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

        {/* FULL NAME */}
        <div className="mt-12 w-4/5">
          <span className="font-dmsans text-lg font-semibold text-gray-700 opacity-100">
            Full name
          </span>
          <div className="mt-3 flex h-12 w-3/4 flex-row justify-between">
            <div className="flex w-72 flex-row items-center rounded-lg border border-gray-300 focus-within:border-2 focus-within:border-indigo-500 focus-within:ring focus-within:ring-indigo-300">
              <input
                id="firstname"
                className="h-full w-11/12 rounded-lg border-0"
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={updateFirstName}
              />
              <button onClick={clearFirstName}>
                <svg
                  className="mx-3"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 12C0 5.37258 5.37258 0 12 0V0C18.6274 0 24 5.37258 24 12V12C24 18.6274 18.6274 24 12 24V24C5.37258 24 0 18.6274 0 12V12Z"
                    fill="#F1F2F3"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.4142 12L17.7072 7.707C18.0982 7.316 18.0982 6.684 17.7072 6.293C17.3162 5.902 16.6843 5.902 16.2933 6.293L12.0002 10.586L7.70725 6.293C7.31625 5.902 6.68425 5.902 6.29325 6.293C5.90225 6.684 5.90225 7.316 6.29325 7.707L10.5862 12L6.29325 16.293C5.90225 16.684 5.90225 17.316 6.29325 17.707C6.48825 17.902 6.74425 18 7.00025 18C7.25625 18 7.51225 17.902 7.70725 17.707L12.0002 13.414L16.2933 17.707C16.4883 17.902 16.7442 18 17.0002 18C17.2562 18 17.5122 17.902 17.7072 17.707C18.0982 17.316 18.0982 16.684 17.7072 16.293L13.4142 12Z"
                    fill="#757D8A"
                  />
                </svg>
              </button>
            </div>
            <div className="flex w-72 flex-row items-center rounded-lg border border-gray-300 focus-within:border-2 focus-within:border-indigo-500 focus-within:ring focus-within:ring-indigo-300">
              <input
                id="firstname"
                className="h-full w-11/12 rounded-lg border-0"
                type="text"
                placeholder="Second Name"
                value={secondname}
                onChange={updateSecondName}
              />
              <button onClick={clearSecondName}>
                <svg
                  className="mx-3"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 12C0 5.37258 5.37258 0 12 0V0C18.6274 0 24 5.37258 24 12V12C24 18.6274 18.6274 24 12 24V24C5.37258 24 0 18.6274 0 12V12Z"
                    fill="#F1F2F3"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.4142 12L17.7072 7.707C18.0982 7.316 18.0982 6.684 17.7072 6.293C17.3162 5.902 16.6843 5.902 16.2933 6.293L12.0002 10.586L7.70725 6.293C7.31625 5.902 6.68425 5.902 6.29325 6.293C5.90225 6.684 5.90225 7.316 6.29325 7.707L10.5862 12L6.29325 16.293C5.90225 16.684 5.90225 17.316 6.29325 17.707C6.48825 17.902 6.74425 18 7.00025 18C7.25625 18 7.51225 17.902 7.70725 17.707L12.0002 13.414L16.2933 17.707C16.4883 17.902 16.7442 18 17.0002 18C17.2562 18 17.5122 17.902 17.7072 17.707C18.0982 17.316 18.0982 16.684 17.7072 16.293L13.4142 12Z"
                    fill="#757D8A"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* WALLET ADDRESS */}
        <div className="mt-6 w-4/5">
          <span className="font-dmsans text-lg font-semibold text-gray-700 opacity-100">
            Add your wallet address
          </span>
          <div className="mt-3 h-12">
            <input
              className="h-full w-3/4 rounded-lg border border-gray-300 focus:border-2 focus:border-indigo-500 focus:ring focus:ring-indigo-300"
              type="text"
              placeholder="0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
            />
          </div>
        </div>

        {/* TWITTER ACCOUNT */}
        <div className="mt-6 w-4/5">
          <span className="font-dmsans text-lg font-semibold text-gray-700 opacity-100">
            Add Twitter account
          </span>
          <div className="mt-3 flex h-12 w-3/4 flex-row items-center rounded-lg border border-gray-300 focus-within:border-2 focus-within:border-indigo-500 focus-within:ring focus-within:ring-indigo-300">
            <input
              id="twitterAccountInput"
              className="h-full w-11/12 rounded-lg border-0"
              type="text"
              placeholder="@twitter_account"
            />
            <svg
              className="mx-3"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <circle cx="14" cy="14" r="14" fill="url(#pattern0)" />
              <defs>
                <pattern
                  id="pattern0"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_166_3413"
                    transform="scale(0.0016129)"
                  />
                </pattern>
                <image
                  id="image0_166_3413"
                  width="620"
                  height="620"
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAJsCAIAAADP92hyAAAgAElEQVR4nO3deZhd11mg+2+tvfc5p+YqVWkeLNuSJVmW4zGxkzgzJKQDJEADATI0TXffBjoPHfo2F54GGgIkhNAMGbhAQkink0AgIyGDfQOJbTm2Yw2WZGueSlJNqnk8Z++91nf/KMlDYg21VMM5Ve/vyeOUZNk+lk/t96y1117LrP/EqAAAgJmzC/0CAACoVUQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEBEFACAQEQUAIBARBQAgEDxQr8AALVKL/GDZ740z/0F5gW/BGobEQUwA3rx/7yIqqiIiqg+86dU9PkRNSJizMWvp7+w5pk/RVBR24gogCuYjqKqOBWv4lRjI2sa7Loms7LOrqizHUVpKprmxDQWTGwksaZgpew0V8m9TGQ6mupwqgNl7Z3U3infOaa9U96rRMZERqwRQ1BRm4gogEuaDmfmVUVW1NltbXZrq93Uatc32taCaSqY+ljqY1MfSyEy0aUbmHupOC07mch1MpPRTIfKvnNcj434p4f84SE3UNbImthIZEkpagkRBfC9VMR5KTstRebmZfbOjmhHR3R9s11eMh0ls6w048zFVmJrGhJpfzaRkaoMVPT8lA6U/YlRv/u8293vDw95p1qwhpqiJpj1nxhd6NcAoFo4lbLTyMjWNvuKNckdHdH1zWZ9o+2YeThnqmfSn53QEyP+8T73nZ780LCPjBSssbXQUq/ilWH0UkREAYiI5F4mcl1RZ165Jn7pqmh7u93SGrUWFiAK56f0+Kjb1++/1eW+05OPZlqMTFytdVKRyVyWFWVlne0v60SmplpfKuYCEQWWuszLlNONTfYH18evWB3f2mE3NFbFE+RHR/yBAf+v57Jvns27J7UUmbgqXtezyk5E9SUro7dvKRwa9v/vU+mFhcdYMrgnCixducpkphub7A9dl7x6bfziFVFrsYoSsLnFbm6x966yr18f/0uX+9qpvGfKV0lKK05Sp9vbox/dGL9+fXxji903WJnItHkhxu5YQEQUWIq8ynimK+rNj19feON18cvXRE1JlV79V9Xbf7PR3rM6vm91/I3O/Bud2UiqdfGC3SutOEm9bmuzr1+fvHpt/LLVcWTkkR73L2fzUtVOOmPOEFFgyZnKJYnk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"
                />
              </defs>
            </svg>
          </div>
        </div>

        {/* SUBMIT FORM */}
        <div className="font-montserrat">
          <button type="submit">
            <ButtonLink
              href="#"
              className="mt-10 mb-14 flex h-10 w-72 items-center justify-center rounded-lg border-0 bg-indigo-800 text-base font-bold text-white hover:bg-indigo-600 dark:text-gray-700"
            >
              Save changes
            </ButtonLink>
          </button>
        </div>
      </form>
    </div>
  );
}

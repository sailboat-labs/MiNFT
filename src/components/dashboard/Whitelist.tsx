import { httpsCallable } from "firebase/functions";
import { useState } from "react";
import { v4 } from "uuid";

import { functions } from "@/lib/firebase";

import WhitelistTable from "./Whitelist/WhitelistTable";
import Button from "../buttons/Button";

export default function Whitelist() {
  const [walletNumber, setWalletNumber] = useState("");

  const clearWalletNumber = (e: any) => {
    e.preventDefault();
    setWalletNumber("");
  };

  const updateWalletNumber = (e: any) => {
    e.preventDefault();
    setWalletNumber(e.target.value);
  };

  const [twitterAccount, setTwitterAccount] = useState("");

  const clearTwitterAccount = (e: any) => {
    e.preventDefault();
    setTwitterAccount("");
  };

  const updateTwitterAccount = (e: any) => {
    e.preventDefault();
    setTwitterAccount(e.target.value);
  };

  const newUser = async () => {
    const addWhitelist = httpsCallable(functions, "addWhitelist");

    await addWhitelist({
      id: v4(),
      projectSlug: "indians-nft",
      wallet: walletNumber,
      twitterUsername: twitterAccount,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    setTwitterAccount("");
    setWalletNumber("");

  };

  return (
    <div className="h-[length:calc(100vh-80px)] overflow-auto font-dmsans opacity-100">
      <div className=" pl-10 pt-24 ">
        <div>
          <div className="-mt-16 text-2xl font-bold text-gray-700">
            Whitelist accounts
          </div>
          <div className="mt-2 w-3/4 text-lg font-normal text-gray-500">
            A list of people or things considered to be acceptable or
            trustworthy.
          </div>
        </div>

        <div className="mt-5">
          <form>
            <span className="font-dmsans text-base font-semibold text-gray-600 opacity-100">
              Add a new person to the list
            </span>
            <div className="mt-3 flex h-12 w-3/5 flex-col justify-between">
              <div className="flex h-12 flex-row">
                <div className="flex h-12 w-72 flex-row items-center rounded-lg border border-gray-300 focus-within:border-2 focus-within:border-indigo-500 focus-within:ring focus-within:ring-indigo-300">
                  <input
                    id="walletNumber"
                    className="h-full w-11/12 rounded-lg border-0"
                    type="text"
                    placeholder="Wallet number"
                    value={walletNumber}
                    onChange={updateWalletNumber}
                    required
                  />
                  <button onClick={clearWalletNumber}>
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
                <div className="ml-10 flex w-72 flex-row items-center rounded-lg border border-gray-300 focus-within:border-2 focus-within:border-indigo-500 focus-within:ring focus-within:ring-indigo-300">
                  <input
                    id="twitterAccount"
                    className="h-full w-11/12 rounded-lg border-0"
                    type="text"
                    placeholder="Twitter account (optional)"
                    value={twitterAccount}
                    onChange={updateTwitterAccount}
                  />
                  <button onClick={clearTwitterAccount}>
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
              {/* SUBMIT FORM */}
              <div className="block font-montserrat">
                <button type="submit">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      newUser();
                    }}
                    className="gradient-button mt-5 transition-all"
                  >
                    Add person
                  </Button>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-28 border-t">
        <div className="pl-10 pt-5">
          <span className="font-dmsans text-lg font-semibold text-gray-600 opacity-100">
            Main list
          </span>
          <div className="mt-3 flex w-fit flex-col pr-10">
            <WhitelistTable />
          </div>
        </div>
      </div>
    </div>
  );
}

import { formatEthAddress } from "eth-address";
import { useState } from "react";

type props = {
  account?: string;
  className?:string;
};

export default function EthAddress({ account,className }: props) {
  const [showCopy, setShowCopy] = useState(false)
  return (
    <>
      {account && (
        <div
          onMouseOver={() => {
            setShowCopy(true);
          }}
          onMouseLeave={() => {
            setShowCopy(false);
          }}
          className={`flex cursor-pointer gap-2 rounded-xl border-2 px-5 py-1 hover:bg-gray-100 ${className}`}
        >
          {formatEthAddress(account)}{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 transition-all ${showCopy ? "translate-x-0 opacity-100" :"-translate-x-2 opacity-0 w-0"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
      )}
    </>
  );
}

import axios from "axios";
import { formatEthAddress } from "eth-address";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { User } from "@/types";

type props = {
  account?: string;
  className?: string;
};

export default function EthAddress({ account, className }: props) {
  const [showCopy, setShowCopy] = useState(false);
  const [ensName, setEnsName] = useState<any>();

  async function getENSName() {
    try {
      const user = await axios.get(
        `${process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_ENDPOINT}/User?walletId=${account}`
      );

      
      setEnsName(user.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    //Get ENS name
    if (!account) return;
    getENSName();
  }, [account]);

  return (
    <>
      {account && (
        <div
          onClick={() => {
            navigator.clipboard.writeText(account);
            toast.success("Copied to clipboard");
          }}
          onMouseOver={() => {
            setShowCopy(true);
          }}
          onMouseLeave={() => {
            setShowCopy(false);
          }}
          className={`flex cursor-pointer gap-2 rounded-xl hover:bg-gray-100 ${className}`}
        >
          {(ensName && ensName.name) ? ensName.name : formatEthAddress(account)}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 transition-all ${
              showCopy
                ? "translate-x-0 opacity-100"
                : "w-0 -translate-x-2 opacity-0"
            }`}
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

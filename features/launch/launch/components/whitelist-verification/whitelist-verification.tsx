/* eslint-disable @next/next/no-img-element */
import { ethers } from "ethers";
import { verifyWhitelistAddress } from "features/whitelist-verification/index.logic";
import { useRouter } from "next/router";
import { useState } from "react";

import PageLoader from "@/components/shared/PageLoader";

export default function WhitelistVerify() {
  // list of addresses to be whitelisted
  const [address, setAddress] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleVerifyWhitelistAddress() {
    if (address.length < 1) return;
    if (ethers.utils.isAddress(address) == false) {
      setIsVerified(false);
      setTimeout(() => {
        setIsVerified(null);
      }, 5000);
      return setMessage(`${address} is not a valid ethereum address`);
    }
    setIsChecking(true);
    if (!router.query.project) return;
    const verified = await verifyWhitelistAddress(
      router.query.project as string,
      address
    );
    setMessage(
      verified
        ? "Congratulations! You're part of the whitelist"
        : "You're not part of the whitelist"
    );
    setIsVerified(verified);
    setIsChecking(false);
    setTimeout(() => {
      setIsVerified(null);
    }, 5000);
  }

  return (
    <div className="container mx-auto mt-20 flex flex-col items-center justify-center border-t pt-20 pb-20">
      {/* <Banner /> */}
      <div className="text-3xl">Check your whitelist status</div>
      {isVerified != null && (
        <div
          className={`mt-5 w-fit rounded-lg border-2 px-20  py-3 transition-all ${
            isVerified
              ? "border-green-200 bg-green-300 text-green-700"
              : "border-red-200 bg-red-300 text-red-700"
          }`}
        >
          {message}
        </div>
      )}
      <div className="mt-10 text-gray-500">
        Enter Wallet Address (not ENS name)
      </div>
      <input
        disabled={isChecking}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
        className="min-w-[500px] rounded border-2 px-5 py-2 text-center"
        placeholder="Enter Wallet Address..."
      />
      {isChecking ? (
        <PageLoader className="mt-10" />
      ) : (
        <div
          onClick={() => {
            handleVerifyWhitelistAddress();
          }}
          className="gradient-button mt-10"
        >
          Check Status
        </div>
      )}
    </div>
  );
}

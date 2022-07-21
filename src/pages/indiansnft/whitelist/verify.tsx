/* eslint-disable @next/next/no-img-element */
import { verifyWhitelistAddress } from "features/whitelist-verification/index.logic";
import { useState } from "react";

import PageLoader from "@/components/shared/PageLoader";

export default function WhitelistVerify() {
  // list of addresses to be whitelisted
  const [address, setAddress] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  async function handleVerifyWhitelistAddress() {
    setIsChecking(true);
    const verified = await verifyWhitelistAddress("indians-nft", address);
    setIsVerified(verified);
    setIsChecking(false);
  }

  return (
    <div className="container mx-auto mt-20 flex flex-col items-center justify-center">
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
          {isVerified
            ? "Account has been whitelisted!"
            : "Account not whitelisted"}
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

      <div className="absolute bottom-0 hidden flex-row justify-center overflow-hidden lg:flex">
        {[...Array(9)].map((_, index) => (
          <div key={index} className="box-border ">
            <img
              src={`/images/landing/indiansnfts/${index + 1}.png`}
              alt="Indian NFT Example"
              className="object-cover lg:h-52 lg:w-52"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

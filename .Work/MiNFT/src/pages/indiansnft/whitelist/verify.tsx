/* eslint-disable @next/next/no-img-element */
import { verifyWhitelistAddress } from "features/whitelist-verification/index.logic";
import { useState } from "react";

import PageLoader from "@/components/shared/PageLoader";

export default function WhitelistVerify() {
  // list of addresses to be whitelisted
  const [address, setAddress] = useState<string>("");
  const [isChecking, setIsChecking] = useState(false);
  const [inputInFocus, setInputInFocus] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  async function handleVerifyWhitelistAddress() {
    setIsChecking(true);
    const verified = await verifyWhitelistAddress("indians-nft", address);
    setIsVerified(verified);
    setIsChecking(false);
  }

  return (
    <section className="relative w-screen overflow-x-hidden">
      <div className="container mx-auto flex min-h-screen items-center justify-center">
        {/* <Banner /> */}
        <div className="hidden h-[600px] w-[400px] -translate-x-1/3 transform lg:flex">
          <div className="flex flex-col justify-between">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="inline-block overflow-x-hidden">
                  <img
                    src={`/images/landing/indiansnfts/${index + 1}.png`}
                    alt="Indian NFT Example"
                    className="-ml-1 object-cover lg:h-44 lg:w-44"
                  />
                </div>
              ))}
          </div>
          <div className="flex flex-col justify-center gap-10">
            {Array(2)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="inline-block overflow-x-hidden">
                  <img
                    src={`/images/landing/indiansnfts/${index + 3}.png`}
                    alt="Indian NFT Example"
                    className="-ml-1 object-cover lg:h-44 lg:w-44"
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="-translate-y-56 transform md:-translate-y-24">
          <div className="text-center text-4xl">
            Check your whitelist status
          </div>
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
          <div
            className={`mx-2 mt-12 flex overflow-hidden rounded-full p-1 ring-2  ${
              inputInFocus ? "ring-blue-400" : "ring-gray-200"
            }`}
          >
            <input
              disabled={isChecking}
              onBlur={() => setInputInFocus(false)}
              onFocus={() => setInputInFocus(true)}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              className="flex-1 rounded-full px-5 py-2 text-center focus:outline-none focus:ring-0 md:min-w-[370px]"
              placeholder="enter wallet Address..."
            />
            {isChecking ? (
              <PageLoader className="hover:cursor-not-allowed" />
            ) : (
              <button
                disabled={isChecking}
                onClick={() => {
                  handleVerifyWhitelistAddress();
                }}
                className="gradient-button rounded-full hover:mr-1"
              >
                Check Status
              </button>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 flex max-h-[200px]  flex-wrap justify-center gap-2 overflow-hidden sm:max-h-[300px] lg:hidden">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="box-border ">
              <img
                src={`/images/landing/indiansnfts/${index + 1}.png`}
                alt="Indian NFT Example"
                className="h-52 w-52 object-contain"
              />
            </div>
          ))}
        </div>
        <div className="hidden h-[600px] w-[400px] translate-x-1/3 transform flex-row-reverse lg:flex">
          <div className="flex flex-col justify-between">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <div className="inline-block overflow-x-hidden" key={index}>
                  <img
                    src={`/images/landing/indiansnfts/${index + 6}.png`}
                    alt="Indian NFT Example"
                    className="-ml-1 object-cover lg:h-44 lg:w-44"
                  />
                </div>
              ))}
          </div>
          <div className="flex flex-col justify-center gap-10">
            {Array(2)
              .fill(null)
              .map((_, index) => (
                <div className="inline-block overflow-x-hidden" key={index}>
                  <img
                    src={`/images/landing/indiansnfts/${index + 5}.png`}
                    alt="Indian NFT Example"
                    className="-ml-1 object-cover lg:h-44 lg:w-44"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

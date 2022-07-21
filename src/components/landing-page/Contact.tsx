/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from "ethers";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import Web3Modal from "web3modal";

import { firebaseApp } from "@/lib/firebase";

import { checkTwitterExists, updateAccounts } from "@/firestore/project";
import { addWhitelist } from "@/firestore/whitelist";

import Button from "../buttons/Button";

import EthIcon from "~/svg/icons8-ethereum.svg";
import TwitterIcon from "~/svg/icons8-twitter.svg";

const functions = getFunctions(firebaseApp);
// connectFunctionsEmulator(functions, "localhost", 5001);

interface IContactProps {
  projectSlug: string;
}

export default function Contact({ projectSlug }: IContactProps) {
  const router = useRouter();

  const projectAccount = "TheIndianNFTs";

  const [heading, setHeading] = useState("Join the Bloody Bastards");

  const [address, setAddress] = useState<string>();
  const [follows, setFollows] = useState(true);
  const [loading, setLoading] = useState(false);
  const [shouldProceed, setShouldProceed] = useState(false);
  const [twitterHandle, setTwitterHandle] = useState("");

  const [twitterLoading, setTwitterLoading] = useState(false);

  const [whitelisted, setWhitelisted] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const { success, twitterAccount, accessToken } = router.query;

    if (success === "true") {
      verifyAccount(accessToken as string, twitterAccount as string);
      connectWallet();
    } else if (success === "false") {
      // toast.error("Unable to add account");
    }
  }, [router]);

  useEffect(() => {
    checkWhitelisted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const changeHeading = (e: any) => {
    e.preventDefault();
    setHeading(e.target.value);
  };

  const connectWallet = async () => {
    const web3Modal = new Web3Modal();

    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();

    const _address = await signer.getAddress();
    setAddress(_address);

    const balance = parseInt((await signer.getBalance()).toString());
    if (balance < 100000000000000000) setError("Balance is less than 0.1 eth");
  };

  const connectTwitter = async () => {
    setTwitterLoading(true);
    const requestTwitterUrl = httpsCallable(functions, "requestTwitterUrl");
    requestTwitterUrl()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((result: any) => {
        window.open(result.data.authUrl, "_bank");
      })
      .catch((error) => {
        console.log(error);
      });

    setTwitterLoading(false);
  };

  const verifyAccount = async (accessToken: string, twitterAccount: string) => {
    // const userClient = new TwitterApi(accessToken);

    // Get user ID
    // const user = await userClient.v2.me();

    // if (user.data.username == twitterAccount)

    setTwitterHandle(twitterAccount);

    // else setError("Account and token does not match");

    return;
  };

  const proceed = async () => {
    setLoading(true);

    const checkFollows = httpsCallable(functions, "checkFollows");

    const twitterExists = await checkTwitterExists(projectSlug, twitterHandle);
    if (twitterExists) return toast.error("Twitter account is in use");

    await checkFollows({
      user_account: twitterHandle,
      project_account: projectAccount,
    })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(async (result: any) => {
        const { data } = result;
        if (data.success && data.isFollowing) {
          setShouldProceed(true);
          await updateAccounts(projectSlug, twitterHandle);
          await addWhitelist({
            id: v4(),
            projectSlug,
            wallet: address,
            twitterUsername: twitterHandle,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        } else if (data.success && !data.isFollowing) {
          setError("This account is not following us");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setLoading(false);
  };

  const checkWhitelisted = async () => {
    const isWhitelisted = httpsCallable(functions, "isWhitelisted");

    const { data }: any = await isWhitelisted({
      project_slug: projectSlug,
      wallet: address,
    });

    if (data.success && data.isWhitelisted) {
      setWhitelisted(true);
    } else {
      setWhitelisted(false);
    }
  };

  return (
    <div id="join-whitelist">
      <div className="flex flex-col items-center pt-40 pb-28 text-white md:mx-20 lg:flex-row">
        <div className="w-full md:w-1/2 lg:w-7/12">
          <textarea
            disabled
            rows={3}
            id="contact-heading"
            value={heading}
            onChange={changeHeading}
            onBlur={changeHeading}
            className="w-full resize-none overflow-hidden whitespace-normal border-0 bg-transparent font-serif text-6xl font-bold italic md:text-9xl lg:text-center"
          />
        </div>

        <div className="flex  flex-col gap-8 rounded-lg bg-white py-4 text-black shadow-xl lg:w-5/12">
          <div className="px-4">
            <h3>Register</h3>
            <p className="mt-2 text-gray-300">
              Follow the steps below to add yourself to this list.
            </p>
          </div>

          <div className="flex gap-4 bg-[#F8F9FA] py-2">
            <p>
              <span className="ml-4 font-extrabold text-[#2EBCDB]">
                REQUIREMENTS,
              </span>{" "}
              TO REGISTER, YOU MUST:
            </p>
          </div>

          <div className="flex flex-col gap-2 px-4">
            <div className="flex gap-2">
              <EthIcon className="h-6 w-6" />
              <p>You must have at least 0.1 eth in your wallet</p>
            </div>

            <div className="flex gap-2">
              <TwitterIcon className="h-6 w-6" />
              <p>
                Follow{" "}
                <span
                  onClick={() => {
                    window.open(
                      `https://twitter.com/${projectAccount}`,
                      "_bank"
                    );
                    setFollows(true);
                  }}
                  className="cursor-pointer font-bold text-[#2EBCDB] underline"
                >
                  @{projectAccount}
                </span>{" "}
                on twitter{" "}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-y-[1px] px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  disabled
                  checked={address != undefined}
                  type="radio"
                  className="h-4 w-4"
                />
                <p> {address ? address : "Connect wallet"}</p>
              </div>
              <Button
                onClick={connectWallet}
                variant="success"
                className="rounded-full hover:bg-gray-400"
              >
                Connect
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  disabled
                  checked={twitterHandle != ""}
                  type="radio"
                  className="h-4 w-4"
                />
                <p>{twitterHandle ? twitterHandle : "Connect Twitter"} </p>
              </div>
              <Button
                isLoading={twitterLoading}
                onClick={connectTwitter}
                variant="success"
                className="rounded-full"
              >
                Connect
              </Button>
            </div>
          </div>
          {error && <p className="px-4 text-center text-red-400">{error}</p>}
          <div className="px-4">
            <Button
              disabled
              className="rounded-0 w-full cursor-pointer justify-center border-none py-4 text-xl font-bold text-white disabled:bg-[#A0A6AB] disabled:hover:bg-[#A0A6AB]"
            >
              Click to register
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center lg:ml-10">
        {(shouldProceed || whitelisted) && (
          <div className="h-80 w-full items-center justify-center">
            <h1>All Good</h1>
            {whitelisted && <p>Already whitelisted</p>}
          </div>
        )}
        {!shouldProceed && !whitelisted && (
          <div className="flex flex-col gap-4 text-gray-200">
            {address && <p>{address}</p>}

            {!address && (
              <Button
                onClick={connectWallet}
                type="submit"
                className="rounded-xl bg-[#006C35] py-5 px-12 text-xl"
              >
                Connect your wallet
              </Button>
            )}

            {twitterHandle && <p>{twitterHandle}</p>}

            {!twitterHandle && (
              <Button
                disabled={!address}
                onClick={connectTwitter}
                type="submit"
                className="rounded-xl bg-[#006C35] py-5 px-12 text-xl"
              >
                Connect Twitter
              </Button>
            )}

            {!follows && (
              <Button
                disabled={!address || !twitterHandle}
                onClick={() => {
                  window.open(`https://twitter.com/${projectAccount}`, "_bank");
                  setFollows(true);
                }}
                type="submit"
                className="rounded-xl bg-[#006C35] py-5 px-12 text-xl"
              >
                Follow Us
              </Button>
            )}

            <Button
              isLoading={loading}
              onClick={() => proceed()}
              disabled={!address || !follows || !twitterHandle}
              type="submit"
              className="rounded-xl bg-[#006C35] py-5 px-12 text-xl"
            >
              Reserve your Chutiya
            </Button>

            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

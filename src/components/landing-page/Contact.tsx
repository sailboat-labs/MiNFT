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

  const [whitelisted, setWhitelisted] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const { success, twitterAccount, accessToken } = router.query;
    connectWallet();

    if (success === "true") {
      verifyAccount(accessToken as string, twitterAccount as string);
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
  };

  const connectTwitter = async () => {
    const requestTwitterUrl = httpsCallable(functions, "requestTwitterUrl");
    requestTwitterUrl()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((result: any) => {
        window.open(result.data.authUrl, "_bank");
      })
      .catch((error) => {
        console.log(error);
      });
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
      <div className="mx-auto flex w-4/5 flex-col items-center pt-40 pb-28 text-white lg:flex-row">
        <div className="w-full lg:w-3/5">
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
                    window.open(
                      `https://twitter.com/${projectAccount}`,
                      "_bank"
                    );
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
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from "ethers";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import Web3Modal from "web3modal";
import * as Yup from "yup";

import { firebaseApp } from "@/lib/firebase";

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
  const [follows, setFollows] = useState(false);
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

  const validate = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    twitterUsername: Yup.string().required("Twitter username required"),
    ETHaddress: Yup.string().required("ETH address required"),
  });

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
    const checkExists = httpsCallable(functions, "checkExists");
    const updateAccounts = httpsCallable(functions, "updateAccounts");
    const addWhitelist = httpsCallable(functions, "addWhitelist");

    const { data }: any = await checkExists({
      project_slug: projectSlug,
      user_account: twitterHandle,
    });

    if (data.success && !data.exists) {
      checkFollows({
        user_account: twitterHandle,
        project_account: projectAccount,
      })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then(async (result: any) => {
          const { data } = result;
          if (data.success && data.isFollowing) {
            setShouldProceed(true);
            await updateAccounts({
              project_slug: projectSlug,
              user_account: twitterHandle,
            });
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
    } else if (data.success && data.exists) {
      setError("This account is already in use");
    }

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
    <div>
      <div className="mx-auto flex w-4/5 flex-col items-center justify-center pt-40 pb-28 text-white lg:mx-auto lg:flex-row">
        <div className="w-full lg:w-2/5">
          <textarea
            disabled
            rows={3}
            id="contact-heading"
            value={heading}
            onChange={changeHeading}
            onBlur={changeHeading}
            className="w-full resize-none overflow-hidden whitespace-normal border-0 bg-transparent font-serif text-6xl font-bold italic md:text-9xl lg:text-8xl"
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatEthAddress } from "eth-address";
import { ethers } from "ethers";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { toast } from "react-toastify";
import { v4 } from "uuid";

import { firebaseApp } from "@/lib/firebase";
import useStorage from "@/hooks/storage";

import { checkTwitterExists, updateAccounts } from "@/firestore/project";
import { addWhitelist, checkWhitelisted } from "@/firestore/whitelist";

import Button from "../buttons/Button";
import PageLoader from "../shared/PageLoader";

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

  const now = new Date();
  const [startDate, setStartDate] = useState(new Date(2022, 6));
  const [endDate, setEndDate] = useState(new Date(2022, 10));

  const [heading, setHeading] = useState("Join the Bloody Bastards");
  const [address, setAddress] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [twitterHandle, setTwitterHandle] = useState("");

  const [twitterLoading, setTwitterLoading] = useState(false);

  const [whitelisted, setWhitelisted] = useState(false);
  const { getItem, setItem, removeItem } = useStorage();

  const [error, setError] = useState("");

  const {
    isAuthenticating,
    isInitializing,
    isInitialized,
    initialize,
    isAuthUndefined,
    isWeb3Enabled,
    isWeb3EnableLoading,
    network,
    authenticate,
    isAuthenticated,
    account,
    chainId,
    logout,
    isLoggingOut,
    isUnauthenticated,
    authError,
  } = useMoralis();

  useEffect(() => {
    const { success, twitterAccount, accessToken } = router.query;

    if (success === "true") {
      verifyAccount(accessToken as string, twitterAccount as string);

      if (getItem("isAuthenticated") == "true" && getItem("account")) {
        connectWallet();
      }
    } else if (success === "false") {
      // toast.error("Unable to add account");
    }
  }, [router]);

  useEffect(() => {
    checkWhitelist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    if (account && isAuthenticated) {
      setAddress(account);
      console.log("saving account", account);
      setItem("account", account, "local");
      console.log({ account: getItem("account", "local") });
      setItem("isAuthenticated", isAuthenticated?.toString(), "local");
    } else {
      console.log("Not authenticated");
      console.log({ account: getItem("account", "local") });
      if (
        getItem("isAuthenticated", "local") == "true" &&
        getItem("account", "local")
      ) {
        setAddress(getItem("account", "local"));
      }
    }
  }, [account, isAuthenticated]);

  const changeHeading = (e: any) => {
    e.preventDefault();
    setHeading(e.target.value);
  };

  const connectWallet = async () => {
    setError("");
    try {
      await authenticate({
        provider: "metamask",
        signingMessage:
          "Authenticate with Magic Mynt \nClick to sign in and accept the Magic Mynt Terms of Service.\n\n This request will not trigger a blockchain transaction \nor cost any gas fees.\nYour authentication status will reset after 24 hours",
      })
        .then(async (result) => {
          if (result?.authenticated) {
            const provider = new ethers.providers.Web3Provider(
              (window as any).ethereum
            );
            const signer = provider.getSigner();

            const _address = await signer.getAddress();
            setAddress(_address);
            const balance = parseInt((await signer.getBalance()).toString());
            if (balance < parseInt(ethers.utils.parseEther("0.1")._hex))
              setError("Balance is less than 0.1 eth");
          }
          logout();
        })
        .catch((reason) => {
          console.error(reason);
        });
      // if(!isAuthenticated) logout();
      //  window.localStorage.setItem("connectorId", connectorId);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const connectTwitter = async () => {
    setError("");

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
    setError("");

    // const userClient = new TwitterApi(accessToken);

    // Get user ID
    // const user = await userClient.v2.me();

    // if (user.data.username == twitterAccount)

    setTwitterHandle(twitterAccount);

    // else setError("Account and token does not match");

    return;
  };

  const proceed = async () => {
    setError("");

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
          await updateAccounts(projectSlug, twitterHandle);
          await addWhitelist({
            id: v4(),
            projectSlug,
            wallet: address,
            twitterUsername: twitterHandle,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
          setWhitelisted(true);
        } else if (data.success && !data.isFollowing) {
          setError("This account is not following us");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setLoading(false);
  };

  const checkWhitelist = async () => {
    setError("");

    const isWhitelisted = await checkWhitelisted(
      projectSlug,
      (address as string) ?? ""
    );

    if (isWhitelisted) {
      setWhitelisted(true);
    } else {
      setWhitelisted(false);
    }
  };

  return (
    <div
      id="join-whitelist"
      className="mb-52 flex h-full flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center text-white md:mx-20 lg:flex-row">
        <div className="w-full md:w-1/2 lg:w-7/12">
          <textarea
            disabled
            rows={3}
            id="contact-heading"
            value={heading}
            onChange={changeHeading}
            onBlur={changeHeading}
            className="w-full resize-none overflow-hidden whitespace-normal border-0 bg-transparent text-center font-serif text-4xl font-bold italic md:text-6xl lg:text-center"
          />
        </div>

        {whitelisted && (
          <div className="rounded-lg bg-white p-4 py-4 text-black shadow-xl lg:w-5/12">
            <div>Hello,</div>
            <p>Your wallet {address} is whitelisted</p>
          </div>
        )}

        {!whitelisted && (
          <div className="flex flex-col gap-8 rounded-lg bg-white py-4 text-black shadow-xl lg:w-5/12">
            <div className="px-4">
              {endDate > now && <h3>Register</h3>}
              {endDate <= now && (
                <h3>
                  Registration <span className="text-red-500">closed</span>
                </h3>
              )}
              <p className="mt-2 text-gray-500">
                Follow the steps below to add yourself to this list.
              </p>
            </div>

            <div className="flex gap-4 bg-[#F8F9FA] py-2">
              <p>
                <strong className="font-xl ml-4 font-bold text-[#2EBCDB]">
                  REQUIREMENTS,
                </strong>{" "}
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
                      setError("");
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
                  <p className="text-clip">
                    {" "}
                    {address ? formatEthAddress(address) : "Connect Wallet"}
                  </p>
                </div>
                {isAuthenticating ? (
                  <PageLoader />
                ) : (
                  <Button
                    onClick={() => {
                      connectWallet();
                    }}
                    variant="success"
                    className="rounded-full hover:bg-gray-400"
                  >
                    Connect
                  </Button>
                )}
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
                  disabled={!address}
                  isLoading={twitterLoading}
                  onClick={connectTwitter}
                  variant="success"
                  className="rounded-full disabled:bg-[#A0A6AB]"
                >
                  Connect
                </Button>
              </div>
            </div>
            {error && <p className="px-4 text-center text-red-400">{error}</p>}
            <div className="px-4">
              <Button
                onClick={proceed}
                isLoading={loading}
                disabled={
                  endDate <= now || !address || !twitterHandle || error != ""
                }
                className="rounded-0 w-full cursor-pointer justify-center border-none bg-[#FF9933] py-4 text-xl font-bold text-white hover:bg-[#FF9933] disabled:bg-[#A0A6AB] disabled:hover:bg-[#A0A6AB]"
              >
                Reserve your chutiya
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

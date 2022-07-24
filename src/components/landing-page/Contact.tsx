/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatEthAddress } from "eth-address";
import { ethers } from "ethers";
import { httpsCallable } from "firebase/functions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { v4 } from "uuid";

import { functions } from "@/lib/firebase";
import useStorage from "@/hooks/storage";

import { checkTwitterExists, updateAccounts } from "@/firestore/project";
import { addWhitelist, checkWhitelisted } from "@/firestore/whitelist";

import Button from "../buttons/Button";
import PageLoader from "../shared/PageLoader";

import { Project } from "@/types";

import Close from "~/svg/icons8-close.svg";
import CloseWhite from "~/svg/icons8-close-white.svg";
import EthIcon from "~/svg/icons8-ethereum.svg";
import TwitterIcon from "~/svg/icons8-twitter.svg";

interface IContactProps {
  project: Project;
}

export default function Contact({ project }: IContactProps) {
  const router = useRouter();

  const projectAccount = "TheIndianNFTs";

  const now = new Date();
  const [endDate] = useState(new Date(project.endDate));

  const [heading, setHeading] = useState("Join the Bloody Bastards");
  const [address, setAddress] = useState<string>("");
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

  console.log({
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
  });

  useEffect(() => {
    const { success, twitterAccount, accessToken } = router.query;

    if (success === "true") {
      verifyAccount(accessToken as string, twitterAccount as string);

      if (getItem("isAuthenticated") == "true" && getItem("account")) {
        connectWallet();
      }
    } else if (success === "false") {
      setError("Unable to connect Twitter. Try a different account");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    checkWhitelist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    if (account && isAuthenticated) {
      setAddress(account);
      setItem("account", account, "local");
      setItem("isAuthenticated", isAuthenticated?.toString(), "local");
    } else {
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
    // setError("");

    setTwitterLoading(true);
    const requestTwitterUrl = httpsCallable(functions, "requestTwitterUrl");
    requestTwitterUrl()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((result: any) => {
        window.open(result.data.authUrl, "_bank");
        setTwitterLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const verifyAccount = async (accessToken: string, twitterAccount: string) => {
    // setError("");

    // const userClient = new TwitterApi(accessToken);

    // Get user ID
    // const user = await userClient.v2.me();

    // if (user.data.username == twitterAccount)

    setTwitterHandle(twitterAccount);

    // else setError("Account and token does not match");

    return;
  };

  const proceed = async () => {
    // setError("");

    setLoading(true);

    const checkFollows = httpsCallable(functions, "checkFollows");

    const twitterExists = await checkTwitterExists(project.slug, twitterHandle);
    if (twitterExists) {
      setError("Twitter account is already in use");
      setLoading(false);
      return;
    }

    await checkFollows({
      user_account: twitterHandle,
      project_account: projectAccount,
    })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(async (result: any) => {
        const { data } = result;
        if (data.success && data.isFollowing) {
          await updateAccounts(project.slug, twitterHandle);
          await addWhitelist({
            id: v4(),
            projectSlug: project.slug,
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
  };

  const checkWhitelist = async () => {
    // setError("");

    const isWhitelisted = await checkWhitelisted(
      project.slug,
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
            <Button
              onClick={() => {
                router.push("/indiansnft/whitelist/verify");
              }}
              className="rounded-0 mt-10 w-fit cursor-pointer justify-center border-none bg-[#FF9933] py-3 font-bold text-white hover:bg-[#FF9933] disabled:bg-[#A0A6AB] disabled:hover:bg-[#A0A6AB]"
            >
              Verify Whitelist Status
            </Button>
          </div>
        )}

        {!whitelisted && (
          <div className="flex flex-col gap-8 rounded-lg bg-white py-4 text-black shadow-xl lg:w-5/12">
            <div className="px-4">
              {endDate > now && new Date(project.startDate) <= now && (
                <h3>Register</h3>
              )}
              {new Date(project.startDate) > now && (
                <h3>
                  Registration <span className="text-red-500">not open</span>
                </h3>
              )}
              {endDate <= now && (
                <h3>
                  Registration <span className="text-red-500">closed</span>
                </h3>
              )}
              <p className="mt-2 text-gray-500">
                Follow the steps below to add yourself to this list.
              </p>
            </div>

            {error && (
              <div className="relative mx-2 rounded-lg bg-red-400 p-4 text-white shadow-sm">
                <p className="px-4 text-center">{error}</p>
                <div
                  onClick={() => setError("")}
                  className="absolute top-2 right-2 w-min cursor-pointer rounded-full border-[1px] p-[3px]"
                >
                  <CloseWhite className="h-3 w-3" />
                </div>
              </div>
            )}

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
                  <a
                    href={`https://twitter.com/${projectAccount}`}
                    target="_blank"
                    className="cursor-pointer font-bold text-[#2EBCDB] underline"
                    rel="noreferrer"
                  >
                    @{projectAccount}
                  </a>{" "}
                  on twitter{" "}
                </p>
              </div>
            </div>

            {endDate > now && new Date(project.startDate) <= now && (
              <div className="flex flex-col gap-3 border-y-[1px] px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      disabled
                      checked={address != undefined}
                      type="radio"
                      className="h-4 w-4 text-green-500"
                    />

                    {address && (
                      <p className="text-green-500">Wallet Connected</p>
                    )}
                    {!address && <p className="">Connect Wallet</p>}
                  </div>

                  {!address && (
                    <Button
                      isLoading={isAuthenticating}
                      onClick={() => {
                        connectWallet();
                      }}
                      variant="success"
                      className="rounded-full"
                    >
                      {!address ? "Connect" : "Connected"}
                    </Button>
                  )}

                  {address && (
                    <div>
                      <div className="flex items-center gap-3 rounded-full border-2 py-2 px-4">
                        <p className="text-[#2EBCDB]">
                          {formatEthAddress(address)}
                        </p>

                        <div
                          onClick={() => setAddress("")}
                          className="cursor-pointer rounded-full border-[1px] p-[3px]"
                        >
                          <Close className="h-3 w-3" />
                        </div>
                      </div>{" "}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      disabled
                      checked={twitterHandle != ""}
                      type="radio"
                      className="h-4 w-4 text-green-500"
                    />
                    {twitterHandle && (
                      <p className="text-green-500">Twitter Connected</p>
                    )}
                    {!twitterHandle && <p className="">Connect Twitter</p>}
                  </div>

                  {!twitterHandle && !twitterLoading && (
                    <Button
                      disabled={!address || twitterLoading}
                      isLoading={twitterLoading}
                      onClick={connectTwitter}
                      variant="success"
                      className="rounded-full disabled:bg-[#A0A6AB] disabled:hover:bg-[#A0A6AB]"
                    >
                      Connect
                    </Button>
                  )}

                  {twitterLoading && <PageLoader />}

                  {twitterHandle && (
                    <div>
                      <div className="flex items-center gap-3 rounded-full border-2 py-2 px-4">
                        <p className="text-[#2EBCDB]">@{twitterHandle} </p>

                        <div
                          onClick={() => setTwitterHandle("")}
                          className="cursor-pointer rounded-full border-[1px] p-[3px]"
                        >
                          <Close className="h-3 w-3" />
                        </div>
                      </div>{" "}
                    </div>
                  )}
                </div>
              </div>
            )}

            {endDate > now && new Date(project.startDate) <= now && (
              <div className="px-4">
                <Button
                  onClick={proceed}
                  isLoading={loading}
                  disabled={endDate <= now || !address || !twitterHandle}
                  className="rounded-0 w-full cursor-pointer justify-center border-none bg-[#FF9933] py-4 text-xl font-bold text-white hover:bg-[#FF9933] disabled:bg-[#A0A6AB] disabled:hover:bg-[#A0A6AB]"
                >
                  Reserve your chutiya
                </Button>
                {endDate > now &&
                  new Date(project.startDate) <= now &&
                  (!address || !twitterHandle) && (
                    <p className="mx-16 mt-4 text-center text-red-500">
                      {" "}
                      Cannot register until you connect accounts above{" "}
                    </p>
                  )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

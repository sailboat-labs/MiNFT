/* eslint-disable @typescript-eslint/no-explicit-any */
import { doc, onSnapshot } from "@firebase/firestore";
import { formatEthAddress } from "eth-address";
import { ethers } from "ethers";
import { httpsCallable } from "firebase/functions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { v4 } from "uuid";

import { firestore, functions } from "@/lib/firebase";
import useAuthenticationDialog from "@/hooks/hookAuthDialog";
import useStorage from "@/hooks/storage";

import Button from "@/components/buttons/Button";
import PageLoader from "@/components/shared/PageLoader";

import { checkTwitterExists, updateAccounts } from "@/firestore/project";
import { addWhitelist, checkWhitelisted } from "@/firestore/whitelist";
import { IProject, IProjectLaunch } from "@/interfaces";

import Close from "~/svg/icons8-close.svg";
import CloseWhite from "~/svg/icons8-close-white.svg";
import EthIcon from "~/svg/icons8-ethereum.svg";
import TwitterIcon from "~/svg/icons8-twitter.svg";

type props = {
  launchInformation: IProjectLaunch;
};

export default function WhitelistRegistration({ launchInformation }: props) {
  const router = useRouter();

  const { AuthDialog, setShowAuthDialog } = useAuthenticationDialog();
  const now = new Date();

  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [twitterHandle, setTwitterHandle] = useState("");
  const [project, setProject] = useState<IProject>();
  const [twitterLoading, setTwitterLoading] = useState(false);
  const [isProjectExists, setIsProjectExists] = useState(true);
  const [whitelisted, setWhitelisted] = useState(false);
  const { getItem, setItem, removeItem } = useStorage();
  const [endDate, setEndDate] = useState<any>();
  const [isLoadingProject, setIsLoadingProject] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!router.query.project) return;

    const _doc = doc(firestore, `Projects/${router.query.project}`);

    const unsubscribe = onSnapshot(_doc, (snapshot) => {
      setIsProjectExists(snapshot.exists());
      console.log(snapshot.exists());

      if (snapshot.exists() == false) return;
      setProject(snapshot.data() as IProject);
      console.log("project", snapshot.data());

      setEndDate(new Date(snapshot.data()?.endDate ?? ""));
    });

    setIsLoadingProject(false);

    return () => {
      unsubscribe();
    };
  }, [router.query]);

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

  const connectWallet = async () => {
    setError("");

    return setShowAuthDialog(true);

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
        window.open(result.data.authUrl, "_self");
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
    if (!project || !project.slug) return console.log("No project");

    setLoading(true);

    if (launchInformation.requiresTwitter) {
      const checkFollows = httpsCallable(functions, "checkFollows");

      const twitterExists = await checkTwitterExists(
        project.slug,
        twitterHandle
      );
      if (twitterExists) {
        setError("Twitter account is already in use");
        setLoading(false);
        return;
      }

      await checkFollows({
        user_account: twitterHandle,
        project_account: project.slug,
      })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then(async (result: any) => {
          if (!project || !project.slug) return console.log("No project");

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
    } else {
      // Twitter not required. Add to whitelist
      await updateAccounts(project.slug, "N/A");
      await addWhitelist({
        id: v4(),
        projectSlug: project.slug,
        wallet: address,
        twitterUsername: "N/A",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      setWhitelisted(true);
    }
  };

  const checkWhitelist = async () => {
    // setError("");

    if (!router.query.project) return;

    const isWhitelisted = await checkWhitelisted(
      router.query.project as string,
      (address as string) ?? ""
    );

    if (isWhitelisted) {
      setWhitelisted(true);
    } else {
      setWhitelisted(false);
    }
  };

  if (!project) return <div></div>;

  return (
    <>
      {project.startDate && (
        <div
          id="join-whitelist"
          className=" flex h-full flex-col items-center justify-center"
        >
          <AuthDialog />
          <div className="flex w-full flex-col items-center text-white lg:flex-row">
            {whitelisted && (
              <div className="rounded-lg bg-white p-4 py-4 text-black shadow-xl">
                <div>Must be magic!</div>
                <p>
                  Your wallet <span className="text-indigo-500">{address}</span>{" "}
                  is whitelisted 🎉
                </p>
                {/* <Button
                  onClick={() => {
                    // router.push("/indiansnft/whitelist/verify");
                  }}
                  className="rounded-0 mt-10 w-fit cursor-pointer justify-center border-none bg-[#FF9933] py-3 font-bold text-white hover:bg-[#FF9933] disabled:bg-[#A0A6AB] disabled:hover:bg-[#A0A6AB]"
                >
                  Verify Whitelist Status
                </Button> */}
              </div>
            )}

            {!whitelisted && (
              <div className="flex w-full flex-col gap-8 rounded-lg  text-black">
                <div className="">
                  {endDate > now &&
                    new Date(project.startDate ?? "") <= now && (
                      <h3>Whitelist Registration</h3>
                    )}
                  {new Date(project.startDate ?? "") > now && (
                    <h3>
                      Registration{" "}
                      <span className="text-red-500">not open</span>
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

                <div className="flex gap-4 rounded-lg bg-[#F8F9FA] py-2">
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
                    <p>Connect Wallet</p>
                  </div>
                  {launchInformation.requiredEthAmount &&
                    launchInformation.requiredEthAmount > 0 && (
                      <div className="flex gap-2">
                        <EthIcon className="h-6 w-6" />
                        <p>
                          You must have at least{" "}
                          {launchInformation.requiredEthAmount} eth in your
                          wallet
                        </p>
                      </div>
                    )}

                  {launchInformation.requiresTwitter && (
                    <div className="flex gap-2">
                      <TwitterIcon className="h-6 w-6" />
                      <p>
                        Follow{" "}
                        <a
                          href={`https://twitter.com/${launchInformation.twitterLink}`}
                          target="_blank"
                          className="cursor-pointer font-bold text-[#2EBCDB] underline"
                          rel="noreferrer"
                        >
                          {launchInformation.twitterLink}
                        </a>{" "}
                        on twitter{" "}
                      </p>
                    </div>
                  )}
                </div>

                {endDate > now && new Date(project.startDate ?? "") <= now && (
                  <div className="flex flex-col gap-3 border-y-[1px] px-4 py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          disabled
                          checked={address != undefined}
                          type="radio"
                          className="h-4 w-4 text-green-500"
                        />

                        {isAuthenticated && (
                          <p className="text-green-500">Wallet Connected</p>
                        )}
                        {!isAuthenticated && <p className="">Connect Wallet</p>}
                      </div>

                      {!isAuthenticating && !isAuthenticated && (
                        <Button
                          isLoading={isAuthenticating}
                          onClick={() => {
                            connectWallet();
                          }}
                          variant="success"
                          className="rounded-full"
                        >
                          {!isAuthenticated ? "Connect" : "Connected"}
                        </Button>
                      )}
                      {isAuthenticating && <PageLoader />}

                      {address && isAuthenticated && (
                        <div>
                          <div className="flex items-center gap-3 rounded-full border-2 py-2 px-4">
                            <p className="text-[#2EBCDB]">
                              {formatEthAddress(address)}
                            </p>

                            <div
                              onClick={() => {
                                setAddress("");
                                logout();
                              }}
                              className="cursor-pointer rounded-full border-[1px] p-[3px]"
                            >
                              <Close className="h-3 w-3" />
                            </div>
                          </div>{" "}
                        </div>
                      )}
                    </div>

                    {launchInformation.requiresTwitter && (
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
                          {!twitterHandle && (
                            <p className="">Connect Twitter</p>
                          )}
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
                              <p className="text-[#2EBCDB]">
                                @{twitterHandle}{" "}
                              </p>

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
                    )}
                  </div>
                )}

                {endDate > now && new Date(project.startDate ?? "") <= now && (
                  <div className="px-4">
                    <Button
                      onClick={proceed}
                      isLoading={loading}
                      disabled={
                        endDate <= now ||
                        !address ||
                        (launchInformation.requiresTwitter && !twitterHandle)
                      }
                      className="rounded-0 w-full cursor-pointer justify-center border-none bg-[#FF9933] py-4 text-xl font-bold text-white hover:bg-[#FF9933] disabled:bg-[#A0A6AB] disabled:hover:bg-[#A0A6AB]"
                    >
                      Reserve your spot
                    </Button>
                    {/* {endDate > now &&
                  new Date(project.startDate) <= now &&
                  (!address || !twitterHandle) && (
                    <p className="mx-16 mt-4 text-center text-red-500">
                      {" "}
                      Cannot register until you connect accounts above{" "}
                    </p>
                  )} */}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

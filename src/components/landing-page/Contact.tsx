/* eslint-disable @typescript-eslint/no-explicit-any */
import { getFunctions, httpsCallable } from "firebase/functions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { v4 } from "uuid";

import { firebaseApp } from "@/lib/firebase";

import Button from "../buttons/Button";

const functions = getFunctions(firebaseApp);
// connectFunctionsEmulator(functions, "localhost", 5001);

interface IContactProps {
  projectSlug: string;
}

export default function Contact({ projectSlug }: IContactProps) {
  const router = useRouter();
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

  const projectAccount = "TheIndianNFTs";

  const [heading, setHeading] = useState("Join the Bloody Bastards");

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
    if (!account || !isAuthenticated) return;
    checkWhitelisted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, isAuthenticated]);

  const changeHeading = (e: any) => {
    e.preventDefault();
    setHeading(e.target.value);
  };

  const connectWallet = async () => {
    // const provider = new ethers.providers.Web3Provider(
    //   (window as any).ethereum
    // );
    // const signer = provider.getSigner();
    // const signerAddress = await signer.getAddress();
    // setAddress(signerAddress);
    // try {
    //   await authenticate({
    //     provider: "metamask",
    //     signingMessage:
    //       "Authenticate with Magic Mynt \nClick to sign in and accept the Magic Mynt Terms of Service.\n\n This request will not trigger a blockchain transaction \nor cost any gas fees.\nYour authentication status will reset after 24 hours",
    //   })
    //     .then((result) => {
    //       if (result?.authenticated) return;
    //       logout();
    //     })
    //     .catch((reason) => {
    //       console.error(reason);
    //     });
    // } catch (e) {
    //   // eslint-disable-next-line no-console
    //   console.error(e);
    // }
  };

  const connectTwitter = async () => {
    const requestTwitterUrl = httpsCallable(functions, "requestTwitterUrl");
    requestTwitterUrl()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((result: any) => {
        window.open(result.data.authUrl, "_blank");
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
              wallet: account,
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
      wallet: account,
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
              {account && isAuthenticated && <p>{account}</p>}

              {!account && (
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
                  disabled={!account}
                  onClick={connectTwitter}
                  type="submit"
                  className="rounded-xl bg-[#006C35] py-5 px-12 text-xl"
                >
                  Connect Twitter
                </Button>
              )}

              {!follows && (
                <Button
                  disabled={!account || !twitterHandle}
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
                  Follow @TheIndianNFTs
                </Button>
              )}

              <Button
                isLoading={loading}
                onClick={() => proceed()}
                disabled={
                  !account || !follows || !twitterHandle || !isAuthenticated
                }
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

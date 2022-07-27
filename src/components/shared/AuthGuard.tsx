/* eslint-disable @next/next/no-img-element */
import { ethers } from "ethers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAddress } from "redux/reducers/selectors/user";
import { setAddress } from "redux/reducers/slices/user";

import { getAccountByProvider, setActiveAccount } from "@/utils/authentication";

import PageLoader from "./PageLoader";
import Layout from "../layout/Layout";

export const connectors = [
  {
    title: "Metamask",
    icon: "/images/WalletIcons/metamaskWallet.png",
    connectorId: "injected",
    priority: 1,
  },
  {
    title: "WalletConnect",
    icon: "/images/WalletIcons/wallet-connect.svg",
    connectorId: "walletconnect",
    priority: 2,
  },
  {
    title: "Trust Wallet",
    icon: "/images/WalletIcons/TrustWallet.png",
    connectorId: "injected",
    priority: 3,
  },
  {
    title: "MathWallet",
    icon: "/images/WalletIcons/MathWallet.svg",
    connectorId: "injected",
    priority: 999,
  },
  {
    title: "TokenPocket",
    icon: "/images/WalletIcons/TokenPocket.svg",
    connectorId: "injected",
    priority: 999,
  },
  {
    title: "SafePal",
    icon: "/images/WalletIcons/SafePal.svg",
    connectorId: "injected",
    priority: 999,
  },
  {
    title: "Coin98",
    icon: "/images/WalletIcons/Coin98.png",
    connectorId: "injected",
    priority: 999,
  },
];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
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

  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

  const [selectedWallet, setSelectedWallet] = useState("");
  const dispatch = useDispatch();
  const activeAddress = useSelector(getAddress);
  console.log({ activeAddress });

  const [startingPage, setStartingPage] = useState(true);

  // const [activeAccount, setActiveAccount] = useState(
  //   account ??
  //     (process.env.NEXT_PUBLIC_ENVIRONMENT == "development"
  //       ? process.env.NEXT_PUBLIC_DEVELOPMENT_ACCOUNT
  //       : "")
  // );

  async function prepareAuth() {
    console.log({ account, isAuthenticated });

    if (environment == "development") {
      setActiveAccount(process.env.NEXT_PUBLIC_DEVELOPMENT_ACCOUNT ?? "");
      dispatch(
        setAddress(
          process.env.NEXT_PUBLIC_DEVELOPMENT_ACCOUNT?.toLowerCase() ?? ""
        )
      );
    } else {
      if (isAuthenticated) {
        const address = await getAccountByProvider();
        dispatch(setAddress(address?.toLowerCase()));
      }
    }

    setStartingPage(false);
  }

  useEffect(() => {
    prepareAuth();
  }, [account, isAuthenticated]);

  useEffect(() => {
    if ((window as any).ethereum) {
      (window as any).ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      (window as any).ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  }, []);

  // if (environment != "development") return <div></div>;

  if (startingPage)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <PageLoader />
      </div>
    );

  if (ethers.utils.isAddress(activeAddress) == false) {
    return (
      <Layout>
        <div className=" flex h-full w-full flex-col gap-5 px-10 pt-10 text-center dark:bg-black">
          <>
            <div className="pb-0 text-lg font-medium leading-6 text-gray-900">
              <Link href="/" passHref>
                <div className="flex w-fit justify-between">
                  <span className="flex cursor-pointer select-none items-center font-dmsans text-4xl font-bold leading-none  text-gray-900  md:mb-0 lg:items-center lg:justify-center">
                    Magic Mynt<span className="text-indigo-600">.</span>
                  </span>
                </div>
              </Link>
              <div className="mt-20 flex w-fit flex-col items-center justify-between text-3xl">
                {isAuthenticating ? (
                  <div className="flex items-center gap-2 fill-black dark:fill-white dark:text-white dark:text-gray-200">
                    <svg
                      role="status"
                      className="mr-2 inline h-4 w-4 animate-spin text-gray-200 "
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      ></path>
                    </svg>
                    Authenticating...
                  </div>
                ) : isInitializing ? (
                  "Initializing"
                ) : (
                  <div className="font-dmsans  dark:text-white dark:text-gray-200">
                    Connect your wallet to continue
                  </div>
                )}
              </div>
            </div>
            <div
              className={`flex flex-col gap-5 pb-5 transition-all ${
                isAuthenticating || isInitializing
                  ? "opacity-20"
                  : "opacity-100"
              }`}
            >
              <div className="w-fit rounded-lg border-2 border-indigo-200 bg-indigo-50  p-3 font-dmsans text-indigo-500 dark:bg-gray-600">
                By connecting a wallet, you agree to Magic Mynt&apos;s Terms of
                Service and acknowledge that you have read and understand the
                Magic Mynt Disclaimer.
              </div>
              <div className="mt-10 w-fit font-dmsans text-2xl">Providers</div>
              <div className="grid w-fit grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
                {connectors.map(({ title, icon, connectorId }, key) => (
                  <div
                    className="flex h-36 w-52 cursor-pointer flex-col  gap-2 rounded-lg border-2 bg-gray-50 px-5 py-2 pt-3 transition-all hover:scale-105 hover:bg-gray-100"
                    key={key}
                    onClick={async () => {
                      setSelectedWallet(title.toString());
                      if (!isAuthenticating && !isInitializing) {
                        try {
                          await authenticate({
                            provider: connectorId as any,
                            signingMessage:
                              "Authenticate with Magic Mynt \nClick to sign in and accept the Magic Mynt Terms of Service.\n\n This request will not trigger a blockchain transaction \nor cost any gas fees.\nYour authentication status will reset after 24 hours",
                          })
                            .then((result) => {
                              if (result?.authenticated) return;
                              logout();
                            })
                            .catch((reason) => {
                              console.error(reason);
                            });
                          // if(!isAuthenticated) logout();
                          window.localStorage.setItem(
                            "connectorId",
                            connectorId
                          );
                        } catch (e) {
                          // eslint-disable-next-line no-console
                          console.error(e);
                        }
                      }
                    }}
                  >
                    <img
                      className="h-12 w-12 rounded-[50%]  p-1"
                      src={icon}
                      alt=""
                    />
                    <div className="w-fit font-dmsans text-lg">
                      {title.toString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        </div>
      </Layout>
    );
  }

  return <>{children}</>;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { getRandomAvatar } from "@/utils/GetRandomAvatar";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMoralis } from "react-moralis";

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

export default function useAuthenticationDialog() {
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
  } = useMoralis();

  const [showAuthDialog, setShowAuthDialog] = useState(false);

  useEffect(() => {
    if (account && isAuthenticated) return setShowAuthDialog(false);
  }, [account, isAuthenticated, setShowAuthDialog]);



  useEffect(() => {
    if (!account || !isAuthenticated) return;
    getRandomAvatar(account);

    axios
      .post("/api/user", { address: account.toString().toLowerCase() })
      .then(() => {
        return;
      })
      .catch((_) => {
        toast.error("Unable to update user");
        return;
      });
  }, [account, isAuthenticated]);


  

  function AuthDialog() {
    return (
      <>
        <Transition appear show={showAuthDialog} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-[1000] overflow-y-auto"
            onClose={() =>
              !isAuthenticating && setShowAuthDialog(!showAuthDialog)
            }
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left  align-middle shadow-xl transition-all dark:bg-gray-700 dark:text-white">
                  <Dialog.Title
                    as="h3"
                    className="pb-10 text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className="flex items-center justify-between">
                      {isAuthenticating ? (
                        <div className="flex items-center gap-2 fill-black dark:fill-white dark:text-white">
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
                          Connecting...
                        </div>
                      ) : isInitializing ? (
                        "Please Wait"
                      ) : (
                        <div className="dark:text-white">
                          Connect your wallet
                        </div>
                      )}
                      <svg
                        onClick={() =>
                          !isAuthenticating &&
                          setShowAuthDialog(!showAuthDialog)
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 cursor-pointer stroke-black dark:stroke-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </Dialog.Title>
                  <div
                    className={`grid grid-cols-2 gap-5 pb-5 transition-all ${
                      isAuthenticating || isInitializing
                        ? "opacity-20"
                        : "opacity-100"
                    }`}
                  >
                    {connectors.map(({ title, icon, connectorId }, key) => (
                      <div
                        className="flex cursor-pointer items-center gap-5 transition-all hover:scale-105"
                        key={key}
                        onClick={async () => {
                          if (!isAuthenticating && !isInitializing) {
                            try {
                              await authenticate({
                                provider: connectorId as any,
                                signingMessage:
                                  "Authenticate with MiNFT \nClick to sign in and accept the \nMiNFT Terms of Service.\n\n This request will not trigger a blockchain transaction \nor cost any gas fees.\nYour authentication status will reset after 24 hours",
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
                          className="h-12 w-12 rounded-[50%] border-2 p-2"
                          src={icon}
                          alt=""
                        />
                        <div>{title.toString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  }

  return {
    AuthDialog,
    isAuthenticating,
    isInitializing,
    authenticate,
    isAuthenticated,
    account,
    chainId,
    logout,
    showAuthDialog,
    setShowAuthDialog,
    isInitialized,
    initialize,
    isAuthUndefined,
    isWeb3EnableLoading,
    isWeb3Enabled,
    network,
    isLoggingOut,
  };
}

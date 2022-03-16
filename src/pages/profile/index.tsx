/* eslint-disable @next/next/no-img-element */
import { doc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useMoralis } from "react-moralis";

import { firebaseApp } from "@/lib/firebase";

import Layout from "@/components/layout/Layout";
import UserNfts from "@/components/pages/profile/usernfts";
import AuthenticationDialog from "@/components/shared/AuthenticationDialog";
import EthAddress from "@/components/shared/EthAddress";
import PageLoader from "@/components/shared/PageLoader";

import { getRandomAvatar } from "@/utils/GetRandomAvatar";

import TimezoneSelector from "./TimezoneSelector";
import useAuthenticationDialog from "@/hooks/UseAuthDialog";

const firestore = getFirestore(firebaseApp);

export default function Profile() {
  // const { account, chainId, isAuthenticated } = useMoralis();
  const { AuthDialog, setShowAuthDialog,account,isAuthenticated } = useAuthenticationDialog();

  const ref = doc(firestore, `users/${account}`);

  const [user, loading, error] = useDocumentData(ref);

  const [profile, setProfile] = useState<any>();

  useEffect(() => {
    if (!account || !isAuthenticated) return;

    setProfile(user);
  }, [user, loading, account,isAuthenticated]);

  if (!account || !isAuthenticated) {
    return (
      <Layout>
        <div className="mt-20 flex h-full w-full flex-col items-center justify-center gap-5 px-10 text-center">
          <AuthDialog />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            Connect your wallet to view your profile
          </div>
          <div
            onClick={() => {
              setShowAuthDialog(true);
            }}
            className="gradient-button"
          >
            Connect your wallet
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {profile ? (
        <div className="contained mt-10">
          <div className="flex flex-col items-center justify-center">
            <img
              className="translate h-36 w-36 rounded-full bg-gray-200 object-cover"
              src={profile.avatarUrl ?? getRandomAvatar(account!)}
              alt=""
            />
            <div className="disabled: mt-5  rounded-md text-center text-2xl font-bold disabled:border-0">
              {profile.name ?? "Domain name not set"}
            </div>
            {account && <EthAddress className="mt-5" account={account} />}
            <TimezoneSelector timeZone={profile.timeZone} />
            <UserNfts account={account} />
          </div>
        </div>
      ) : (
        <PageLoader />
      )}
    </Layout>
  );
}

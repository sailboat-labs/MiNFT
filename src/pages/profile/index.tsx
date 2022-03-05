import { useMoralis } from "react-moralis";

import Layout from "@/components/layout/Layout";
import EthAddress from "@/components/shared/EthAddress";
import { useEffect, useState } from "react";
import AuthenticationDialog from "@/components/shared/AuthenticationDialog";
import ProfileName from "@/components/pages/profile/NameField";
import TimezoneSelector from "./TimezoneSelector";

export default function Profile() {
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const { account, chainId } = useMoralis();

  if (!account) {
    return (
      <Layout>
        <div className="mt-20 flex h-full w-full flex-col items-center justify-center gap-5 px-10 text-center">
          <AuthenticationDialog
            showAuthDialog={showAuthDialog}
            setShowAuthDialog={setShowAuthDialog}
          />
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
          <div className="text-2xl font-bold text-gray-900">
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
      <div className="contained mt-10">
        <div className="flex flex-col items-center justify-center">
          <div className="h-36 w-36 rounded-[50%] bg-gray-200"></div>
          <ProfileName />
          {account && <EthAddress className="mt-5" account={account} />}
          <TimezoneSelector/>
        </div>
      </div>
    </Layout>
  );
}
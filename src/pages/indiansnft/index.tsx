import { ethers } from "ethers";
import { getContractForMinting } from "features/minting-page/utils/get-contract-for-minting";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Web3 from "web3";

import Contact from "@/components/landing-page/Contact";
import Header from "@/components/landing-page/Header";
import PageLoader from "@/components/shared/PageLoader";

import { changeNetwork } from "@/utils/authentication";

export default function LandingPage() {
  // let contract: ethers.Contract | undefined = undefined;
  const [contract, setContract] = useState<ethers.Contract | undefined>(
    undefined
  );

  const { network, authenticate, isAuthenticated, account, chainId, logout } =
    useMoralis();

  // const contractAddress = "0x7311102EcC5a3Effb9Fc2e734d918A4eb448A13E";
  const contractAddress = "0xd1aFbbdf886cc20E5c683B06444a116aDCe11F8E";

  async function prepareContract() {
    const _contract = await getContractForMinting(contractAddress);
    console.log({ _contract });

    if (_contract) {
      setContract(_contract);
    }
  }

  async function openProvider() {
    try {
      await authenticate({
        provider: "metamask",
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
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }

  useEffect(() => {
    if (!account || !isAuthenticated) return;
    prepareContract();
  }, [chainId, network, isAuthenticated, account]);

  if (!account || !isAuthenticated)
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <div
          onClick={() => {
            openProvider();
          }}
          className="cursor-pointer transition-all hover:scale-105"
        >
          Connect Wallet
        </div>
      </div>
    );

  if (
    process.env.NEXT_PUBLIC_ENVIRONMENT == "development" &&
    chainId != Web3.utils.toHex(1337)
  )
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <div
          onClick={async () => {
            changeNetwork(1337);
          }}
          className="cursor-pointer transition-all hover:scale-105"
        >
          Switch Network to localhost
        </div>
      </div>
    );

  if (
    process.env.NEXT_PUBLIC_ENVIRONMENT == "staging" &&
    chainId != Web3.utils.toHex(4)
  )
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <div
          onClick={async () => {
            changeNetwork(4);
          }}
          className="cursor-pointer transition-all hover:scale-105"
        >
          Switch Network to Rinkeby Testnet
        </div>
      </div>
    );

  if (!contract)
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <PageLoader />
      </div>
    );

  return (
    <section className="h-screen overflow-y-auto">
      <div className="relative z-0 bg-[url('/images/landing/india.png')] bg-cover bg-center ">
        <div className="relative z-30 h-52 w-full bg-black bg-opacity-70">
          <Header />
          {/* <Banner contract={contract} /> */}
        </div>
      </div>
      <div className="h-full bg-[#FF9933]">
        {/* <SectionTwo />
        <SectionThree />
        <SectionFour /> */}
        {/* <Join /> */}
        <Contact projectSlug="indians-nft" />
        {/* <Footer /> */}
      </div>
    </section>
  );
}

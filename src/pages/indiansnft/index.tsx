import { ethers } from "ethers";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Web3 from "web3";

import { firestore } from "@/lib/firebase";

import Banner from "@/components/landing-page/Banner";
import Contact from "@/components/landing-page/Contact";
import Footer from "@/components/landing-page/Footer";
import Header from "@/components/landing-page/Header";
import Join from "@/components/landing-page/Join";
import SectionFour from "@/components/landing-page/SectionFour";
import SectionThree from "@/components/landing-page/SectionThree";
import SectionTwo from "@/components/landing-page/SectionTwo";
import PageLoader from "@/components/shared/PageLoader";

import { getContractForMinting } from "@/contract-api/logic/get-contract-for-minting";
import { changeNetwork } from "@/utils/authentication";

import { Project } from "@/types";

export default function LandingPage() {
  // let contract: ethers.Contract | undefined = undefined;
  const [contract, setContract] = useState<ethers.Contract | undefined>(
    undefined
  );

  const { network, authenticate, isAuthenticated, account, chainId, logout } =
    useMoralis();

  const contractAddress = "0x01472E8fd0887D88Eefa39eE07b0CDFD3713E22B";

  const [project, setProject] = useState<Project>();

  useEffect(() => {
    const _doc = doc(firestore, `Projects/indians-nft`);
    const unsubscribe = onSnapshot(_doc, (snapshot) => {
      setProject(snapshot.data() as Project);
      console.log(snapshot.data());
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
        <div className="relative z-30 h-full w-full bg-black bg-opacity-70">
          <Header />
          <Banner contract={contract} />
        </div>
      </div>
      <div className=" bg-[#FF9933]">
        <SectionTwo />
        <SectionThree />
        <SectionFour />
        <Join />
        {project && <Contact project={project} />}
        <Footer />
      </div>
    </section>
  );
}

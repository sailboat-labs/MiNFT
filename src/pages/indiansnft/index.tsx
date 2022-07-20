import { ethers } from "ethers";
import { getContractForMinting } from "features/minting-page/utils/get-contract-for-minting";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Banner from "@/components/landing-page/Banner";
import Contact from "@/components/landing-page/Contact";
import Footer from "@/components/landing-page/Footer";
import Header from "@/components/landing-page/Header";
import Join from "@/components/landing-page/Join";
import SectionFour from "@/components/landing-page/SectionFour";
import SectionThree from "@/components/landing-page/SectionThree";
import SectionTwo from "@/components/landing-page/SectionTwo";
import PageLoader from "@/components/shared/PageLoader";

export default function LandingPage() {
  // let contract: ethers.Contract | undefined = undefined;
  const [contract, setContract] = useState<ethers.Contract | undefined>(
    undefined
  );

  const [accounts, setAccounts] = useState([]);

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
    toast.dismiss();
    toast("Click on the metamask plugin to continue");
    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );

      const _accounts = await provider.send("eth_requestAccounts", []);
      setAccounts(_accounts);
      prepareContract();
    } catch (error: any) {
      if (
        error?.message == "Already processing eth_requestAccounts. Please wait."
      ) {
        // toast.error("Pop up already open. Open metamask");
      }
    }
  }

  useEffect(() => {
    // setInterval(() => {
    //   prepareContract();
    // }, 1000);
    // openProvider();

    prepareContract();
  }, []);

  if (!contract)
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <PageLoader />

        {accounts.length < 1 && (
          <div
            onClick={() => {
              openProvider();
            }}
            className="cursor-pointer transition-all hover:scale-105"
          >
            Connect Wallet
          </div>
        )}
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
      <div className="bg-[#FF9933]">
        <SectionTwo />
        <SectionThree />
        <SectionFour />
        <Join />
        <Contact projectSlug="indians-nft" />
        <Footer />
      </div>
    </section>
  );
}

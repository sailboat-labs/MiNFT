import { ethers } from "ethers";
import { getContractForMinting } from "features/minting-page/utils/get-contract-for-minting";
import { useEffect, useState } from "react";

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
  // const contractAddress = "0x7311102EcC5a3Effb9Fc2e734d918A4eb448A13E";
  const contractAddress = "0xd1aFbbdf886cc20E5c683B06444a116aDCe11F8E";

  async function prepareContract() {
    const _contract = await getContractForMinting(contractAddress);
    setContract(_contract);
  }

  useEffect(() => {
    // setInterval(() => {
    //   prepareContract();
    // }, 1000);
    prepareContract();
  }, []);

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

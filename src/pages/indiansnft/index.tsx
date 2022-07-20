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
  // const contractAddress = "0x5452c07C47dfD2Dc3bA7A6bbd422f2b689b36037";
  const contractAddress = "0xfe6a34041C1B42E11AFDBd529468886011a06e04";
  let account: string;

  async function prepareContract() {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    const _contract = await getContractForMinting(contractAddress);
    setContract(_contract);
    if (!contract) return;
    console.log(contract);
    const totalQuantity = await contract.totalQuantity();
    const totalSupply = await contract.totalSupply();
    const tokensMinted = await contract.tokensMinted(signerAddress);
    console.log({ tokensMinted: parseInt(tokensMinted?._hex) });

    // setTotalQuantity(parseInt(totalQuantity?._hex));
    // setTotalSupply(parseInt(totalSupply?._hex));
    // if (tokensMinted > 0) {
    //   setMintButtonText("Already Minted");
    // }
  }

  useEffect(() => {
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

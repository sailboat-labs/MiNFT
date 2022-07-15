import Footer from "@/components/layout/footer";
import Banner from "@/components/pages/Homepage/Banner";
import Best_Blockchains from "@/components/pages/Homepage/Best_Blockchains";
import ContractSection from "@/components/pages/Homepage/ContractSection";
import GetStarted from "@/components/pages/Homepage/GetStarted";
import Marquee from "@/components/pages/Homepage/Marquee";
import Metadata from "@/components/pages/Homepage/Metadata";
import Seo from "@/components/Seo";

export default function Index() {
  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden bg-gradient-to-r from-[#151515] via-[#191715] to-[#1B1611]">
      <Seo templateTitle="Home" />
      {/* <Header /> */}
      <Banner />
      {/* <Test_Banner /> */}
      {/* <Features /> */}
      <Best_Blockchains />
      <Marquee />
      <Metadata />
      <ContractSection />
      <GetStarted />
      {/* <Guides /> */}
      {/* <Join_Community /> */}
      {/* <Newsletter /> */}
      <Footer />
    </div>
  );
}

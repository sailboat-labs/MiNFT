import Footer from "@/components/layout/footer";
import Best_Blockchains from "@/components/pages/homepage/Best_Blockchains";
import ContractSection from "@/components/pages/Homepage/ContractSection";
import GetStarted from "@/components/pages/homepage/GetStarted";
import Marquee from "@/components/pages/homepage/Marquee";
import Metadata from "@/components/pages/homepage/Metadata";
import Test_Banner from "@/components/pages/homepage/Test_Banner";
import Seo from "@/components/Seo";

export default function Index() {
  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden bg-gradient-to-r from-[#151515] via-[#191715] to-[#1B1611]">
      <Seo templateTitle="Home" />
      {/* <Header /> */}
      {/* <Banner /> */}
      <Test_Banner />
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

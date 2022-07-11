import Banner from "@/components/pages/homepage/Banner";
import Best_Blockchains from "@/components/pages/homepage/Best_Blockchains";
import Features from "@/components/pages/homepage/Features";
import Footer from "@/components/pages/homepage/Footer";
import Guides from "@/components/pages/homepage/Guides";
import Header from "@/components/pages/homepage/Header";
import Join_Community from "@/components/pages/homepage/Join_Community";
import Seo from "@/components/Seo";

export default function OGIndex() {
  return (
    <div className="overflow-y-auto overflow-x-hidden bg-gradient-to-r from-[#040832] via-[#171340] to-[#190424]">
      <Seo templateTitle="Home" />
      <Header />
      <Banner />
      <Features />
      <Best_Blockchains />
      <Guides />
      <Join_Community />
      {/* <Newsletter /> */}
      {/* <Metadata /> */}
      <Footer />
    </div>
  );
}

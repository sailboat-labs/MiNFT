import Footer from "@/components/layout/footer";
import Best_Blockchains from "@/components/pages/homepage/Best_Blockchains";
import Carousel from "@/components/pages/Homepage/Carousel";
import DeployContract from "@/components/pages/homepage/DeployContract";
import GetStarted from "@/components/pages/homepage/GetStarted";
import Marquee from "@/components/pages/homepage/Marquee";
import Metadata from "@/components/pages/homepage/Metadata";
import Seo from "@/components/Seo";

export default function carousel() {
  return (
    <div className="overflow-y-auto overflow-x-hidden bg-gradient-to-r from-[#151515] via-[#191715] to-[#1B1611]">
      <Seo templateTitle="Home" />
      <Carousel />
      <Best_Blockchains />
      <Marquee />
      <Metadata />
      <DeployContract />
      <GetStarted />
      <Footer />
    </div>
  );
}

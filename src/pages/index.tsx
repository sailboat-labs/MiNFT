import Banner from "@/components/pages/Homepage/Banner";
import Features from "@/components/pages/Homepage/Features";
import Footer from "@/components/pages/Homepage/Footer";
import Guides from "@/components/pages/Homepage/Guides";
import Header from "@/components/pages/Homepage/Header";
import Join_Community from "@/components/pages/Homepage/Join_Community";
import Seo from "@/components/Seo";

export default function Index() {
  return (
    <div className="overflow-y-auto overflow-x-hidden bg-gradient-to-r from-[#040832] via-[#171340] to-[#190424]">
      <Seo templateTitle="Home" />
      <Header />
      <Banner />
      <Features />
      <Guides />
      <Join_Community />
      <Footer />
    </div>
  );
}

import Header from "@/components/dashboard/Header";
import Footer from "@/components/layout/footer";
import Banner from "@/components/pages/homepage/Banner";
import Features from "@/components/pages/homepage/Features";
import Guides from "@/components/pages/homepage/Guides";
import Join_Community from "@/components/pages/homepage/Join_Community";
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

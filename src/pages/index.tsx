import Banner from "@/components/home/Banner";
import Features from "@/components/home/Features";
import Guides from "@/components/home/Guides";
import Header from "@/components/home/Header";
import Join_Community from "@/components/home/Join_Community";
import Marquee from "@/components/home/Marquee";
import Footer from "@/components/layout/footer";

export default function Homepage() {
  return (
    <div className="h-screen overflow-y-auto">
      <Header />
      <div className="bg-dotted bg-repeat">
        <Banner />
        <Marquee />
        <Features />
        <Guides />
        <Join_Community />
      </div>
      <Footer />
    </div>
  );
}

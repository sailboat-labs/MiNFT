import Banner from "@/components/home/Banner";
import Features from "@/components/home/Features";
import Footer from "@/components/home/Footer";
import Guides from "@/components/home/Guides";
import Header from "@/components/home/Header";
import Join_Community from "@/components/home/Join_Community";
import Marquee from "@/components/home/Marquee";
// import Footer from "@/components/layout/footer"; // Blue Footer with many links
export default function Homepage() {
  return (
    <div className="h-screen overflow-y-auto">
      <Header />
      <div className="bg-white bg-repeat">
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

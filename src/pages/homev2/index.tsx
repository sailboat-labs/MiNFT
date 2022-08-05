import { useEffect } from "react";

import Banner from "@/components/home-v2/Banner";
import FAQ from "@/components/home-v2/FAQs";
import Features from "@/components/home-v2/Features";
import Footer from "@/components/home-v2/Footer";
import Header from "@/components/home-v2/Header";
import Highlights from "@/components/home-v2/Highlights";
import Join_Community from "@/components/home-v2/Join_Community";
import MarqueeSection from "@/components/home-v2/Marquee";

export default function HomePage() {
  useEffect(() => {
    document.body.className = "";
  });

  return (
    <div className="overflow-auto">
      <Header />
      <Banner />
      <Highlights />
      <MarqueeSection />
      <Features />
      <FAQ />
      <Join_Community />
      <Footer />
    </div>
  );
}

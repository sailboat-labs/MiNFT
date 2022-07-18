import Banner from "@/components/landing-page/Banner";
import Contact from "@/components/landing-page/Contact";
import Footer from "@/components/landing-page/Footer";
import Header from "@/components/landing-page/Header";
import Join from "@/components/landing-page/Join";
import SectionFour from "@/components/landing-page/SectionFour";
import SectionThree from "@/components/landing-page/SectionThree";
import SectionTwo from "@/components/landing-page/SectionTwo";

export default function LandingPage() {
  return (
    <section className="h-screen overflow-y-auto">
      <div className="relative z-0 bg-[url('/images/landing/india.png')] bg-cover ">
        <div className="relative z-30 w-full h-full bg-black bg-opacity-40">
          <Header />
          <Banner />
        </div>
      </div>
      <div className="bg-[#FF9933]">
        <SectionTwo />
        <SectionThree />
        <SectionFour />
        <Join />
        <Contact />
        <Footer />
      </div>
    </section>
  );
}

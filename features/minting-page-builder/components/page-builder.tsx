import Banner from "@/components/landing-page/Banner";
import Contact from "@/components/landing-page/Contact";
import Footer from "@/components/landing-page/Footer";
import Header from "@/components/landing-page/Header";
import Join from "@/components/landing-page/Join";
import SectionFour from "@/components/landing-page/SectionFour";
import SectionThree from "@/components/landing-page/SectionThree";
import SectionTwo from "@/components/landing-page/SectionTwo";

export default function PageBuilder() {
  return (
    <section className="h-full overflow-y-auto">
      <div className="bg-[#006C35] font-dmsans ">
        <Header />
        <Banner />
      </div>
      <div className="bg-[#161616]">
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

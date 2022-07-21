import Contact from "@/components/landing-page/Contact";
import Header from "@/components/landing-page/Header";

export default function LandingPage() {
  return (
    <section className="h-screen overflow-y-auto">
      <div className="relative z-0 bg-[url('/images/landing/india.png')] bg-cover bg-center ">
        <div className="relative z-30 h-full w-full bg-black bg-opacity-60">
          <Header />
          {/* <Banner /> */}
        </div>
      </div>
      <div className="h-full bg-[#FF9933]">
        {/* <SectionTwo />
        <SectionThree />
        <SectionFour />
        <Join /> */}
        <Contact projectSlug="indians-nft" />
        {/* <Footer /> */}
      </div>
    </section>
  );
}

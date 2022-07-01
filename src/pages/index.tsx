import Banner from "@/components/pages/homepage/Banner";
import Features from "@/components/pages/homepage/Features";

export default function Index() {
  return (
    <div className="overflow-y-auto overflow-x-hidden bg-gradient-to-r from-[#040832] via-[#171340] to-[#190424]">
      <Banner />

      <Features />
    </div>
  );
}

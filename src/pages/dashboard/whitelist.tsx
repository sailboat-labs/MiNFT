import Footer from "@/components/dashboard/Footer";
import Header from "@/components/dashboard/Header";
import Navbar from "@/components/dashboard/NavBar";
import Sidebar from "@/components/dashboard/Sidebar";
import Whitelist from "@/components/dashboard/Whitelist";
import Seo from "@/components/Seo";

export default function WhitelistPage() {
  return (
    <div>
      <Seo templateTitle="Whitelist" />
      <Header />
      <div className="flex flex-row">
        <Sidebar currentPage="whitelist" />
        <div className="w-full">
          <Navbar title="Whitelist" />
          <Whitelist />
        </div>
      </div>
      <Footer />
    </div>
  );
}

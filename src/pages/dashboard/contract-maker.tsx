import Header from "@/components/dashboard/Header";
import Navbar from "@/components/dashboard/NavBar";
import Sidebar from "@/components/dashboard/Sidebar";
import Seo from "@/components/Seo";

export default function ContractMakerPage() {
  return (
    <div>
      <Seo templateTitle="Contract Maker" />
      <Header />
      <Sidebar currentPage="contract-maker" />
      <Navbar />
    </div>
  );
}

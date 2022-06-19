import DashboardHome from "@/components/dashboard/Dashboard";
import Footer from "@/components/dashboard/Footer";
import Header from "@/components/dashboard/Header";
import Navbar from "@/components/dashboard/NavBar";
import Sidebar from "@/components/dashboard/Sidebar";
import Seo from "@/components/Seo";

export default function DashboardHomePage() {
  return (
    <div className="">
      <Seo templateTitle="Dashboard" />
      <Header />
      <div className='flex flex-row'>
        <Sidebar currentPage="/" />
        <div>
        <Navbar />
        <DashboardHome />
        </div>
      </div>
      <Footer />
    </div>
  );
}

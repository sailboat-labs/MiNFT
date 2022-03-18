import Footer from "@/components/layout/footer";
import Layout from "@/components/layout/Layout";
import FAQ from "@/components/pages/landing/FAQ";
import Feedback from "@/components/pages/landing/Feedback";
import Header from "@/components/pages/landing/header";
import LaunchingSoon from "@/components/pages/landing/launchingsoon";
import Leaderboard from "@/components/pages/landing/Leaderboard";
import NewlyAdded from "@/components/pages/landing/newlyadded";
import Seo from "@/components/Seo";

// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  // const { status, account } = useMetaMask();

  // useEffect(() => {
  //   if (status == "connected" && account)
  //     axios
  //       .post("/api/user", { address: account })
  //       .then(() => {
  //         return;
  //       })
  //       .catch((_) => {
  //         toast.error("Unable to update user");
  //         return;
  //       });
  // });
  return (
    <div className="dark:text-white bg-white dark:bg-black">
      <Seo />

      <div>
        <Header />
        <NewlyAdded />
        <Leaderboard/>
        <LaunchingSoon />
        <FAQ/>
        <Feedback/>
        <Footer />
      </div>
    </div>
  );
}

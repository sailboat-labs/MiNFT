import axios from "axios";
import { useMetaMask } from "metamask-react/lib/use-metamask";
import { useEffect } from "react";
import toast from "react-hot-toast";

import Footer from "@/components/layout/footer";
import ExploreCategories from "@/components/pages/landing/categories";
import Header from "@/components/pages/landing/header";
import LaunchingSoon from "@/components/pages/landing/launchingsoon";
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
    <div className="">
      <Seo />

      <main>
        <Header />
        <ExploreCategories />
        <LaunchingSoon />
        <NewlyAdded />
        <Footer />
      </main>
    </div>
  );
}

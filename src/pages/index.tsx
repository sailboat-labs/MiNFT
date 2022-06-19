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
    <div className="bg-white dark:bg-black dark:text-white">
      <Seo />

      <div>
        {/* <Header />
        <NewlyAdded />
        <Leaderboard />
        <LaunchingSoon />
        <FAQ />
        <Feedback />
        <Footer /> */}
      </div>
    </div>
  );
}

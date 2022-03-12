import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";

import Footer from "./footer";
import Navbar from "./Navbar";
export default function Layout({ children }: { children: React.ReactNode }) {
  // useEffect(() => {
  //   //  status == 'connecting' && toast('Connecting metamask')
  //   //  status == 'connected' && toast.success(`Connected on ${account && formatEthAddress(account)}`)
  //   status == "unavailable" && toast.success("Metamask not available");
  // }, [status, account]);

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

  const variants = {
    initial: {
      opacity: 0,
      y: 30,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.61, 1, 0.88, 1],
      },
    },
  };

  return (
    <div className="flex flex-col bg-white text-black dark:bg-black dark:text-white">
      <Navbar />
      <div className="min-h-screen pt-[3.2rem]">
        <AnimatePresence>
          <motion.div initial="initial" animate="enter" variants={variants}>
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer className="bottom-0 w-full" />
    </div>
  );
}

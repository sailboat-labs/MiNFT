import { useMetaMask } from "metamask-react";
import * as React from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Footer from "./footer";

import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  useEffect(() => {
    //  status == 'connecting' && toast('Connecting metamask')
    //  status == 'connected' && toast.success(`Connected on ${account && formatEthAddress(account)}`)
    status == "unavailable" && toast.success("Metamask not available");
  }, [status, account]);

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="min-h-screen pt-[3.2rem]">{children}</div>
      <Footer className="bottom-0 w-full" />
    </div>
  );
}

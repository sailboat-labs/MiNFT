import { formatEthAddress } from "eth-address";
import { useMoralis } from "react-moralis";

export default function DashboardHome() {
  const { account, logout, isAuthenticated } = useMoralis();

  return (
    <div className="flex h-screen w-full  justify-center">
      <div className="flex h-72 w-fit items-center justify-center rounded-lg font-dmsans text-3xl">
        Hey {account && formatEthAddress(account!)}, Dashboard&apos;s still
        cookin&apos;!
      </div>
    </div>
  );
}

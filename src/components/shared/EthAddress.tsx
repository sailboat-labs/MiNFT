import { formatEthAddress } from "eth-address";

type props = {
  account?: string;
  className?:string;
};

export default function EthAddress({ account,className }: props) {
  return <>{account && <div className={className}>{formatEthAddress(account)}</div>}</>;
}

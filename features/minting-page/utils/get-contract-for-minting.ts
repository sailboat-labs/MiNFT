import { ethers } from "ethers";
import { getContract } from "features/dashboard-home/components/DeployedContracts/index.logic";
import toast from "react-hot-toast";

export async function getContractForMinting(contractAddress: string) {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  let accounts: any;
  try {
    accounts = await provider.send("eth_requestAccounts", []);

    if (accounts?.length < 1) return;
    const signer = provider.getSigner();
    const registry = getContract("Registry", signer);

    if (!registry) {
      toast.error("Registry not found");
      return;
    }

    const contractType = ethers.utils.parseBytes32String(
      await registry.contract.proxyType(contractAddress)
    );

    const abi = getContract(contractType, signer)?.abi;

    const contract = new ethers.Contract(contractAddress, abi, signer);

    return contract;
  } catch (error: any) {
    console.log(error);
  }
}

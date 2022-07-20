import { ethers } from "ethers";
import { getContract } from "features/dashboard/components/DeployedContracts/index.logic";
import { toast } from "react-toastify";

export async function getContractForMinting(contractAddress: string) {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
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

  // const name = await contract.name();
  // const symbol = await contract.symbol();
  // const totalSupply = await contract.totalSupply();
  // const tokensMinted = (
  //   await contract.tokensMinted(signerAddress)
  // )._hex.toString();
  // const totalQuantity = (await contract.totalQuantity())._hex.toString();

  // console.log({ format: ethers.utils.formatEther(98) });

  // console.log({
  //   name,
  //   symbol,
  //   price: contract.mintPrice()._hex,
  //   tokensMinted,
  //   totalQuantity,
  //   totalSupply,
  // });
  // console.log({ contract });
  return contract;
}

import { ethers } from "ethers";

import { getContract } from "./getContract";

export async function deployClone(contractType: string, payload: any = "0x") {
  if (!window) {
    return { success: false, response: "Please Install metamask" };
  }

  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const factory = getContract("Factory", signer)?.contract;
  const contract = getContract(contractType, signer)?.contract;
  const abi: any = getContract(contractType, signer)?.abi;

  if (!factory || !contract) {
    return {
      success: false,
      response: "Factory or contract factory not found",
    };
  }

  const cloneAddress = factory.getDeterministicAddress(contract.address);

  const cloneContract = new ethers.Contract(cloneAddress, abi, signer);

  const data =
    payload === "0x"
      ? payload
      : cloneContract.interface.encodeFunctionData("initialize", payload);

  await (await factory.deployProxy(await contract.contractType(), data)).wait();

  const cloneContractName = await cloneContract.name();

  return {
    success: true,
    response: `Created contract clone ${cloneContractName}`,
  };
}

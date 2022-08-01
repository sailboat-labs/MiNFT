import { ethers } from "ethers";

import { getContract } from "./getContract";

export async function getCloneContracts() {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  const registry = getContract("Registry", signer);

  if (!registry) {
    return {
      success: false,
      response: "Registry not found",
    };
  }

  const clones = await registry.contract.getAll(signerAddress);
  const cloneDetails: any[] = [];

  for (let index = 0; index < clones.length; index++) {
    const cloneAddress = clones[index];
    const contractType = ethers.utils.parseBytes32String(
      await registry.contract.proxyType(cloneAddress)
    );

    const abi = getContract(contractType, signer)?.abi;
    const clone = new ethers.Contract(cloneAddress, abi, signer);

    if (!clone) {
      return {
        success: false,
        response: "Contract not found",
      };
    }

    const name = clone.name ? await clone.name() : "";
    const symbol = clone.symbol ? await clone.symbol() : "";
    const network = await clone.provider.getNetwork();

    cloneDetails.push({
      name,
      symbol,
      address: cloneAddress,
      network,
      contractType,
    });
  }

  return { success: true, response: cloneDetails };
}

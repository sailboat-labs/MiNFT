import { ethers } from "ethers";

import { enumContractType } from "@/enums/contract-type.enum";

import CLASSIC_MINT_JSON from "../../../../src/data/contracts/abi/classicmint.json";
import FACTORY_JSON from "../../../../src/data/contracts/abi/MiNFTFactory.json";
import REGISTRY_JSON from "../../../../src/data/contracts/abi/MiNFTRegistry.json";

interface contractPayload {
  contractType: string;
}

export async function deployContract({ contractType }: contractPayload) {
  console.log({ contractType });

  if (!window) {
    return { success: false, response: "Please Install metamask" };
  }

  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();

  const factory = getContract("Factory", signer);
  const contract = getContract(contractType, signer);
  if (!factory || !contract) {
    return {
      success: false,
      response: "Factory or contract factory not found",
    };
  }

  const cloneAddress = factory.contract.getDeterministicAddress(
    contract.contract.address
  );

  const cloneContract = new ethers.Contract(
    cloneAddress,
    getContract(contractType, signer)?.abi,
    signer
  );

  const signerAddress = await signer.getAddress();

  //   Name - Legendary Indians
  // Symbol - OGINDIAN
  // Reserved tokens  - 0
  // PublicSale: 40
  // Total quantity: 40
  // Max mint per wallet/account - 1
  // Max mint per transaction - 1
  // Mint price - 0.1ETH
  // Starting timestamp - 22/07/2022  10PM NZT
  // ending timestamp ]  - 05/08/2022  10PM NZT

  const contractInfo = {
    owner: signerAddress,
    trustedForwarder: process.env.NEXT_PUBLIC_FORWARDER_ADDRESS,
    name: "Legendary Indians",
    symbol: "OGINDIAN",
    saleConfig: [40, 0, 1, 1, ethers.utils.parseEther("1"), 0, 1689793367],
  };

  const data = cloneContract.interface.encodeFunctionData("initialize", [
    contractInfo.owner,
    contractInfo.trustedForwarder,
    contractInfo.name,
    contractInfo.symbol,
    contractInfo.saleConfig,
  ]);

  await (
    await factory.contract.deployProxy(
      await contract.contract.contractType(),
      data
    )
  ).wait();

  const cloneContractName = await cloneContract.name();

  return {
    success: true,
    response: `Created contract clone ${cloneContractName}`,
  };
}

export async function getCloneContracts() {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();

  const registry = getContract("Registry", signer);

  if (!registry) {
    return {
      success: false,
      response: "Registry not found",
    };
  }

  const signerAddress = await signer.getAddress();
  const clones = await registry.contract.getAll(signerAddress);

  const contractDetails: any[] = [];

  for (let index = 0; index < clones.length; index++) {
    const clone = clones[index];
    const contractType = ethers.utils.parseBytes32String(
      await registry.contract.proxyType(clone)
    );

    const abi = getContract(contractType, signer)?.abi;

    const contract = new ethers.Contract(clone, abi, signer);

    if (!contract) {
      return {
        success: false,
        response: "Contract not found",
      };
    }

    const name = await contract.name();
    const symbol = await contract.symbol();
    const network = await contract.provider.getNetwork();

    console.log(await contract.owner());

    contractDetails.push({
      name,
      symbol,
      address: clone,
      network,
      contractType,
    });
  }

  return { success: true, response: contractDetails };
}

export function getContract(contractType: string, signer: any) {
  switch (contractType) {
    case enumContractType.CLASSIC_MINT: {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CLASSIC_MINT!,
        CLASSIC_MINT_JSON.abi,
        signer
      );

      const abi = CLASSIC_MINT_JSON.abi;

      return { contract, abi };
    }
    case enumContractType.CLASSIC_MINT_WITH_WL: {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CLASSIC_MINT!,
        CLASSIC_MINT_JSON.abi,
        signer
      );

      return contract;
    }
    case enumContractType.DUTCH_AUCTION: {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CLASSIC_MINT!,
        CLASSIC_MINT_JSON.abi,
        signer
      );

      return contract;
    }
    case enumContractType.DUTCH_AUCTION_WITH_WL: {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CLASSIC_MINT!,
        CLASSIC_MINT_JSON.abi,
        signer
      );

      return contract;
    }
    case enumContractType.FAIR_DUTCH_AUCTION: {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CLASSIC_MINT!,
        CLASSIC_MINT_JSON.abi,
        signer
      );

      return contract;
    }
    case enumContractType.FAIR_DUTCH_AUCTION_WITH_WL: {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CLASSIC_MINT!,
        CLASSIC_MINT_JSON.abi,
        signer
      );

      return contract;
    }
    case enumContractType.PURE_WHITELIST: {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CLASSIC_MINT!,
        CLASSIC_MINT_JSON.abi,
        signer
      );

      return contract;
    }
    case "Factory": {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_FACTORY_ADDRESS!,
        FACTORY_JSON.abi,
        signer
      );

      const abi = FACTORY_JSON.abi;

      return { contract, abi };
    }
    case "Registry": {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_REGISTRY_ADDRESS!,
        REGISTRY_JSON.abi,
        signer
      );

      const abi = REGISTRY_JSON.abi;

      return { contract, abi };
    }

    default:
      return;
  }
}

import { ContractFactory, ethers } from "ethers";

import { enumContractType } from "@/enums/contract-type.enum";

import CLASSIC_MINT_JSON from "../../../../src/data/classicmint.json";
import FACTORY_JSON from "../../../../src/data/contracts/MiNFTFactory/MiNFTFactory.json";
import REGISTRY_JSON from "../../../../src/data/contracts/MiNFTRegistry/MiNFTRegistry.json";

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
  const factory = getContractFactory("Factory", signer);
  const contractFactory = getContractFactory(contractType, signer);

  if (!factory || !contractFactory) {
    return {
      success: false,
      response: "Factory or contract factory not found",
    };
  }

  const attachedFactory = factory.attach(
    "0xEd9E9666F66e762B9A685193CACAE56FeF0cDd03"
  );
  const attachedClassicFactory = contractFactory.attach(
    "0x0342d3fc7Ca13f25121Ad3f26ecc745eDC121f50"
  );

  const contractInfo = {
    name: "Proxima Labs",
    symbol: "PLS",
    saleConfig: [10, 4, 3, 1, 1, 0, 0],
  };

  const clone = await deploy(
    signer,
    attachedFactory,
    attachedClassicFactory,
    contractInfo
  );

  return { success: true, response: clone };
}

async function deploy(
  signer: ethers.providers.JsonRpcSigner,
  factory: ethers.Contract,
  contract: ethers.Contract,
  payload: any
) {
  // deploy clone
  console.log("Deploying");

  const contractType = await contract.contractType();

  // get clone address
  const getClone = await (await factory.deployProxy(contractType, "0x")).wait();

  const cloneAddress = getClone.events[0].args.proxy;
  const cloneFactory = getContractFactory(
    enumContractType.CLASSIC_MINT,
    signer
  );
  if (!cloneFactory) {
    return {
      success: false,
      response: "Clone factory not found",
    };
  }

  const clone = cloneFactory.attach(cloneAddress);

  // initialize clone
  clone.initialize(payload.name, payload.symbol, payload.saleConfig);

  return clone;
}

export async function getCloneContracts() {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);

  const signer = provider.getSigner();

  const registry = getContractFactory("Registry", signer);
  if (!registry) {
    return {
      success: false,
      response: "Registry not found",
    };
  }

  const attachedRegistry = registry.attach(
    "0xfED68eA5bD49241fC495e9DBD127FC7612EAc26e"
  );

  const clones = await attachedRegistry.getAll(accounts[0]);

  const contractDetails: any[] = [];

  for (let index = 0; index < clones.length; index++) {
    const clone = clones[index];
    const contractFactory = getContractFactory(
      enumContractType.CLASSIC_MINT,
      signer
    );
    if (!contractFactory) {
      return {
        success: false,
        response: "Contract factory not found",
      };
    }
    const cloneFactory = contractFactory.attach(clone);

    const name = await cloneFactory.name();
    const symbol = await cloneFactory.symbol();

    contractDetails.push({ name, symbol, address: clone });
  }

  return { success: true, response: contractDetails };
}

function getContractFactory(contractType: string, signer: any) {
  switch (contractType) {
    case enumContractType.CLASSIC_MINT: {
      const classicFactory = new ContractFactory(
        CLASSIC_MINT_JSON.abi,
        CLASSIC_MINT_JSON.bytecode,
        signer
      );

      return classicFactory;
    }
    case enumContractType.CLASSIC_MINT_WITH_WL: {
      const classicFactory = new ContractFactory(
        CLASSIC_MINT_JSON.abi,
        CLASSIC_MINT_JSON.bytecode,
        signer
      );

      return classicFactory;
    }
    case enumContractType.DUTCH_AUCTION: {
      const classicFactory = new ContractFactory(
        CLASSIC_MINT_JSON.abi,
        CLASSIC_MINT_JSON.bytecode,
        signer
      );

      return classicFactory;
    }
    case enumContractType.DUTCH_AUCTION_WITH_WL: {
      const classicFactory = new ContractFactory(
        CLASSIC_MINT_JSON.abi,
        CLASSIC_MINT_JSON.bytecode,
        signer
      );

      return classicFactory;
    }
    case enumContractType.FAIR_DUTCH_AUCTION: {
      const classicFactory = new ContractFactory(
        CLASSIC_MINT_JSON.abi,
        CLASSIC_MINT_JSON.bytecode,
        signer
      );

      return classicFactory;
    }
    case enumContractType.FAIR_DUTCH_AUCTION_WITH_WL: {
      const classicFactory = new ContractFactory(
        CLASSIC_MINT_JSON.abi,
        CLASSIC_MINT_JSON.bytecode,
        signer
      );

      return classicFactory;
    }
    case enumContractType.PURE_WHITELIST: {
      const classicFactory = new ContractFactory(
        CLASSIC_MINT_JSON.abi,
        CLASSIC_MINT_JSON.bytecode,
        signer
      );

      return classicFactory;
    }
    case "Factory": {
      const factory = new ContractFactory(
        FACTORY_JSON.abi,
        FACTORY_JSON.bytecode,
        signer
      );

      return factory;
    }
    case "Registry": {
      const factory = new ContractFactory(
        REGISTRY_JSON.abi,
        REGISTRY_JSON.bytecode,
        signer
      );

      return factory;
    }

    default:
      return;
  }
}

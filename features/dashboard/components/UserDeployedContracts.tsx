import { ContractFactory, ethers } from "ethers";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import classicmint from "../../../src/data/classicmint.json";
import factoryData from "../../../src/data/contracts/MiNFTFactory/MiNFTFactory.json";
import registryData from "../../../src/data/contracts/MiNFTRegistry/MiNFTRegistry.json";
export default function DeployedContracts() {
  const dispatch = useDispatch();

  const [clones, setClones] = useState([]);
  const [isDeployingContract, setIsDeployingContract] = useState(false);

  async function deployContract(payload: any) {
    //
    setIsDeployingContract(true);

    const {
      registryName,
      registryAddress,
      factoryName,
      factoryAddress,
      contractName,
    } = payload;

    console.log(payload);

    if (window) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const balance = await provider.getBalance(accounts[0]);

      console.log({ accounts, balance });

      const signer = provider.getSigner();
      console.log("Account:", await signer);

      //Get signers
      // const jsonRpcProvider = new ethers.providers.JsonRpcProvider(
      //   `https://rinkeby.infura.io/v3/956539460d854c818fbe498c08afa3de`,
      //   ethers.providers.getNetwork(4)
      // );
      // const jsonRpcSigner = jsonRpcProvider.getSigner(accounts[0]);
      // console.log(jsonRpcSigner);

      //Factories

      const factory = new ContractFactory(
        factoryData.abi,
        factoryData.bytecode,
        signer
      );

      const classicFactory = new ContractFactory(
        classicmint.abi,
        classicmint.bytecode,
        signer
      );

      const attachedFactory = factory.attach(
        "0xEd9E9666F66e762B9A685193CACAE56FeF0cDd03"
      );
      const attachedClassicFactory = classicFactory.attach(
        "0x0342d3fc7Ca13f25121Ad3f26ecc745eDC121f50"
      );

      console.log({ attachedFactory, attachedClassicFactory });

      const contractInfo = {
        name: "Nozomix",
        symbol: "NZMX",
        saleConfig: [10, 4, 3, 1, 1, 0, 0],
      };

      const result = await deploy(
        signer,
        attachedFactory,
        attachedClassicFactory,
        contractInfo
      );

      console.log({ result });

      setIsDeployingContract(false);
    }
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

    console.log({ contractType });
    const resolvedAddress = await factory.registry();
    console.log("Registry address", resolvedAddress);

    // get clone address
    const getClone = await (
      await factory.deployProxy(contractType, "0x")
    ).wait();

    const cloneAddress = getClone.events[0].args.proxy;
    console.log({ cloneAddress });
    const cloneFactory = new ContractFactory(
      classicmint.abi,
      classicmint.bytecode,
      signer
    );

    const clone = cloneFactory.attach(cloneAddress);

    // initialize clone
    clone.initialize(payload.name, payload.symbol, payload.saleConfig);

    return clone;
  }

  async function getCloneContracts() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    const registry = new ContractFactory(
      registryData.abi,
      registryData.bytecode,
      signer
    );

    const attachedRegistry = registry.attach(
      "0xfED68eA5bD49241fC495e9DBD127FC7612EAc26e"
    );

    const clones = await attachedRegistry.getAll(accounts[0]);

    const contractDetails = [];

    setClones(clones);

    console.log(clones);
  }

  useEffect(() => {
    getCloneContracts();
  }, []);

  return (
    <div className="mt-10 w-full ">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="text-2xl">Deployed Contracts</div>
          <div className="text-base text-gray-500">
            The list of contract instances that you have deployed with minft
            across all networks.
          </div>
        </div>
        {/* {isDeployingContract ? (
          <PageLoader />
        ) : (
          <div
            onClick={() => {
              // dispatch(setSelectedSidebar("contract-maker"));

              if (isDeployingContract) return;

              deployContract({
                registryName: "MiNFTRegistry",
                registryAddress: "0x2bb270545daad64D3eDCd2fe282bA19E8027e611",
                factoryName: "MiNFTFactory",
                factoryAddress: "0xcea46F8214888F82F5235aDa71A912d118AbC417",
                contractName: "ClassicMint",
              });
            }}
            className="gradient-button"
          >
            Add new contract
          </div>
        )} */}
      </div>

      <div className="relative mt-10 overflow-x-auto sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Contract Type
              </th>
              <th scope="col" className="py-3 px-6">
                Network
              </th>
              <th scope="col" className="py-3 px-6">
                Contract Address
              </th>
              <th scope="col" className="py-3 px-6">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {clones.map((clone, index) => (
              <tr
                key={index}
                className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
                >
                  Nozomix
                </th>
                <td className="py-4 px-6">Classic Mint</td>
                <td className="py-4 px-6">Rinkeby</td>
                <td className="py-4 px-6">{clone}</td>
                <td className="py-4 px-6 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

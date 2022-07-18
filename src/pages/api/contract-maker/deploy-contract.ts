/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from "next";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ethers } = require("ethers");
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == "POST") {
      const { account } = req.body;

      if (!account)
        return res
          .status(403)
          .send(responder(false, "Authentication required"));

      const result = await deployContract(account);

      return res.send(result);
    }
    return res.status(404).json({ success: false, message: "Not Found" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error, message: "Unable to process request" });
  }
};

export default handler;

async function deployContract(payload: any) {
  //

  const {
    registryName,
    registryAddress,
    factoryName,
    factoryAddress,
    contractName,
  } = payload;

  const registry = await (
    await ethers.getContractFactory(registryName)
  ).attach(registryAddress);

  const factory = await (
    await ethers.getContractFactory(factoryName)
  ).attach(factoryAddress);

  const contract = await (
    await ethers.getContractFactory(contractName)
  ).attach("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266");

  const data = contract.interface.encodeFunctionData("initialize", []);

  // deploy clone
  const cloneAddress = factory.deployProxy(contractName, data);

  // get clone contract
  const clone = await (
    await ethers.getContractFactory(contractName)
  ).attach(cloneAddress);

  // initialize clone
  // clone.initialize(args);
}

function responder(success: boolean, message: any) {
  return {
    success,
    message,
  };
}

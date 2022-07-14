/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from "next";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ethers } = require("hardhat");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == "GET") {
      const { account } = req.body;

      if (!account)
        return res
          .status(403)
          .send(responder(false, "Authentication required"));

      const result = await getAllContracts(account);

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

async function getAllContracts(payload: any) {
  //

  const { registryName, registryAddress, account } = payload;

  console.log("Getting contracts for", account);

  const registry = await (
    await ethers.getContractFactory(registryName)
  ).attach(registryAddress);

  const clones = registry.getAll(account);
  return clones;
}

function responder(success: boolean, message: any) {
  return {
    success,
    message,
  };
}

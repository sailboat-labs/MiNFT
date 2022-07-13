/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from "next";

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
  console.log(payload);
}

function responder(success: boolean, message: any) {
  return {
    success,
    message,
  };
}

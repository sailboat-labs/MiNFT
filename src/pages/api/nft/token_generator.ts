/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from "next";

// import { startCreating } from "../../../../art-engine/src/main";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == "POST") {
      //
      // startCreating();
      return res.send("generating");
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

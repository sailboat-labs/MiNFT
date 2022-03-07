/* eslint-disable no-console */

import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("getting nfts");

  try {
    if (req.method != "GET") return;
    const config: any = {
      method: "get",
      mode: "no-cors",

      url: "https://minft.eth.xyz/nfts/0xC3f1c82bF8c048e42a743E8C328f2705d2aa5151",
    };

    await axios(config)
      .then(function (response) {
        res.status(200).json(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    return res.status(200).json({ response: "data" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error });
  }
};

export default handler;

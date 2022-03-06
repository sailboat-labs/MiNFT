/* eslint-disable no-console */

import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('getting assets');
  
  try {

    if(req.method != 'GET') return;
    const config: any = {
      method: "get",
      mode: "no-cors",

      url: "https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=2&asset_contract_address=0xCcc441ac31f02cD96C153DB6fd5Fe0a2F4e6A68d",
      headers: {
        "x-apikey": "0049b5bd4c93415587b4562d52779776",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    return res.status(200).json({ success: true,data:res.json });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error });
  }
};

export default handler;

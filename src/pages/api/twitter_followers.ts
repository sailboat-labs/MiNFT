
/* eslint-disable no-console */

import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  try {
    if (req.method != "GET") return;


    const { username } = req.query;

    const config: any = {
      method: "get",
      mode: "no-cors",

      url: `https://api.twitter.com/1.1/users/show.json?screen_name=${username}`,
      headers: {
        Authorization:
          "Bearer AAAAAAAAAAAAAAAAAAAAAPThaAEAAAAATjv0nwJXgRyurkawhIzvAqpYWhc%3DhNhnzulTskYosHZHt3a5OBuQsCoOoIOFZZyVmFwegoHCE9ikiu",
      },
    };

    await axios(config)
      .then(function (response) {
       return res.status(200).send(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    return res.status(200).send({ response: "data" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, error });
  }
};

export default handler;


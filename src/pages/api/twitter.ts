/* eslint-disable no-console */

import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import qs from "qs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query;
  console.log(code);

  if (!code) return res.status(403).send("No authorization code provided");

  const data = qs.stringify({
    code,
    grant_type: "authorization_code",
    client_id: "N1U2VVRxa1ZLS1gwbjJWd25Gd186MTpjaQ",
    redirect_uri: "https://minft.me/redirect/twitter",
    code_verifier: "challengeminft",
  });
  const config: any = {
    method: "post",
    url: "https://api.twitter.com/2/oauth2/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  try {
    const { data } = await axios(config);
    res.send(data);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

export default handler;

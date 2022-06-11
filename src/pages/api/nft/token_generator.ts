/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from "next";

import { NFTLayer } from "@/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == "POST") {
      //
      // startCreating();

      const layers = req.body.layers as NFTLayer[];
      if (!layers)
        return res.status(403).send({ message: "No layers provided" });

      const _layers = layers?.map((layer) => ({
        name: layer.name,
        blendmode: "source-over",
        opacity: 1,
        bypassDNA: false,
        elements: layer.elements.map((element) => ({
          sublayer: false,
          weight: 1,
          blendmode: "source-over",
          opacity: 1,
          name: layer.name,
          filename: element.split("/")[0],
          path: element,
          zindex: "",
          trait: layer.name,
          traitValue: layer.name,
        })),
      }));

      console.log(_layers);

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

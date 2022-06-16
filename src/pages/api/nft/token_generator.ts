/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from "next";

import { startCreating } from "../../../../art-engine/src/main";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == "POST") {
      const { layers } = req.body;
      if (layers == null || layers == undefined)
        return res.status(403).send("No layers given");
      console.log(JSON.stringify(layers));

      // const _layers = layers?.map((layer, layerIndex) => ({
      //   id: layerIndex,
      //   name: layer.name,
      //   blendmode: "source-over",
      //   opacity: 1,
      //   bypassDNA: false,
      //   elements: layer.elements.map((element, index) => ({
      //     id: index,
      //     sublayer: false,
      //     weight: index + 1,
      //     blendmode: "source-over",
      //     opacity: 1,
      //     name: layer.name,
      //     filename: `${layer.name}#${padLeft(index + 1)}.png`,
      //     path: element,
      //     zindex: "",
      //     trait: layer.name,
      //     traitValue: layer.name,
      //   })),
      // }));

      // listAllFilesAndDirs(dirHandle);
      return;

      startCreating(layers);

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

function padLeft(n: number) {
  return (n < 10 ? "00" : n < 100 ? "0" : "") + n;
}

export default handler;

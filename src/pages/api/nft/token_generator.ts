/* eslint-disable no-console */
import formidable from "formidable";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

import { startCreating } from "../../../../art-engine/src/main";

import { NFTLayer } from "@/types";

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: "./public/uploads",
//     filename: (
//       req: any,
//       file: { originalname: any },
//       cb: (arg0: null, arg1: any) => any
//     ) => cb(null, file.originalname),
//   }),
// });

// const apiRoute = nextConnect({
//   onError(error, req: NextApiRequest, res: NextApiResponse) {
//     res
//       .status(501)
//       .json({ error: `Sorry something Happened! ${error.message}` });
//   },
//   onNoMatch(req, res) {
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   },
// });

// apiRoute.use(upload.array("theFiles"));

// apiRoute.post((req, res) => {
//   res.status(200).json({ data: "success" });
// });

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const saveFile = async (file: any) => {
  return console.log(file);

  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(`./public/art-engine/images/${file.originalFilename}`, data);
  await fs.unlinkSync(file.path);
  return;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == "POST") {
      const form = new formidable.IncomingForm();
      form.parse(
        req,
        async function (err: any, fields: any, files: { theFiles: any }) {
          console.log({ files });

          await saveFile(files.theFiles);
          return res.status(201).send("");
        }
      );
      //
      return;

      const layers = req.body.layers as NFTLayer[];
      if (!layers)
        return res.status(403).send({ message: "No layers provided" });

      const _layers = layers?.map((layer, layerIndex) => ({
        id: layerIndex,
        name: layer.name,
        blendmode: "source-over",
        opacity: 1,
        bypassDNA: false,
        elements: layer.elements.map((element, index) => ({
          id: index,
          sublayer: false,
          weight: index + 1,
          blendmode: "source-over",
          opacity: 1,
          name: layer.name,
          filename: `${layer.name}#${padLeft(index + 1)}.png`,
          path: element,
          zindex: "",
          trait: layer.name,
          traitValue: layer.name,
        })),
      }));

      startCreating(_layers);

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

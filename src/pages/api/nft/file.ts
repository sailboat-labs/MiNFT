import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";

// import fs from "fs";
// import { URL } from "url";

export const config = {
  api: {
    bodyParser: false,
  },
};

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err: any, fields: any, files: { file: any }) {
    console.log({ files });

    // await saveFile(files.file);
    return res.status(201).send("");
  });
};

// const saveFile = async (file: { path: string | number | Buffer | URL; name: any; }) => {
//   const data = fs.readFileSync(file.path);
//   fs.writeFileSync(`./public/${file.name}`, data);
//   await fs.unlinkSync(file.path);
//   return;
// };

export default (req: NextApiRequest, res: NextApiResponse<any>) => {
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? console.log("GET")
    : res.status(404).send("");
};

import fs from "fs";
import multer from "multer";
import nc from "next-connect";

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    const baseDir = `./public/art-engine/images/`;

    const accountDir = baseDir.concat(req.query.account);
    if (!fs.existsSync(accountDir)) {
      fs.mkdirSync(accountDir);
    }

    const layerName = file.originalname.split("/")[1];
    const fileUploadDir = accountDir.concat("/").concat(layerName);
    if (!fs.existsSync(fileUploadDir)) {
      fs.mkdirSync(fileUploadDir);
    }

    cb(null, fileUploadDir);
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname.split("/")[2]);
    // cb(
    //   null,
    //   `${file.originalname.split("/")[1]}#${padLeft(
    //     file.originalname.split("/")[2].split(".")[0]
    //   )}.png`
    // );
  },
});

function padLeft(n: number) {
  return (n < 10 ? "00" : n < 100 ? "0" : "") + n;
}
const uploader = multer({ storage, preservePath: true });

const handler = nc<any, any>();
handler.use(uploader.array("files"));

handler.post((req, res) => {
  res.status(200).json({
    files: req.files,
    data: req.body,
  });
});

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};

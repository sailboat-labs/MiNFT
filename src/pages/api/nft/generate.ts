/* eslint-disable no-console */
import { collection, getFirestore } from "firebase/firestore";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

import { firebaseApp } from "@/lib/firebase";

import { IConfig } from "@/types";

const isLocal = true;
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);

const firestore = getFirestore(firebaseApp);
const collectionsCollection = collection(firestore, "collections");

const buildDir = path.join(basePath, "/build");
const layersDir = path.join(basePath, "/layers");

const extraAttributes = () => [
  // Optionally, if you need to overwrite one of your layers attributes.
  // You can include the same name as the layer, here, and it will overwrite
  //
  // {
  // trait_type: "Bottom lid",
  //   value: ` Bottom lid #${Math.random() * 100}`,
  // },
  // {
  //   display_type: "boost_number",
  //   trait_type: "Aqua Power",
  //   value: Math.random() * 100,
  // },
  // {
  //   display_type: "boost_number",
  //   trait_type: "Health",
  //   value: Math.random() * 100,
  // },
  // {
  //   display_type: "boost_number",
  //   trait_type: "Mana",
  //   value: Math.floor(Math.random() * 100),
  // },
];

//settings
const debugLogs = false;
export const configuration: IConfig = {
  description: "This is the description",
  baseUri: "ipfs://NewUriToReplace",
  startIndex: 0,
  format: {
    width: 512,
    height: 512,
    smoothing: true,
    weight: 1,
  },
  background: {
    generate: true,
    brightness: "100%",
  },
  layerConfigurations: [
    {
      growEditionSizeTo: 4,
      namePrefix: "NZMX Club", // Use to add a name to Metadata `name:`
      layersOrder: [
        { name: "Background" },
        { name: "Skin" },
        { name: "Clothes" },
        { name: "Eyes" },
        // { name: "Head Accessory" },
        { name: "Bling" },
      ],
    },
  ],
  extraAttributes: [],
  shuffleLayerConfigurations: true,
  emptyLayerName: "NONE",
  forcedCombinations: {},
  hashImages: true,
  preview: {
    thumbPerRow: 8,
    thumbWidth: 1000,
    imageRatio: 1,
    imageName: "preview.png",
  },
  preview_gif: {
    numberOfImages: 64,
    order: "ASC", // ASC, DESC, MIXED
    repeat: 1,
    quality: 200,
    delay: 500,
    imageName: "preview.gif",
  },
  rarityDelimiter: "#",
  useRootTraitType: true,
  outputJPEG: false,
  incompatible: {},
  uniqueDnaTorrance: 10000,
  traitValueOverrides: {},
};

const metadataList = [];
const attributesList = [];

const DNA_DELIMITER = "*";

const zflag = /(z-?\d*,)/;

export const buildSetup = ({ address, collection }: any) => {
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
  }
  if (!fs.existsSync(`${buildDir}/json`)) {
    fs.mkdirSync(path.join(buildDir, "/json"));
  }
  if (!fs.existsSync(`${buildDir}/images`)) {
    fs.mkdirSync(path.join(buildDir, "/images"));
  }

  if (!fs.existsSync(`${buildDir}/json/${address}`)) {
    fs.mkdirSync(path.join(buildDir, `/json/${address}`));
  }
  if (!fs.existsSync(`${buildDir}/images/${address}`)) {
    fs.mkdirSync(path.join(buildDir, `/images/${address}`));
  }

  if (fs.existsSync(`${buildDir}/json/${address}/${collection}`)) {
    fs.rmdirSync(`${buildDir}/json/${address}/${collection}`, {
      recursive: true,
    });
  }
  fs.mkdirSync(path.join(`${buildDir}/json/${address}`, `/${collection}`));

  if (fs.existsSync(`${buildDir}/images/${address}/${collection}`)) {
    fs.rmdirSync(`${buildDir}/images/${address}/${collection}`, {
      recursive: true,
    });
  }
  fs.mkdirSync(path.join(`${buildDir}/images/${address}`, `/${collection}`));
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == "POST") {
      //
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error, message: "Unable to process request" });
  }
};

export default handler;

import axios from "axios";

import { ILayer } from "./../../../src/interfaces/get-started";
import { IProject } from "./../../../src/interfaces/index";
export default async function addLayersToFirebase(
  layers: ILayer[],
  project: IProject
) {
  //Cache layers to firebase
  const elements = layers.map((item) => item.elements);

  console.log({ layers, elements });
  // return;

  layers.forEach((layer) => {
    axios.post("/api/nft/layer", {
      layer,
      project,
      account: project.owner,
    });
  });
}

function uploadElements() {
  const downloadURLs: string[] = [];

  return downloadURLs;
}

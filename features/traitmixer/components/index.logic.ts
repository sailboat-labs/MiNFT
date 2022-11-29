import axios from "axios";

import { convertImageToBase64 } from "@/utils/convert-image-to-base64";

import { ILayer, IProject } from "./../../../src/interfaces/index";
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

export async function prepareLayers(layers: ILayer[]) {
  for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) {
    const layer = layers[layerIndex];

    for (
      let elementIndex = 0;
      elementIndex < layer.elements.length;
      elementIndex++
    ) {
      const element = layer.elements[elementIndex];
      const dataURL = await convertImageToBase64(element.path);
      console.log("layer:", layerIndex, "element:", elementIndex);

      try {
        layers[layerIndex].elements[elementIndex].path = dataURL as string;
      } catch (error) {
        console.log(error);
      }
    }
  }

  return layers;
}

import { ILayer } from "@/interfaces";
export function getMaximumSupply(layers: ILayer[]) {
  let maxSupply = 1;
  for (let i = 0; i < layers.length; i++) {
    if (layers[i].elements?.length > 0) {
      maxSupply *= layers[i].elements.length;
    }
  }
  return maxSupply;
}

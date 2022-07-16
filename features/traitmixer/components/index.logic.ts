import axios from "axios";
import { ethers } from "ethers";

import { ILayer } from "./../../../src/interfaces/get-started";
import { IProject } from "./../../../src/interfaces/index";
export default async function addLayersToFirebase(
  layers: ILayer[],
  project: IProject
) {
  //Cache layers to firebase

  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);

  layers.forEach((layer) => {
    axios.post("/api/nft/layer", {
      layer,
      project,
      account: accounts[0],
    });
  });
}

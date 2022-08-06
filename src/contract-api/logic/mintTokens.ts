import { ethers } from "ethers";
import { httpsCallable } from "firebase/functions";
import keccak256 from "keccak256";
import { MerkleTree } from "merkletreejs";
import toast from "react-hot-toast";

import { functions } from "@/lib/firebase";

// @dev use this mint function when tokens are to be minted publicly
export async function mintTokens(
  contract: ethers.Contract | undefined,
  quantity = 1
) {
  const contractType = ethers.utils.parseBytes32String(
    await contract?.contractType()
  );

  const classicTemplates = ["ClassicMint", "DutchAuction", "FairDutchAuction"];
  const whitelistTemplates = [
    "WLClassicMint",
    "WLDutchAuction",
    "WLFairDutchAuction",
  ];

  try {
    toast.dismiss();
    toast.loading("Initializing Mint");
    let mint: any;

    const mintPrice = await getMintPrice(contract);

    try {
      if (classicTemplates.includes(contractType)) {
        mint = await contract?.mint(quantity, {
          value: mintPrice.mul(`${quantity}`),
        });
      }

      if (whitelistTemplates.includes(contractType)) {
        mint = await contract?.publicMint(quantity, {
          value: mintPrice.mul(`${quantity}`),
        });
      }
    } catch (error: any) {
      if (!error) return console.log("An Error Occurred");

      toast.dismiss();
      toast.error(error!.data.message);
    }

    if (!mint) return;

    toast.dismiss();
    toast.loading(
      `Minting... Check your transaction on etherscan: ${mint.hash}`
    );

    const tx = await mint.wait();
    return tx;
  } catch (error: any) {
    toast.dismiss();
    toast.error(error?.message);
  }
}

// @dev use this mint function when tokens are to be minted privately
export async function premintTokens(
  contract: ethers.Contract | undefined,
  quantity = 1
) {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  const contractType = ethers.utils.parseBytes32String(
    await contract?.contractType()
  );
  const classicTemplates = ["ClassicMint", "DutchAuction", "FairDutchAuction"];

  if (classicTemplates.includes(contractType)) return;

  const proof = await getMerkleProof("indians-nft", signerAddress);

  try {
    toast.dismiss();
    toast.loading("Initializing Mint");
    let mint: any;

    try {
      if (contractType === "PureWhitelist") {
        const mintPrice = await contract?.mintPrice();
        mint = await contract?.mint(proof, quantity, {
          value: mintPrice.mul(`${quantity}`),
        });
      } else {
        const mintPrice = await contract?.WL_MintPrice();
        mint = await contract?.privateMint(proof, quantity, {
          value: mintPrice.mul(`${quantity}`),
        });
      }
    } catch (error: any) {
      if (!error) return console.log("An Error Occurred");

      toast.dismiss();
      toast.error(error!.data.message);
    }

    if (!mint) return;

    toast.dismiss();
    toast.loading(
      `Minting... Check your transaction on etherscan: ${mint.hash}`
    );

    const tx = await mint.wait();
    return tx;
  } catch (error: any) {
    toast.dismiss();
    toast.error(error?.message);
  }
}

async function getMintPrice(contract: ethers.Contract | undefined) {
  const contractType = ethers.utils.parseBytes32String(
    await contract?.contractType()
  );
  const auctionTemplates = [
    "DutchAuction",
    "FairDutchAuction",
    "WLDutchAuction",
    "WLFairDutchAuction",
  ];
  let mintPrice;

  if (auctionTemplates.includes(contractType)) {
    mintPrice = await contract?.currentPrice();
  } else if (contractType === "WLClassicMint") {
    mintPrice = await contract?.CM_MintPrice();
  } else {
    mintPrice = await contract?.mintPrice();
  }

  return mintPrice;
}

async function getMerkleProof(projectSlug: string, address: string) {
  let whitelist: string[] = [];

  const getWhitelists = httpsCallable(functions, "getWhitelists");

  const { data }: any = await getWhitelists({
    project_slug: projectSlug,

    // "indians-nft",
  });

  if (data.success) {
    whitelist = data.data.map((item: any) => item.wallet);

    const leafNodes = whitelist.map((addr) => keccak256(addr));

    const merkleeTree = new MerkleTree(leafNodes, keccak256, {
      sortPairs: true,
    });

    const leaf = keccak256(address);
    const proof = merkleeTree.getHexProof(leaf);

    return proof;
  } else {
    false;
  }
}

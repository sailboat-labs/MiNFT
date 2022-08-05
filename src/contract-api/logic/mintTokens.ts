import { ethers } from "ethers";
import toast from "react-hot-toast";

export async function mintTokens(
  contract: ethers.Contract | undefined,
  quantity = 1
) {
  try {
    toast.dismiss();
    toast.loading("Initializing Mint");
    let mint: any;

    const mintPrice = await getMintPrice(contract);

    try {
      mint = await contract?.mint(quantity, {
        value: mintPrice.mul(`${quantity}`),
      });
    } catch (error: any) {
      if (!error) return console.log("An Error Occurred");

      toast.dismiss();
      toast.error(error!.message);
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
  let mintPrice;
  if (
    [
      "DutchAuction",
      "FairDutchAuction",
      "WLDutchAuction",
      "WLFairDutchAuction",
    ].includes(contractType)
  ) {
    mintPrice = await contract?.currentPrice();
  } else {
    mintPrice = await contract?.mintPrice();
  }

  return mintPrice;
}

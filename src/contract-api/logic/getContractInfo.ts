import { ethers } from "ethers";

export async function getContractInfo(contract: ethers.Contract | undefined) {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  const contractType = ethers.utils.parseBytes32String(
    await contract?.contractType()
  );
  const name = await contract?.name();
  const totalQuantity = parseInt((await contract?.totalQuantity())?._hex);
  const totalSupply = parseInt((await contract?.totalSupply())?._hex);

  let contractInfo = {};
  if (
    [
      "ClassicMint",
      "PureWhitelist",
      "DutchAuction",
      "FairDutchAuction",
    ].includes(contractType)
  ) {
    return await classicSaleInfo();
  }

  if (
    ["WLClassicMint", "WLDutchAuction", "WLFairDutchAuction"].includes(
      contractType
    )
  ) {
    return await whitelistIncludedSaleInfo();
  }

  async function classicSaleInfo() {
    let mintPrice;
    let startingPrice;
    let endingPrice;
    let currentPrice;

    // const totalSupply = parseInt((await contract?.totalSupply())?._hex);
    const maxMintPerWallet = parseInt(
      (await contract?.maxMintPerWallet())?._hex
    );
    const tokensMinted = parseInt(
      (await contract?.tokensMinted(signerAddress))?._hex
    );
    const startingTimestamp = parseInt(
      (await contract?.startingTimestamp())?._hex
    );
    const endingTimestamp = parseInt((await contract?.endingTimestamp())?._hex);
    const hasMintStarted = await contract?.hasMintStarted();

    if (["DutchAuction", "FairDutchAuction"].includes(contractType)) {
      startingPrice = parseInt((await contract?.startingPrice())._hex);
      endingPrice = parseInt((await contract?.startingPrice())._hex);
      currentPrice = parseInt((await contract?.currentPrice())._hex);
    } else {
      mintPrice = parseInt((await contract?.mintPrice())?._hex);
    }

    contractInfo = {
      contractType,
      name,
      totalQuantity,
      totalSupply,
      maxMintPerWallet,
      mintPrice,
      startingPrice,
      endingPrice,
      currentPrice,
      tokensMinted,
      startingTimestamp,
      endingTimestamp,
      hasMintStarted,
    };
    console.log("my contract info", contractInfo);
    return { success: true, response: contractInfo };
  }

  async function whitelistSaleInfo() {
    let whitelistSale = {};
    const whitelistQuantity = parseInt((await contract?.WL_Quantity())._hex);
    const whitelistTotalSupply = parseInt(
      (await contract?.WL_TotalSupply())._hex
    );
    const whitelistMintPrice = parseInt((await contract?.WL_MintPrice())._hex);
    const whitelistMaxMintPerWallet = parseInt(
      (await contract?.WL_MaxMintPerWallet())._hex
    );
    const whitelistStartingTimestamp = parseInt(
      (await contract?.WL_StartingTimestamp())._hex
    );
    const whitelistEndingTimestamp = parseInt(
      (await contract?.WL_EndingTimestamp())._hex
    );

    whitelistSale = {
      quantity: whitelistQuantity,
      totalSupply: whitelistTotalSupply,
      maxMintPerWallet: whitelistMaxMintPerWallet,
      mintPrice: whitelistMintPrice,
      startingTimestamp: whitelistStartingTimestamp,
      endingTimestamp: whitelistEndingTimestamp,
    };

    return { success: true, response: whitelistSale };
  }

  async function publicSaleInfo() {
    let publicSale = {};
    let quantity;
    let totalSupply;
    let maxMintPerWallet;
    let mintPrice;
    let startingPrice;
    let endingPrice;
    let currentPrice;
    let startingTimestamp;
    let endingTimestamp;

    if (contractType === "WLClassicMint") {
      quantity = parseInt((await contract?.CM_Quantity())._hex);
      totalSupply = parseInt((await contract?.CM_TotalSupply())._hex);
      maxMintPerWallet = parseInt((await contract?.CM_MaxMintPerWallet())._hex);
      mintPrice = parseInt((await contract?.CM_MintPrice())._hex);
      startingTimestamp = parseInt(
        (await contract?.CM_StartingTimestamp())._hex
      );
      endingTimestamp = parseInt((await contract?.CM_EndingTimestamp())._hex);

      publicSale = {
        quantity,
        totalSupply,
        maxMintPerWallet,
        mintPrice,
        startingTimestamp,
        endingTimestamp,
      };
    }

    if (contractType === "WLDutchAuction") {
      quantity = parseInt((await contract?.DA_Quantity())._hex);
      totalSupply = parseInt((await contract?.DA_TotalSupply())._hex);
      maxMintPerWallet = parseInt((await contract?.DA_MaxMintPerWallet())._hex);
      startingPrice = parseInt((await contract?.DA_StartingPrice())._hex);
      endingPrice = parseInt((await contract?.DA_EndingPrice())._hex);
      currentPrice = parseInt((await contract?.currentPrice())._hex);
      startingTimestamp = parseInt(
        (await contract?.DA_StartingTimestamp())._hex
      );
      endingTimestamp = parseInt((await contract?.DA_EndingTimestamp())._hex);

      publicSale = {
        quantity,
        totalSupply,
        maxMintPerWallet,
        startingPrice,
        endingPrice,
        currentPrice,
        startingTimestamp,
        endingTimestamp,
      };
    }

    if (contractType === "WLFairDutchAuction") {
      quantity = parseInt((await contract?.FDA_Quantity())._hex);
      totalSupply = parseInt((await contract?.FDA_TotalSupply())._hex);
      maxMintPerWallet = parseInt(
        (await contract?.FDA_MaxMintPerWallet())._hex
      );
      startingPrice = parseInt((await contract?.FDA_StartingPrice())._hex);
      endingPrice = parseInt((await contract?.FDA_EndingPrice())._hex);
      currentPrice = parseInt((await contract?.currentPrice())._hex);
      startingTimestamp = parseInt(
        (await contract?.FDA_StartingTimestamp())._hex
      );
      endingTimestamp = parseInt((await contract?.FDA_EndingTimestamp())._hex);

      publicSale = {
        quantity,
        totalSupply,
        maxMintPerWallet,
        startingPrice,
        endingPrice,
        currentPrice,
        startingTimestamp,
        endingTimestamp,
      };
    }

    return { success: true, response: publicSale };
  }

  async function whitelistIncludedSaleInfo() {
    const whitelistSale = (await whitelistSaleInfo()).response;
    const publicSale = (await publicSaleInfo()).response;

    contractInfo = {
      contractType,
      name,
      totalQuantity,
      totalSupply,
      whitelistSale,
      publicSale,
    };
    console.log("my contract info", contractInfo);
    return { success: true, response: contractInfo };
  }
}

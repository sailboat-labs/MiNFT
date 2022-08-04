import { ethers } from "ethers";

export async function getContractInfo(contract: ethers.Contract | undefined) {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  const contractType = ethers.utils.parseBytes32String(
    await contract?.contractType()
  );
  const name = await contract?.name();

  let contractInfo = {};

  if (
    [
      "ClassicMint",
      "PureWhitelist",
      "DutchAuction",
      "FairDutchAuction",
    ].includes(contractType)
  ) {
    const _totalQuantity = await contract?.totalQuantity();
    const _totalSupply = await contract?.totalSupply();
    const _maxMintPerWallet = await contract?.maxMintPerWallet();
    const _tokensMinted = await contract?.tokensMinted(signerAddress);
    const _startingTimestamp = await contract?.startingTimestamp();
    const _endingTimestamp = await contract?.endingTimestamp();
    const hasMintStarted = await contract?.hasMintStarted();

    // if (["DutchAuction", "FairDutchAuction"].includes(contractType)) {
    //   const startingPrice = parseInt((await contract?.startingPrice())._hex);
    //   const endingPrice = parseInt((await contract?.startingPrice())._hex);
    // } else {
    //   const _mintPrice = await contract?.mintPrice();
    //   const mintPrice = parseInt(_mintPrice?._hex);
    // }

    // parse to integer
    const totalQuantity = parseInt(_totalQuantity?._hex);
    const totalSupply = parseInt(_totalSupply?._hex);
    const maxMintPerWallet = parseInt(_maxMintPerWallet?._hex);
    const tokensMinted = parseInt(_tokensMinted?._hex);
    const startingTimestamp = parseInt(_startingTimestamp?._hex);
    const endingTimestamp = parseInt(_endingTimestamp?._hex);

    console.log({
      contractType,
      name,
      totalQuantity,
      totalSupply,
      maxMintPerWallet,
      hasMintStarted,
      startingTimestamp,
      endingTimestamp,
      // mintPrice,
    });

    contractInfo = {
      totalQuantity,
      totalSupply,
      maxMintPerWallet,
      tokensMinted,
    };

    return { success: true, response: contractInfo };
  }

  // if (
  //   ["WLClassicMint", "WLDutchAuction", "WLFairDutchAuction"].includes(
  //     contractType
  //   )
  // ) {
  //   const _totalQuantity = await contract?.totalQuantity();
  //   const _totalSupply = await contract?.totalSupply();
  //   const _maxMintPerWallet = await contract?.maxMintPerWallet();
  //   const _tokensMinted = await contract?.tokensMinted(signerAddress);
  //   const _startingTimestamp = await contract?.startingTimestamp();
  //   const _endingTimestamp = await contract?.endingTimestamp();
  //   const hasMintStarted = await contract?.hasMintStarted();

  //   cons

  //   contractInfo = {
  //     totalQuantity,
  //     totalSupply,
  //     maxMintPerWallet,
  //     tokensMinted,
  //   };

  //   return { success: true, response: contractInfo };
  // }
}

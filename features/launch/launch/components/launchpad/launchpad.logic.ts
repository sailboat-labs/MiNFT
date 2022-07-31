import { ethers } from "ethers";
import { getContractForMinting } from "features/minting-page/utils/get-contract-for-minting";

export async function prepareContract(contractAddress: string) {
  const _contract = await getContractForMinting(contractAddress);
  console.log({ _contract });

  if (!_contract) return;

  const name = await _contract.name();
  const totalQuantity = parseInt(await (await _contract.totalQuantity())._hex);
  const contractType = ethers.utils.parseBytes32String(
    await _contract.contractType()
  );
  const mintPrice = ethers.utils.formatEther(await _contract.mintPrice());
  const endingTimestamp = await (
    await _contract.endingTimestamp()
  )._hex.toString();
  const startingTimestamp = await _contract.startingTimestamp();
  const symbol = await _contract.symbol();
  const totalSupply = parseInt(await (await _contract.totalSupply())._hex);
  const maxMintPerWallet = parseInt(
    await (
      await _contract.maxMintPerWallet()
    )._hex
  );
  const maxMintPerTx = parseInt(await (await _contract.maxMintPerTx())._hex);
  const hasMintStarted = await _contract.hasMintStarted();

  console.log({
    name,
    totalQuantity,
    contractType,
    mintPrice,
    endingTimestamp,
    startingTimestamp,
    symbol,
    totalSupply,
    maxMintPerWallet,
    maxMintPerTx,
    hasMintStarted,
  });

  return {
    name,
    totalQuantity,
    contractType,
    mintPrice,
    endingTimestamp,
    startingTimestamp: new Date(startingTimestamp).toString().split("GMT")[0],
    symbol,
    totalSupply,
    maxMintPerWallet,
    maxMintPerTx,
    hasMintStarted,
  };
}

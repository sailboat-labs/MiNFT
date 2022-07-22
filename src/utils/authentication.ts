import Web3 from "web3";

export const changeNetwork = async (chainId: string | number) => {
  const web3 = new Web3();
  try {
    await (window as any).ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: web3.utils.toHex(chainId) }],
    });
  } catch (error) {
    console.log(error);
  }
};

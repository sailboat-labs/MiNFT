import { ethers } from "ethers";
import toast from "react-hot-toast";
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

export async function getAccountByProvider() {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();

  return signerAddress;
}

export function getActiveAccount() {
  let isAuthenticated = false;
  let account = null;

  isAuthenticated =
    window.localStorage.getItem("isAuthenticated") == "true" ? true : false;
  if (!isAuthenticated) return;

  account = window.localStorage.getItem("account");
  if (
    account == null ||
    account == undefined ||
    ethers.utils.isAddress(account) == false
  )
    return;

  return account;
}

export function logout() {
  window.localStorage.setItem("isAuthenticated", "false");
  window.localStorage.setItem("account", "");
}

export function setActiveAccount(account: string) {
  if (ethers.utils.isAddress(account) == false)
    return toast.error("Invalid address");
  window.localStorage.setItem("isAuthenticated", "true");
  window.localStorage.setItem("account", account);
}

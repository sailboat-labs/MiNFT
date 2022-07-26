import { ethers } from "ethers";
import {
  collection,
  collectionGroup,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import toast from "react-hot-toast";
import Web3 from "web3";

import { firestore } from "@/lib/firebase";

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

  return signerAddress?.toLowerCase();
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

export async function hasAccessToProject(slug: string, account: string) {
  //Check if account the owner of this project
  try {
    const dashboardCollection = collection(firestore, `Projects`);
    const _query = query(
      dashboardCollection,
      where("slug", "==", slug),
      where("owner", "==", account)
    );
    const exists = (await getDocs(_query)).docs.length > 0;

    if (exists) return true;

    //Check if you have been delegated to this project
    const delegateAccessCollection = collectionGroup(firestore, `Delegates`);

    const _delegatesQuery = query(
      delegateAccessCollection,

      where("delegate", "==", account),
      where("slug", "==", slug)
    );

    const delegationExists = (await getDocs(_delegatesQuery)).docs.length > 0;

    if (delegationExists) return true;
  } catch (error) {
    console.log(error);
  }

  return false;
}

export async function isProjectOwner(slug: string, account: string) {
  //Check if account the owner of this project

  const dashboardCollection = collection(firestore, `Projects`);
  const _query = query(
    dashboardCollection,
    where("slug", "==", slug),
    where("owner", "==", account)
  );
  const exists = (await getDocs(_query)).docs.length > 0;

  if (exists) return true;

  return false;
}

import axios from "axios";

export async function getUserDetails(walletId: string) {
  if (!walletId) return;
  try {
    const user = await axios.get(
      `https://us-central1-minft-production.cloudfunctions.net/GetUserData/user?walletId=${walletId
        .toString()
        .toLowerCase()}`
    );

    console.log("getting data", user.data);

    return user.data;
  } catch (error) {
    return;
  }
}

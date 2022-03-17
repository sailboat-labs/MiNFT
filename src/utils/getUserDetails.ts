import axios from "axios";

export async function getUserDetails(walletId: string) {
  if (!walletId) return;
  try {
    const user = await axios.get(
      `${
        process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_ENDPOINT
      }/GetUserData/user?walletId=${walletId.toString().toLowerCase()}`
    );

    console.log("getting data", user.data);

    return user.data;
  } catch (error) {
    return;
  }
}

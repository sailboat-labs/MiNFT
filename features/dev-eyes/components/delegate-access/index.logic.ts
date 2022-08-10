import axios from "axios";
import { ethers } from "ethers";
import toast from "react-hot-toast";

type payload = {
  address: string;
  account: string;
  slug: string;
  role?: string;
};

export async function delegateAccessToAddress({
  address,
  account,
  slug,
  role,
}: payload) {
  if (ethers.utils.isAddress(address) == false)
    return toast.error("Invalid address");

  const delegateResponse = await axios.post(
    "/api/delegate-access/delegate-access",
    {
      address,
      account,
      slug,
      role,
    }
  );

  return delegateResponse;
}

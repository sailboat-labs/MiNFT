import axios from "axios";

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

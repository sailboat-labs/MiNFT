import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

import useStorage from "@/hooks/storage";

import Button from "@/components/buttons/Button";

import { delegateAccessToAddress } from "./index.logic";

export default function DelegateAccess() {
  const delegatedAccessToList: string[] = [
    "0x8529d076CA796B00A75bBF758d05046BFB4DDaAB",
    "0x8529d076CA796B00A75bBF758d05046BFB4DDaAB",
    "0x8529d076CA796B00A75bBF758d05046BFB4DDaAB",
    "0x8529d076CA796B00A75bBF758d05046BFB4DDaAB",
    "0x8529d076CA796B00A75bBF758d05046BFB4DDaAB",
    "0x8529d076CA796B00A75bBF758d05046BFB4DDaAB",
    "0x8529d076CA796B00A75bBF758d05046BFB4DDaAB",
  ];
  const [address, setAddress] = useState<string>("");
  const { getItem, setItem, removeItem } = useStorage();

  const router = useRouter();
  const slug = router.query.project;
  const account =
    getItem("isAuthenticated", "local") == "true" &&
    getItem("account", "local");

  if (!slug) return <div>No project found</div>;
  if (!account) return <div>No account found</div>;

  async function handleDelegateAccess() {
    if (!slug) return toast.error("No project provided");
    if (!account) return toast.error("No account provided");

    const result = await delegateAccessToAddress({
      address,
      slug: slug as string,
      account,
    });

    console.log({ result });
  }

  return (
    <div className="mt-10 border-y py-10">
      <div className=" mb-5 text-xl ">Delegate Access</div>

      <div>
        {delegatedAccessToList.map((address, index) => (
          <div key={index} className="my-2">
            {index + 1}. {address}
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center gap-5">
        <input
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          id="address"
          className="h-full w-[300px] rounded-lg border-2"
          type="text"
          placeholder="Address"
          // {...newUserForm.getFieldProps("address")}
        />
        <Button
          disabled={address.length < 1}
          onClick={() => {
            address.length > 0 && handleDelegateAccess();
          }}
        >
          Delegate
        </Button>
      </div>
    </div>
  );
}

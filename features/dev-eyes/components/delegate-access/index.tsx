import { collection, limit, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAddress } from "redux/reducers/selectors/user";

import { firestore } from "@/lib/firebase";
import useStorage from "@/hooks/storage";

import Button from "@/components/buttons/Button";

import { delegateAccessToAddress } from "./index.logic";

import { IDelegates } from "@/types";

export default function DelegateAccess() {
  const [delegatedAccessToList, setDelegatedAccessToList] = useState<
    IDelegates[]
  >([]);

  const activeAddress = useSelector(getAddress);

  const [address, setAddress] = useState<string>("");
  const { getItem, setItem, removeItem } = useStorage();

  const router = useRouter();
  const slug = router.query.project;
  // const account =
  //   getItem("isAuthenticated", "local") == "true" &&
  //   getItem("account", "local");

  const _query = query(
    collection(firestore, `Projects/${slug}/Delegates`),
    where("owner", "==", activeAddress),
    limit(100)
  );

  const [snapshots, loading] = useCollectionData(_query);

  useEffect(() => {
    if (loading) return;
    if (!snapshots) return;

    const data = snapshots.reduce((acc: IDelegates[], curr: any) => {
      acc.push(curr as IDelegates);
      return acc;
    }, []);

    console.log({ data });

    setDelegatedAccessToList(data);
  }, [loading, snapshots]);

  if (!slug) return <div>No project found</div>;
  if (!activeAddress) return <div>No account found</div>;

  async function handleDelegateAccess() {
    if (!slug) return toast.error("No project provided");
    if (!activeAddress) return toast.error("No account provided");

    try {
      console.log({ activeAddress });

      const result = await delegateAccessToAddress({
        address,
        slug: slug as string,
        account: activeAddress,
      });
    } catch (error: any) {
      toast.error(error.toString());
      console.log(error);
    }
  }

  return (
    <div className="mt-10 border-y py-10">
      <div className=" mb-5 text-xl ">Delegate Access</div>

      <div>
        {delegatedAccessToList.map((address, index) => (
          <div key={index} className="my-2">
            {index + 1}. {address.delegate}
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

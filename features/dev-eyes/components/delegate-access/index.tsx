import { collection, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAddress } from "redux/reducers/selectors/user";

import { firestore } from "@/lib/firebase";

import Button from "@/components/buttons/Button";

import { isProjectOwner } from "@/utils/authentication";

import { delegateAccessToAddress } from "./index.logic";

import { IDelegates } from "@/types";

export default function DelegateAccess() {
  const [delegatedAccessToList, setDelegatedAccessToList] = useState<
    IDelegates[]
  >([]);

  const activeAddress = useSelector(getAddress);

  const [address, setAddress] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const router = useRouter();
  const slug = router.query.project;

  const _query = query(
    collection(firestore, `Projects/${slug}/Delegates`),
    where("owner", "==", activeAddress)
  );

  const [snapshots, loading] = useCollectionData(_query);

  async function validateOwner() {
    const _isOwner = await isProjectOwner(
      router.query.project as string,
      activeAddress
    );

    setIsOwner(_isOwner);
    return _isOwner;
  }

  useEffect(() => {
    if (!activeAddress) return;
    validateOwner();

    if (loading) return;
    if (!snapshots) return;

    const data = snapshots.reduce((acc: IDelegates[], curr: any) => {
      acc.push(curr as IDelegates);
      return acc;
    }, []);

    setDelegatedAccessToList(data);
  }, [loading, snapshots, activeAddress]);

  if (!slug) return <div>No project found</div>;
  if (!activeAddress) return <div>No account found</div>;

  async function handleDelegateAccess() {
    if (!slug) return toast.error("No project provided");
    if (!activeAddress) return toast.error("No account provided");

    try {
      setIsSaving(true);

      const result = await delegateAccessToAddress({
        address,
        slug: slug as string,
        account: activeAddress,
      });

      if (result.data.success != false) {
        toast.success("Account delegated");
        setAddress("");
      } else {
        toast.error(result.data.message);
      }
    } catch (error: any) {
      toast.error(error.toString());
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  }

  if (isOwner == false) {
    return <div></div>;
  }

  return (
    <div className="mt-10 border-y py-10 dark:border-y-gray-500">
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full rounded text-left text-sm text-gray-500 dark:text-gray-400">
          <caption className="bg-white py-5 text-left text-lg font-semibold text-gray-900 dark:bg-[color:var(--dark)] dark:text-white">
            Delegate Access
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              Allow other users to view this project by delegating access
            </p>
          </caption>
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="sr-only py-3 px-6">
                Index
              </th>
              <th scope="col" className="py-3 px-6">
                Address
              </th>
              <th scope="col" className="py-3 px-6">
                Role
              </th>
              <th scope="col" className="py-3 px-6">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {delegatedAccessToList.map((user, index) => (
              <tr
                key={index}
                className="border-b bg-white dark:border-gray-700 dark:bg-[color:var(--dark)] dark:bg-gray-800"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
                >
                  {index + 1}
                </th>
                <td className="py-4 px-6">{user.delegate}</td>
                <td className="py-4 px-6">{user.role}</td>
                <td className="py-4 px-6">{user.dateDelegated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 flex items-center gap-5">
        <input
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          value={address}
          id="address"
          className="h-full w-[300px] rounded-lg border-2 dark:bg-[rgba(255,255,255,0.1)] dark:text-white"
          type="text"
          placeholder="Address"
          // {...newUserForm.getFieldProps("address")}
        />
        <Button
          isLoading={isSaving}
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

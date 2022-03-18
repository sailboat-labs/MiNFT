/* eslint-disable @next/next/no-img-element */
import { doc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { firebaseApp } from "@/lib/firebase";

import { getRandomAvatar } from "@/utils/GetRandomAvatar";

type props = {
  account?: string;
  className?: string;
  imageClassName?: string;
};
const firestore = getFirestore(firebaseApp);

export default function Avatar({ account, className, imageClassName }: props) {
  const [user, setUser] = useState<any>();

  const ref = doc(firestore, `users/${account}`);

  const [userData, loading, error] = useDocumentData(ref);

  async function getUserData() {
    try {
      setUser(userData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    //Get ENS name
    if (!account || !userData || loading) return;
    getUserData();
  }, [account, userData, loading]);

  return (
    <>
      {account && (
        <img
          className={`${
            !imageClassName && "h-10 w-10 rounded-full object-cover"
          } ${imageClassName}`}
          src={user?.avatarUrl ?? getRandomAvatar(account)}
          alt=""
        />
      )}
    </>
  );
}

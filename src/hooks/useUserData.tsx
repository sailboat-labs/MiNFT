/* eslint-disable @next/next/no-img-element */
import { doc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { firebaseApp } from "@/lib/firebase";

import { User } from "@/types";

const firestore = getFirestore(firebaseApp);

export default function useUserData() {
  const [user, setUser] = useState<User>();
  const [walletId, setWalletId] = useState();

  const ref = doc(firestore, `users/${walletId}`);

  const [userData, loading, error] = useDocumentData(ref);

  async function getUserData() {
    try {
      setUser(userData as User);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    //Get ENS name
    if (!walletId || !userData || loading) return;
    getUserData();
  }, [userData, loading, walletId]);

  return {
    user,
    walletId,
    setWalletId,
  };
}

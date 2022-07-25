import {
  collectionGroup,
  DocumentData,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { firebaseApp } from "@/lib/firebase";
import useStorage from "@/hooks/storage";

import { IProject } from "@/interfaces";

import { getDelegatedProjects } from "./index.logic";

const firestore = getFirestore(firebaseApp);

export default function DelegatedProjects() {
  const [delegatedProjects, setDelegatedProjects] = useState<IProject[]>([]);
  const router = useRouter();
  const { getItem, setItem, removeItem } = useStorage();

  const _query = query(
    collectionGroup(firestore, `Delegates`),
    where(
      "delegate",
      "==",
      (getItem("isAuthenticated") == "true" ? getItem("account") : "") ?? ""
    )
  );
  const [snapshots, loading] = useCollectionData(_query);

  async function handleGetDelegatedProjects() {
    const account = getItem("isAuthenticated") == "true" && getItem("account");

    if (!account) return;
    const projectsDelegated = await getDelegatedProjects(account);
    setDelegatedProjects(projectsDelegated);
  }

  useEffect(() => {
    if (loading) return;
    if (!snapshots) return;

    const data = snapshots.reduce((acc: IProject[], curr: DocumentData) => {
      acc.push(curr as IProject);
      return acc;
    }, []);

    if (data.length < 0) return;

    handleGetDelegatedProjects();
  }, [loading, snapshots]);

  return (
    <div className="mb-10">
      <div>
        <div className="mb-5 text-xl font-semibold">Delegated Projects</div>
        {delegatedProjects.map((project, index) => (
          <div
            key={index}
            onClick={() => {
              router.push(`/dashboard/${project.slug}`);
            }}
            className="rounded-lg border bg-gray-50 px-5 py-5 "
          >
            <div className="pr-20 font-dmsans text-xl">
              {project.projectName}
            </div>
            <div className="pb-20 font-dmsans">{project.slug}</div>
          </div>
        ))}

        {!loading && delegatedProjects.length < 1 && (
          <div> No project delegated to you</div>
        )}
      </div>
    </div>
  );
}

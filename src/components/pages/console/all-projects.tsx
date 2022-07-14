import {
  collection,
  DocumentData,
  getFirestore,
  limit,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { firebaseApp } from "@/lib/firebase";
import useStorage from "@/hooks/storage";

import { IProject } from "@/interfaces";

const firestore = getFirestore(firebaseApp);

export default function AllProjects() {
  const [allProjects, setAllProjects] = useState<IProject[]>([]);
  const router = useRouter();
  const { getItem, setItem, removeItem } = useStorage();

  const _query = query(
    collection(firestore, `Projects`),
    where(
      "owner",
      "==",
      (getItem("isAuthenticated") == "true" ? getItem("account") : "") ?? ""
    ),
    limit(100)
  );
  const [snapshots, loading] = useCollectionData(_query);

  useEffect(() => {
    if (loading) return;
    if (!snapshots) return;

    const data = snapshots.reduce((acc: IProject[], curr: DocumentData) => {
      acc.push(curr as IProject);
      return acc;
    }, []);

    console.log(data);

    setAllProjects(data);
  }, [loading, snapshots]);

  return (
    <div>
      <div>
        {allProjects.map((project, index) => (
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
      </div>
    </div>
  );
}

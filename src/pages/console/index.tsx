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
import { useMoralis } from "react-moralis";

import { firebaseApp } from "@/lib/firebase";

import Navbar from "@/components/layout/Navbar";
import AuthGuard from "@/components/shared/AuthGuard";

import { IProject } from "@/interfaces";
const firestore = getFirestore(firebaseApp);

export default function Console() {
  const [allProjects, setAllProjects] = useState<IProject[]>([]);
  const { account, logout, isAuthenticated } = useMoralis();
  const router = useRouter();

  const _query = query(
    collection(firestore, `Projects`),
    where(
      "owner",
      "==",
      "0x65cF0585bD7B236b635DA7077624431DD9cec35e".toLowerCase()
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

    if (data.length < 1) router.push("/console/new");

    setAllProjects(data);
  }, [loading, snapshots]);

  return (
    <AuthGuard>
      <Navbar />

      <div className="container mx-auto">
        <div className="mb-10 pt-20 font-dmsans text-2xl">New Project</div>
        <div
          onClick={() => {
            router.push("/console/new");
          }}
          className="w-fit cursor-pointer rounded-lg border bg-gray-50 px-5 py-5 transition-all hover:bg-gray-100"
        >
          <div className="pr-20 font-dmsans text-base">Create New Project</div>
        </div>
        <div className="mb-10 pt-20 font-dmsans text-2xl">Recent Projects</div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
          {allProjects.map((project, index) => (
            <div
              key={index}
              className="cursor-pointer rounded-lg border bg-gray-50 px-5 py-5 transition-all hover:bg-gray-100"
            >
              <div className="pr-20 font-dmsans text-xl">
                {project.projectName}
              </div>
              <div className="pb-20 font-dmsans">{project.slug}</div>
            </div>
          ))}
        </div>
      </div>
    </AuthGuard>
  );
}

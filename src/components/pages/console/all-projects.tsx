import {
  collection,
  DocumentData,
  limit,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useMoralis } from "react-moralis";

import { IProject } from "@/interfaces";
import { firestore } from "@/pages/console";

export default function AllProjects() {
  const [allProjects, setAllProjects] = useState<IProject[]>([]);
  const { account, logout, isAuthenticated } = useMoralis();

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

    console.log(data);

    setAllProjects(data);
  }, [loading, snapshots]);

  return (
    <div>
      <div>
        {allProjects.map((project, index) => (
          <div key={index} className="rounded-lg border bg-gray-50 px-5 py-5 ">
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

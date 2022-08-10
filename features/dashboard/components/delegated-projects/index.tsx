import { ethers } from "ethers";
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
import { useSelector } from "react-redux";
import { getAddress } from "redux/reducers/selectors/user";

import { firebaseApp } from "@/lib/firebase";

import PageLoader from "@/components/shared/PageLoader";

import { IProject } from "@/interfaces";

import { getDelegatedProjects } from "./index.logic";

const firestore = getFirestore(firebaseApp);

export default function DelegatedProjects() {
  const [delegatedProjects, setDelegatedProjects] = useState<IProject[]>([]);
  const router = useRouter();
  const activeAddress = useSelector(getAddress);
  const [isLoadingDelegatedProjects, setIsLoadingDelegatedProjects] =
    useState(true);

  const _query = query(
    collectionGroup(firestore, `Delegates`),
    where("delegate", "==", activeAddress)
  );

  const [snapshots, loading] = useCollectionData(_query);

  async function handleGetDelegatedProjects() {
    if (!activeAddress) return;
    const projectsDelegated = await getDelegatedProjects(activeAddress);
    setDelegatedProjects(projectsDelegated);
    setIsLoadingDelegatedProjects(false);
  }

  useEffect(() => {
    if (loading) return;
    if (!snapshots) return;
    if (ethers.utils.isAddress(activeAddress) == false) return;

    const data = snapshots.reduce((acc: IProject[], curr: DocumentData) => {
      acc.push(curr as IProject);
      return acc;
    }, []);

    if (data.length < 0) return;

    handleGetDelegatedProjects();
  }, [loading, snapshots, activeAddress]);

  if (isLoadingDelegatedProjects)
    return (
      <div className="mb-10 flex w-fit items-center rounded-lg border-2 bg-gray-50 pr-5">
        <PageLoader /> Loading Delegated Projects
      </div>
    );

  return (
    <div className="mb-10 mt-5">
      <div>
        <div className=" text-xl font-semibold dark:text-white">
          Delegated Projects
        </div>
        <div className="rid-cols-2 grid gap-5 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
          {delegatedProjects.map((project, index) => (
            <div
              key={index}
              onClick={() => {
                router.push(`/dashboard/${project.slug}`);
              }}
              className="mt-10 mb-56 cursor-pointer rounded-lg border bg-gray-50 px-5 py-5 transition-all hover:bg-gray-100"
            >
              <div className="pr-20 font-dmsans text-xl">
                {project.projectName}
              </div>
              <div className="pb-20 font-dmsans">{project.slug}</div>
            </div>
          ))}
        </div>

        {!isLoadingDelegatedProjects && delegatedProjects.length < 1 && (
          <div className="dark:text-gray-400"> No project delegated to you</div>
        )}
      </div>
    </div>
  );
}

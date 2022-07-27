/* eslint-disable @next/next/no-img-element */

import axios from "axios";
import dashify from "dashify";
import DelegatedProjects from "features/dashboard/components/delegated-projects";
import {
  collection,
  DocumentData,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import { getAddress } from "redux/reducers/selectors/user";

import { firebaseApp } from "@/lib/firebase";

import { PROFILE_IMAGE } from "@/data/DemoProject";

import ProjectDetails from "@/components/pages/Dashboard/home/project-details";
import ProjectName from "@/components/pages/Dashboard/home/project-name";
import AuthGuard from "@/components/shared/AuthGuard";
import PageLoader from "@/components/shared/PageLoader";

import { IProject } from "@/interfaces";

export const firestore = getFirestore(firebaseApp);

export default function DashboardGetStarted() {
  const [isCreatingProjectStarted, setIsCreatingProjectStarted] =
    useState(false);
  const [currentStep, setCurrentStep] = useState("");
  const [currentStepTitle, setCurrentStepTitle] = useState(
    "Let's start with a name for your project"
  );
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [allProjects, setAllProjects] = useState<IProject[]>([]);
  const activeAddress = useSelector(getAddress);

  const router = useRouter();
  const [canCreateModalBeDiscarded, setCanCreateModalBeDiscarded] =
    useState(true);

  //Project globals
  const [projectName, setProjectName] = useState("");

  const steps: { label: string; component: any }[] = [
    {
      label: "project-name",
      component: <ProjectName />,
    },
    {
      label: "project-details",
      component: <ProjectDetails />,
    },
  ];

  function handleStepChange(title: string, step: string) {
    setCurrentStep(step);
    setCurrentStepTitle(title);
  }

  const _query = query(
    collection(firestore, `Projects`),
    where("owner", "==", activeAddress)
  );
  const [snapshots, loading] = useCollectionData(_query);

  useEffect(() => {
    if (loading) return;
    if (!snapshots) return;

    const data = snapshots.reduce((acc: IProject[], curr: DocumentData) => {
      acc.push(curr as IProject);
      return acc;
    }, []);

    setAllProjects(data);
  }, [loading, snapshots]);

  async function createDemoProject() {
    setIsCreatingProject(true);
    const data: IProject = {
      projectName: "Nozomix Extreme",
      tokenSupply: "64",
      baseUrl: "https://baseurl.com/",
      description: "This is the Magic Mynt demo project: Nozomix Extreme",
      isDemo: true,
      owner: activeAddress,
    };

    if (!data || !activeAddress) return;

    const response = await axios.post("/api/dashboard/console/create-project", {
      project: data,
      account: activeAddress,
    });

    if (response.data.success) {
      setIsCreatingProjectStarted(false);
      setIsCreatingProject(false);
      router.push(
        `/dashboard/${dashify("Nozomix Extreme")}-${activeAddress.substring(
          0,
          9
        )}${activeAddress.substring(
          activeAddress.length - 9,
          activeAddress.length - 1
        )}`
      );
    } else {
      // toast.error(
      //   response.data.message ?? "An error occurred creating account"
      // );
      router.push(
        `/dashboard/${dashify("Nozomix Extreme")}-${activeAddress.substring(
          0,
          9
        )}${activeAddress.substring(
          activeAddress.length - 9,
          activeAddress.length - 1
        )}`
      );
      setIsCreatingProject(false);
      setCanCreateModalBeDiscarded(true);
    }
  }

  return (
    <AuthGuard>
      <div
        className={`flex h-screen  flex-col overflow-hidden pb-20 font-dmsans transition-all dark:bg-black lg:flex-row ${
          isCreatingProjectStarted ? "bg-indigo-200" : "bg-white"
        }`}
      >
        <div className="absolute flex h-screen w-full">
          <div
            className={` flex h-full flex-col gap-36 overflow-y-auto transition-all duration-300 xl:flex-row  ${
              isCreatingProjectStarted
                ? "pointer-events-auto px-10 opacity-30 lg:px-36"
                : "pointer-events-auto px-10 opacity-100 lg:px-36"
            }`}
          >
            {/* Left section */}
            <div className="sticky top-0">
              <div className=" mt-10">
                <Link href="/" passHref>
                  <div className="flex w-fit justify-between">
                    <span className="flex cursor-pointer select-none items-center font-dmsans text-4xl font-bold leading-none  text-gray-900  md:mb-0 lg:items-center lg:justify-center">
                      Magic Mynt<span className="text-indigo-600">.</span>
                    </span>
                  </div>
                </Link>
                <div className="mt-5 text-xl">
                  Tools from Sailboat labs for creating your NFT project with no
                  code
                </div>
              </div>

              <div className="mt-36 flex gap-5">
                <div
                  onClick={() => {
                    setIsCreatingProjectStarted(!isCreatingProjectStarted);
                    handleStepChange(
                      "Let's start with a name for your project",
                      "project-name"
                    );
                  }}
                  className="flex h-52 w-72 cursor-pointer flex-col justify-between rounded-lg border-2 bg-white px-10 py-5 text-xl transition-all hover:scale-105 hover:bg-gray-50"
                >
                  Create Project
                </div>
                <div
                  onClick={() => {
                    createDemoProject();
                  }}
                  className=" flex h-52 w-72 cursor-pointer flex-col justify-between rounded-lg border-2 bg-white px-10 py-5 transition-all hover:scale-105 hover:bg-gray-50"
                >
                  <div className="font-dmsans text-xl">
                    Explore a demo project
                  </div>
                  {isCreatingProject && <PageLoader />}
                  {!isCreatingProject && (
                    <div className="flex items-center gap-5">
                      <img
                        className="h-16 w-16 rounded-full"
                        alt=""
                        src={PROFILE_IMAGE}
                      />
                      <span>Nozomix</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Right section */}
            <div className="mt-10 pb-24">
              <div className="pt-10 font-dmsans text-xl text-gray-500">
                {activeAddress}
              </div>
              <div className="mb-10  font-dmsans text-2xl">Recent Projects</div>
              {loading && (
                <div className="flex w-full">
                  <PageLoader />
                </div>
              )}

              {!loading && allProjects.length < 1 && activeAddress && (
                <div className="mt-10 font-dmsans text-2xl">
                  No Project Created
                </div>
              )}
              <DelegatedProjects />
              <div className="mb-5 text-xl font-semibold">My Projects</div>

              <div className="3xl:grid-cols-4 mb-20 grid grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
                {allProjects.map((project, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      router.push(`/dashboard/${project.slug}`);
                    }}
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
          </div>
        </div>
        <div
          className={`relative flex min-h-screen w-full justify-end border-l transition-all duration-500 ${
            isCreatingProjectStarted
              ? "pointer-events-auto translate-x-0 opacity-100"
              : "pointer-events-none  translate-x-full opacity-0"
          }`}
        >
          <div className="min-h-screen w-1/2  border-l bg-white px-20 pt-10">
            <img
              className={`absolute -bottom-20 -right-20 h-[30vw] w-[30vw] transition-all ${
                currentStep == "project-name"
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-5 opacity-0"
              }`}
              src="/svg/project_name.svg"
              alt=""
            />

            <img
              className={`absolute -bottom-20 -right-20 h-[30vw] w-[30vw] transition-all ${
                currentStep == "project-details"
                  ? "translate-x-0 opacity-100"
                  : "translate-x-5 opacity-0"
              }`}
              src="/svg/project-details.svg"
              alt=""
            />
            <div
              onClick={() => {
                setIsCreatingProjectStarted(false);
              }}
              className={`mb-10 w-fit cursor-pointer rounded-full  p-2 transition-all hover:scale-105 ${
                canCreateModalBeDiscarded
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="mb-14 flex gap-10">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                    currentStep == step.label
                      ? "border-indigo-300 bg-indigo-100 "
                      : "border-gray-100 bg-white "
                  }`}
                >
                  {index + 1}
                </div>
              ))}
            </div>

            <div className="h-36 w-[25rem] font-dmsans text-2xl">
              {currentStep == "project-details" && (
                <div className="font-dmsans text-sm text-gray-500">
                  {projectName}
                </div>
              )}
              <div className="text-4xl">{currentStepTitle}</div>
              <div>
                <div
                  className={`absolute transition-all duration-500 ${
                    currentStep == "project-name"
                      ? "pointer-events-auto translate-x-0 opacity-100"
                      : currentStep == "project-details"
                      ? "pointer-events-none -translate-x-20 opacity-0"
                      : "pointer-events-none translate-x-20 opacity-0"
                  }`}
                >
                  <ProjectName
                    setCurrentStep={setCurrentStep}
                    setCurrentStepTitle={setCurrentStepTitle}
                    setProjectName={setProjectName}
                  />
                </div>
                <div
                  className={`relative transition-all duration-500 ${
                    currentStep == "project-details"
                      ? "pointer-events-auto translate-x-0 opacity-100"
                      : "pointer-events-none -z-[99999] translate-x-20 opacity-0"
                  }`}
                >
                  <ProjectDetails
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    setCurrentStepTitle={setCurrentStepTitle}
                    setIsCreatingProjectStarted={setIsCreatingProjectStarted}
                    setProjectName={setProjectName}
                    projectName={projectName}
                    setCanCreateModalBeDiscarded={setCanCreateModalBeDiscarded}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

/* eslint-disable @next/next/no-img-element */

import axios from "axios";
import { getFirestore } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import { toast } from "react-toastify";

import { firebaseApp } from "@/lib/firebase";

import { PROFILE_IMAGE } from "@/data/DemoProject";

import Navbar from "@/components/layout/Navbar";
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

  return (
    <AuthGuard>
      {!isCreatingProjectStarted && <Navbar />}
      <div
        className={` flex h-screen flex-col overflow-hidden font-dmsans transition-all lg:flex-row ${
          isCreatingProjectStarted ? "bg-indigo-200" : "bg-white"
        }`}
      >
        <div className="flex h-screen  lg:w-1/2">
          <div
            className={`container mx-auto mt-36  transition-all duration-300  ${
              isCreatingProjectStarted
                ? "pointer-events-none px-5 opacity-30 lg:px-36 lg:pl-24"
                : "pointer-events-auto px-10 opacity-100 lg:px-36"
            }`}
          >
            <div>
              <div className="text-3xl">Welcome to MiNFT!</div>
              <div className="mt-5 text-xl">
                Tools from Sailboat labs for creating your NFT project with no
                code
              </div>
              <div
                onClick={() => {
                  setIsCreatingProjectStarted(!isCreatingProjectStarted);
                  handleStepChange(
                    "Let's start with a name for your project",
                    "project-name"
                  );
                }}
                className={`mt-5 w-fit cursor-pointer rounded-lg border-2 px-5 py-2 transition-all ${
                  isCreatingProjectStarted
                    ? "pointer-events-none -translate-x-2 opacity-0"
                    : "pointer-events-auto translate-x-0 opacity-100"
                }`}
              >
                Create Project
              </div>
            </div>

            <div className="flex gap-5">
              <div className="mt-36 flex h-52 w-72 cursor-pointer flex-col justify-between rounded-lg border-2 bg-white px-10 py-5 transition-all hover:scale-105 hover:bg-gray-50">
                <div className="font-dmsans text-xl">
                  Explore a demo project
                </div>
                <div className="flex items-center gap-5">
                  <img
                    className="h-16 w-16 rounded-full"
                    alt=""
                    src={PROFILE_IMAGE}
                  />
                  <span>Nozomix</span>
                </div>
              </div>
              <div
                onClick={() => {
                  router.push("/console");
                }}
                className="mt-36 flex h-52 w-72 cursor-pointer flex-col justify-between rounded-lg border-2 bg-white px-10 py-5 transition-all hover:scale-105 hover:bg-gray-50"
              >
                <div className="font-dmsans text-xl">All Projects</div>
              </div>
            </div>
          </div>
          {/* <div
          className={`transition-all ${
            isCreatingProjectStarted
              ? "pointer-events-none opacity-0"
              : "pointer-events-auto  opacity-100"
          }`}
        >
          <AllProjects />
        </div> */}
        </div>
        <div
          className={`h-screen overflow-y-auto overflow-x-hidden border-l bg-white px-20 pt-10 transition-all duration-500 xl:w-1/2 ${
            isCreatingProjectStarted
              ? "pointer-events-auto translate-x-0 opacity-100"
              : "pointer-events-none translate-x-20 opacity-0"
          }`}
        >
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
                className={`transition-all duration-500 ${
                  currentStep == "project-details"
                    ? "pointer-events-auto translate-x-0 opacity-100"
                    : "pointer-events-none translate-x-20 opacity-0"
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
    </AuthGuard>
  );
}

function ProjectName({
  setCurrentStep,
  setCurrentStepTitle,
  setProjectName,
}: any) {
  const [project, setProject] = useState("");
  return (
    <div>
      <input
        className="mt-10  w-full rounded border px-5 py-2"
        placeholder="Project name*"
        onChange={(e) => {
          setProject(e.target.value);
        }}
      />

      <div
        onClick={() => {
          if (project.length < 3) return;
          setCurrentStep("project-details");
          setCurrentStepTitle("Project Details");
          setProjectName(project);
        }}
        className={` mt-20 text-base ${
          project.length > 2 ? "gradient-button" : "disabled-button w-fit"
        }`}
      >
        Continue
      </div>
    </div>
  );
}

function ProjectDetails({
  setIsCreatingProjectStarted,
  setCurrentStep,
  setCurrentStepTitle,
  setProjectName,
  projectName,
  currentStep,
  setCanCreateModalBeDiscarded,
}: any) {
  const { account, logout, isAuthenticated } = useMoralis();

  const [tokenSupply, setTokenSupply] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const router = useRouter();

  async function handleCreateProject() {
    //
    if (!account) return toast.error("No account provided");
    setIsCreatingProject(true);
    setCanCreateModalBeDiscarded(false);
    setCurrentStepTitle("Creating Project");
    const data: IProject = {
      projectName,
      tokenSupply,
      baseUrl,
      description,
    };

    if (!data) return;

    const response = await axios.post("/api/dashboard/console/create-project", {
      project: data,
      account,
    });

    if (response.data.success) {
      toast.success("Account created");
      setIsCreatingProjectStarted(false);
      setIsCreatingProject(false);
      router.push("/console");
    } else {
      toast.error(
        response.data.message ?? "An error occurred creating account"
      );
      setIsCreatingProject(false);
      setCanCreateModalBeDiscarded(true);
    }
  }

  return (
    <div
      className={` pr-20 ${
        currentStep == "project-details"
          ? "pointer-events-auto"
          : "pointer-events-none"
      }`}
    >
      <div
        className={`absolute mt-10 flex items-center transition-all ${
          !isCreatingProject
            ? "pointer-events-none scale-105 opacity-0"
            : "pointer-events-auto scale-100 opacity-100"
        }`}
      >
        <PageLoader className=" w-fit" />
        <span className="text-sm">Hold on a second...</span>
      </div>
      <div
        className={`transition-all ${
          isCreatingProject
            ? "pointer-events-none scale-95 opacity-0"
            : "pointer-events-auto scale-100 opacity-100"
        }`}
      >
        <input
          className="mt-10  w-full rounded border px-5 py-2"
          placeholder="Enter your token supply*"
          onChange={(e) => {
            setTokenSupply(e.target.value);
          }}
        />
        <div className="mt-1 font-dmsans text-sm text-gray-500">
          Can be changed later in settings
        </div>

        <input
          className="mt-10  w-full rounded border px-5 py-2"
          placeholder="Enter your base URL*"
          onChange={(e) => {
            setBaseUrl(e.target.value);
          }}
        />
        <div className="mt-1 font-dmsans text-sm text-gray-500">
          Can be changed later in settings
        </div>

        <textarea
          className="mt-10 w-full rounded border px-5 py-2 text-2xl  "
          placeholder="Description*"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <div className="mt-1 font-dmsans text-sm text-gray-500">
          Can be changed later in settings
        </div>

        <div className="flex gap-5">
          <div
            onClick={() => {
              setCurrentStep("project-name");
              setCurrentStepTitle("Let's start with a name for your project");
              setProjectName("");
            }}
            className="gradient-button mt-20 text-base"
          >
            Back
          </div>
          <div
            onClick={() => {
              // setIsCreatingProjectStarted(false);
              if (
                tokenSupply.length > 0 &&
                baseUrl.length > 0 &&
                description.length > 0
              ) {
                handleCreateProject();
              }
            }}
            className={` mt-20 text-base ${
              tokenSupply.length > 0 &&
              baseUrl.length > 0 &&
              description.length > 0
                ? "gradient-button"
                : "disabled-button w-fit"
            }`}
          >
            Let&apos;s go
          </div>
        </div>
      </div>
    </div>
  );
}

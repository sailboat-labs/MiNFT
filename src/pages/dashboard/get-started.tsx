/* eslint-disable @next/next/no-img-element */

import axios from "axios";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

import useAuthenticationDialog from "@/hooks/UseAuthDialog";

import { PROFILE_IMAGE } from "@/data/DemoProject";

import Layout from "@/components/layout/Layout";

import { INewProject } from "@/interfaces";

export default function DashboardGetStarted() {
  const [isCreatingProjectStarted, setIsCreatingProjectStarted] =
    useState(false);
  const [currentStep, setCurrentStep] = useState("");
  const [currentStepTitle, setCurrentStepTitle] = useState(
    "Let's start with a name for your project"
  );

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

  // const { account, chainId, isAuthenticated } = useMoralis();
  const { AuthDialog, setShowAuthDialog, account, isAuthenticated } =
    useAuthenticationDialog();

  useEffect(() => {
    if (!account || !isAuthenticated) return;

    // setProfile(user);
  }, [account, isAuthenticated]);

  if (!account || !isAuthenticated) {
    return (
      <Layout>
        <div className="mt-20 flex h-full w-full flex-col items-center justify-center gap-5 px-10 text-center">
          <AuthDialog />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            Connect your wallet to view your profile
          </div>
          <div
            onClick={() => {
              setShowAuthDialog(true);
            }}
            className="gradient-button"
          >
            Connect your wallet
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <div className="flex flex-col  overflow-x-hidden 2xl:flex-row">
      <div className="min-h-screen xl:w-1/2 ">
        <div
          className={`container mx-auto mt-52 transition-all duration-300  ${
            isCreatingProjectStarted
              ? "px-5 opacity-30 lg:px-52 lg:pl-36"
              : "px-10 opacity-100 lg:px-52"
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
              className="mt-5 w-fit cursor-pointer rounded-lg border-2 px-5 py-2"
            >
              Create Project
            </div>
          </div>

          <div className="mt-52 flex h-52 w-72 cursor-pointer flex-col justify-between rounded-lg border-2 bg-white px-10 py-5 transition-all hover:scale-105 hover:bg-gray-50">
            <div className="font-dmsans text-xl">Explore a demo project</div>
            <div className="flex items-center gap-5">
              <img
                className="h-16 w-16 rounded-full"
                alt=""
                src={PROFILE_IMAGE}
              />
              <span>Nozomix</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`min-h-screen border-l px-20 pt-36 transition-all duration-500 xl:w-1/2 ${
          isCreatingProjectStarted
            ? "translate-x-0 opacity-100"
            : "translate-x-20 opacity-0"
        }`}
      >
        <div className="mb-14 flex gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                currentStep == step.label
                  ? "bg-gray-100 "
                  : "border-gray-100 bg-white "
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>

        <div className="h-36 w-[25rem] font-dmsans text-2xl">
          <div className="font-dmsans text-sm text-gray-500">{projectName}</div>
          {currentStepTitle}
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
                setCurrentStep={setCurrentStep}
                setCurrentStepTitle={setCurrentStepTitle}
                setIsCreatingProjectStarted={setIsCreatingProjectStarted}
                setProjectName={setProjectName}
                projectName={projectName}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
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
          setCurrentStep("project-details");
          setCurrentStepTitle("Project Details");
          setProjectName(project);
        }}
        className="gradient-button mt-20 text-base"
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
}: any) {
  const { account, logout, isAuthenticated } = useMoralis();

  const [tokenSupply, setTokenSupply] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [description, setDescription] = useState("");

  function handleCreateProject() {
    //
    if (!account) return;

    const data: INewProject = {
      projectName,
      tokenSupply,
      baseUrl,
      description,
    };

    if (!data) return;

    axios.post("/api/dashboard/create-project", {
      project: data,
      account,
    });
  }

  return (
    <div>
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
            handleCreateProject();
          }}
          className="gradient-button mt-20 text-base"
        >
          Let&apos;s go
        </div>
      </div>
    </div>
  );
}

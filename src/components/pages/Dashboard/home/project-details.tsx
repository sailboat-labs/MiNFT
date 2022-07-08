import axios from "axios";
import dashify from "dashify";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

import useStorage from "@/hooks/storage";

import PageLoader from "@/components/shared/PageLoader";

import { IProject } from "@/interfaces";

export default function ProjectDetails({
  setIsCreatingProjectStarted,
  setCurrentStep,
  setCurrentStepTitle,
  setProjectName,
  projectName,
  currentStep,
  setCanCreateModalBeDiscarded,
}: any) {
  const [tokenSupply, setTokenSupply] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const router = useRouter();
  const { getItem, setItem, removeItem } = useStorage();

  const account =
    (getItem("isAuthenticated") == "true" ? getItem("account") : "") ?? "";

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
      toast.success("Project created");
      setIsCreatingProjectStarted(false);
      setIsCreatingProject(false);
      router.push(`/dashboard/${dashify(projectName)}`);
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
      className={` relative pr-20 pb-20 ${
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
        className={`transition-all
        ${
          currentStep == "project-details"
            ? "pointer-events-auto"
            : "pointer-events-none"
        }
        ${
          isCreatingProject
            ? "pointer-events-none scale-95 opacity-0"
            : "pointer-events-auto scale-100 opacity-100"
        } `}
      >
        <input
          className={`mt-10  w-full rounded border px-5 py-2 
           ${
             currentStep == "project-details"
               ? "pointer-events-auto"
               : "pointer-events-none"
           }`}
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

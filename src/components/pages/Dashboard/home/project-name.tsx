import { useState } from "react";

export default function ProjectName({
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

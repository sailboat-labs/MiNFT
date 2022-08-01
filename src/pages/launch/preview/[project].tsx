import ProjectLaunch from "features/launch/launch/components/launchpad/launchpad";
import { NextPage } from "next";
import React from "react";

const LaunchpadPreview: NextPage = () => {
  return (
    <div>
      <div className="flex w-screen items-center justify-center bg-indigo-400 py-2 px-10 text-sm text-white transition-all">
        Launchpad Preview
      </div>
      <ProjectLaunch />
    </div>
  );
};

export default LaunchpadPreview;

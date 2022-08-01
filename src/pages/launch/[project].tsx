import ProjectLaunch from "features/launch/launch/components/launchpad/launchpad";
import { NextPage } from "next";
import React from "react";

const Launch: NextPage = () => {
  return <ProjectLaunch session="published" />;
};

export default Launch;

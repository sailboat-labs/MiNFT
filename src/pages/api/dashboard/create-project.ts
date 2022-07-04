/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from "next";

import { INewProject } from "@/interfaces";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == "POST") {
      const project = req.body?.project as INewProject;
      const { account } = req.body;
      if (!project)
        return res.status(403).send(responder(false, "No project provided"));
      if (!account)
        return res
          .status(403)
          .send(responder(false, "Authentication required"));

      createNewProject(account, project);

      return res.send("Saving new project");
    }
    return res.status(404).json({ success: false, message: "Not Found" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error, message: "Unable to process request" });
  }
};

export default handler;

function createNewProject(account: string, project: INewProject) {
  //
}

function responder(success: boolean, response: any) {
  return {
    success,
    response,
  };
}

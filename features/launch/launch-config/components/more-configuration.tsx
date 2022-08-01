import { useState } from "react";
import { useSelector } from "react-redux";
import { getProjectState } from "redux/reducers/selectors/project";

import { IProject, IProjectLaunch } from "@/interfaces";

import saveLaunchPadDraft from "../launchpad-config.logic";

type props = {
  launchInformation: IProjectLaunch;
};

export default function MoreConfiguration({ launchInformation }: props) {
  const [hasWhitelist, setHasWhitelist] = useState(true);
  const project = useSelector(getProjectState) as IProject;

  async function handleSaveLaunchPadDraft(
    field: string,
    value: string | boolean
  ) {
    const saveDraft = await saveLaunchPadDraft(project, field, value);
  }

  return (
    <div className="px-10 py-10">
      <div>
        <div className="flex items-center">
          <input
            checked={launchInformation.hasWhitelist}
            onChange={() => {
              setHasWhitelist(!hasWhitelist);
              handleSaveLaunchPadDraft("hasWhitelist", !hasWhitelist);
            }}
            id="checked-checkbox"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          <label
            htmlFor="checked-checkbox"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Has Whitelist
          </label>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useSelector } from "react-redux";
import { getProjectState } from "redux/reducers/selectors/project";

import { IProject, IProjectLaunch } from "@/interfaces";

import saveLaunchPadDraft from "../launchpad-config.logic";

type props = {
  launchInformation?: IProjectLaunch;
};

export default function MoreConfiguration({ launchInformation }: props) {
  const [hasWhitelist, setHasWhitelist] = useState(true);
  const [requiresTwitter, setRequiresTwitter] = useState(true);
  const project = useSelector(getProjectState) as IProject;

  async function handleSaveLaunchPadDraft(
    field: string,
    value: string | boolean
  ) {
    const saveDraft = await saveLaunchPadDraft(project, field, value);
  }

  return (
    <div className="flex gap-10 px-10 py-10">
      <div className="w-1/2 pr-10">
        <div className="mt-10 mb-5 flex items-center gap-5">
          <div className="text-xl">Whitelist Configuration</div>
          <div className=" flex-1 rounded-lg border "></div>
        </div>
        <div className="flex items-center">
          <input
            checked={launchInformation?.hasWhitelist}
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
        <div className="mt-5 flex items-center">
          <input
            checked={launchInformation?.requiresTwitter}
            onChange={() => {
              handleSaveLaunchPadDraft(
                "requiresTwitter",
                !(launchInformation?.requiresTwitter ?? false)
              );
            }}
            id="checked-checkbox"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          <label
            htmlFor="checked-checkbox"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Requires twitter account to register
          </label>
        </div>
        <div className="mt-10">Wallet Balance Required</div>
        <div className="mt-0 text-xs text-gray-500">
          Set to 0 to allow empty wallets to register
        </div>
        <input
          className="mt-2 rounded-lg border-2 bg-gray-50 px-5 py-2"
          placeholder="Wallet ballance required"
          type="number"
          defaultValue={launchInformation?.requiredEthAmount}
          onChange={(e) => {
            handleSaveLaunchPadDraft("requiredEthAmount", e.target.value);
          }}
        />
        <div className="mt-10 mb-5 flex items-center gap-5">
          <div className="text-xl">Social Media Configuration</div>
          <div className=" flex-1 rounded-lg border "></div>
        </div>
        <div className="">Discord</div>
        <input
          className="mt-2 rounded-lg border-2 bg-gray-50 px-5 py-2"
          placeholder="Discord link"
          defaultValue={launchInformation?.discordLink}
          onChange={(e) => {
            handleSaveLaunchPadDraft("discordLink", e.target.value);
          }}
        />
        <div className="mt-5">Twitter</div>
        <input
          className="mt-2 rounded-lg border-2 bg-gray-50 px-5 py-2"
          placeholder="@magicmynt"
          defaultValue={launchInformation?.twitterLink}
          onChange={(e) => {
            handleSaveLaunchPadDraft("twitterLink", e.target.value);
          }}
        />
        <div className="mt-5">Opensea</div>
        <input
          className="mt-2 rounded-lg border-2 bg-gray-50 px-5 py-2"
          placeholder="Opensea"
          defaultValue={launchInformation?.openseaLink}
          onChange={(e) => {
            handleSaveLaunchPadDraft("openseaLink", e.target.value);
          }}
        />
        <div className="mt-5">Website</div>
        <input
          className="mt-2 rounded-lg border-2 bg-gray-50 px-5 py-2"
          placeholder="https://"
          defaultValue={launchInformation?.website}
          onChange={(e) => {
            handleSaveLaunchPadDraft("website", e.target.value);
          }}
        />
      </div>
      <div className="w-1/2 border-l pl-10">
        <div className="mt-10 mb-5 flex items-center gap-5">
          <div className="text-xl">Contract Configuration</div>
          <div className=" flex-1 rounded-lg border "></div>
        </div>
        <div className="mt-5">Contract Address</div>
        <input
          className="mt-2 rounded-lg border-2 bg-gray-50 px-5 py-2"
          placeholder="0x...."
          defaultValue={launchInformation?.contractAddress}
          onChange={(e) => {
            handleSaveLaunchPadDraft("contractAddress", e.target.value);
          }}
        />
      </div>
    </div>
  );
}

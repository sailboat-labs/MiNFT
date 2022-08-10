import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getProjectState } from "redux/reducers/selectors/project";

import Button from "@/components/buttons/Button";
import WhitelistDates from "@/components/dashboard/Whitelist/WhitelistDates";

import { IProject, IProjectLaunch } from "@/interfaces";

import LaunchPadMoreConfigFAQ from "./faq";
import saveLaunchPadDraft from "../launchpad-config.logic";

type props = {
  launchInformation?: IProjectLaunch;
};

export default function MoreConfiguration({ launchInformation }: props) {
  const [hasWhitelist, setHasWhitelist] = useState(true);
  const [requiresMinEth, setRequiresMinEth] = useState<boolean>(
    launchInformation ? launchInformation.requiredEthAmount! > 0 : false
  );
  const project = useSelector(getProjectState) as IProject;

  const [links, setLinks] = useState<{ label: string; link: string }[]>(
    launchInformation?.links ?? []
  );

  async function handleSaveLaunchPadDraft(
    field: string,
    value: string | boolean | any[]
  ) {
    const saveDraft = await saveLaunchPadDraft(project, field, value);
  }

  return (
    <div className="grid grid-cols-1 gap-10 px-10 py-10 xl:grid-cols-2">
      <div className=" pr-10">
        <div className="mt-10 mb-5 flex items-center gap-5">
          <div className="text-xl text-indigo-500">Whitelist Configuration</div>
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

        <div
          className={`mt-5 flex items-center ${
            launchInformation?.hasWhitelist != true
              ? "opacity-50"
              : "opacity-100"
          }`}
        >
          <input
            checked={launchInformation?.requiresTwitter}
            disabled={launchInformation?.hasWhitelist == false}
            onChange={() => {
              if (launchInformation?.hasWhitelist == false)
                return toast.error("Enable whitelist");

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
        <div
          className={`mt-5 flex items-center ${
            launchInformation?.hasWhitelist != true
              ? "opacity-50"
              : "opacity-100"
          }`}
        >
          <input
            checked={requiresMinEth}
            disabled={launchInformation?.hasWhitelist == false}
            onChange={() => {
              if (launchInformation?.hasWhitelist == false)
                return toast.error("Enable whitelist");

              if (requiresMinEth == true)
                handleSaveLaunchPadDraft("requiredEthAmount", "0");

              setRequiresMinEth(!requiresMinEth);
            }}
            id="checked-checkbox"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          />
          <label
            htmlFor="checked-checkbox"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Requires minimum ETH amount
          </label>
        </div>
        {requiresMinEth && launchInformation?.hasWhitelist && (
          <>
            <div className="mt-10">Wallet ETH Balance Required</div>
            <div className="mt-0 text-xs text-gray-500">
              Set to 0 ETH to allow empty wallets to register
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
          </>
        )}
        <div
          className={`mt-10 transition-all ${
            launchInformation?.hasWhitelist
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-50"
          }`}
        >
          {project && <WhitelistDates project={project} />}
        </div>
        <div className="mt-10 flex items-center gap-5">
          <div className="text-xl text-indigo-500">
            Social Media Configuration
          </div>
          <div className=" flex-1 rounded-lg border "></div>
        </div>
        {links.length > 0 && (
          <div className="mt-5 mb-1 text-sm">Enter full links</div>
        )}

        <div className="flex flex-col gap-3">
          {links.map((link, index) => (
            <div key={index} className="flex gap-5">
              <div className="flex items-center gap-3">
                <input
                  className={`rounded-lg border-2  px-5 py-2 `}
                  placeholder="Label"
                  value={link.label}
                  onChange={(e) => {
                    if (e.target.value?.length < 1) return;
                    const _links = links;
                    _links[index].label = e.target.value;
                    setLinks(_links);
                    handleSaveLaunchPadDraft("links", links);
                  }}
                />
                <input
                  className={`rounded-lg border-2  px-5 py-2 `}
                  placeholder="Link"
                  value={link.link}
                  onChange={(e) => {
                    // if (validURL(e.target.value) == false) return;
                    if (e.target.value?.length < 1) return;
                    const _links = links;
                    _links[index].link = e.target.value;
                    setLinks(_links);
                    handleSaveLaunchPadDraft("links", links);
                  }}
                />
                <div
                  onClick={() => {
                    const _links = links.filter(
                      (item, linkIndex) => item.label != link.label
                    );
                    setLinks(_links);
                    handleSaveLaunchPadDraft("links", _links);
                  }}
                  className=" cursor-pointer rounded-full border-2 border-indigo-500 bg-indigo-200 p-1 text-indigo-500 transition-all hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 "
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
              </div>
            </div>
          ))}

          {links.length < 1 && (
            <div className="mt-5 flex items-center gap-3 text-red-500">
              {" "}
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
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              No Links Added
            </div>
          )}
        </div>

        <Button
          onClick={() => {
            setLinks([...links, { label: "", link: "" }]);
          }}
          className="mt-10"
        >
          Add New Link
        </Button>

        <LaunchPadMoreConfigFAQ launchInformation={launchInformation} />
      </div>

      <div className=" pl-0">
        <div className="mt-10 mb-5 flex items-center gap-5">
          <div className="text-xl text-indigo-500">Contract Configuration</div>
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

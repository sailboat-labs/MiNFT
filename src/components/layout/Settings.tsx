import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, ReactNode, useState } from "react";

import NavTab from "./NavTab";

interface AppProps {
  children: ReactNode;
}

const SettingsLayout: FC<AppProps> = ({ children }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("settings");
  return (
    <main>
      <div className="flex h-screen overflow-y-hidden">
        <section className="h-screen w-[200px] overflow-y-auto overflow-x-hidden bg-[#085E7D] text-white">
          <button
            className="group flex items-center gap-2 px-4 py-3"
            onClick={() => router.push("/nft")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 translate-x-2 opacity-0 transition-all delay-150 duration-150 group-hover:translate-x-0 group-hover:opacity-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <span className="-translate-x-8 duration-150 group-hover:translate-x-0">
              Back
            </span>
          </button>
          <NavTab active={activeTab === "settings"}>
            <div className="px-4 py-3" onClick={() => router.push("/settings")}>
              Settings
            </div>
          </NavTab>
          <NavTab active={activeTab === "generate"}>
            <div className="px-4 py-3" onClick={() => router.push("/generate")}>
              Generate
            </div>
          </NavTab>
        </section>
        <section className="h-screen w-[360px] overflow-y-auto border-r border-gray-100">
          <div className="bg-gray-100 p-6 py-4 text-lg">
            <strong>Settings</strong>
          </div>
          <Link href="/settings">
            <a className="flex w-full gap-2 p-4 text-left hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="gray"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div>
                <strong className="font-medium">Basic Data</strong>
                <p className="text-sm">Configure metadata and commision</p>
              </div>
            </a>
          </Link>
          <Link href="/settings/weighting">
            <a className="flex w-full gap-2 p-4 text-left hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="gray"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              <div>
                <strong className="font-medium">Traits</strong>
                <p className="text-sm">Adjust trait names and rarity</p>
              </div>
            </a>
          </Link>
          <Link href="/settings/output">
            <a className="flex w-full gap-2 p-4 text-left hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="gray"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <div>
                <strong className="font-medium">Render Settings</strong>
                <p className="text-sm">Dimensions, quality and file formats</p>
              </div>
            </a>
          </Link>
        </section>
        {children}
      </div>
    </main>
  );
};

export default SettingsLayout;

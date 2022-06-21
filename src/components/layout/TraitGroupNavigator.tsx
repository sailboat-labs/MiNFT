import Link from "next/link";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { getTraitGroups } from "redux/reducers/selectors/layers";

type Props = {
  name?: string;
};

const TraitGroupNavigator: FC<Props> = () => {
  const traitGroups = useSelector(getTraitGroups);
  const [activeTraitID, setActiveTraitID] = useState<string>("");
  /**
   * checks if element's id is active
   *
   * @param {string} id - element id to check against
   * @returns {boolean} - true if @param id is active else false
   */
  function isActive(id: string): boolean {
    return id.toLowerCase() === activeTraitID.toLowerCase();
  }

  return (
    <nav
      aria-label="traits-navbar"
      className="h-screen w-[200px] overflow-y-auto overflow-x-hidden bg-[#085E7D] text-white"
    >
      {/* <div className="flex w-full items-center justify-center p-4">
        <Link href="/" passHref>
          <span className="flex cursor-pointer select-none items-center justify-center text-xl font-black leading-none  text-white">
            MiNFT<span className="text-[#FFD32D]">.</span>
          </span>
        </Link>
      </div> */}
      {/* <FolderUploader /> */}
      <Link href="/settings">
        <a className="gradient-button flex w-full items-center gap-2 rounded-none py-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
          <span>Settings</span>
        </a>
      </Link>
      <ul>
        {traitGroups.map((groupName: string, index: number) => (
          <li
            className={`relative my-2 ml-2 rounded-tl-full rounded-bl-full  text-sm font-medium text-white transition-all duration-100 hover:bg-[#0d7ba3]  ${
              isActive(`#trait-group-${groupName}`) &&
              "bg-white  text-[#085E7D] hover:bg-white hover:tracking-wider"
            }`}
            key={groupName + index}
          >
            {isActive(`#trait-group-${groupName}`) && (
              <div className="pointer-events-none absolute bottom-full left-0 h-2 w-full bg-white before:absolute before:h-full before:w-full before:rounded-br-full before:bg-[#085E7D]"></div>
            )}
            <a
              href={`#trait-group-${groupName}`}
              onClick={() => setActiveTraitID(`#trait-group-${groupName}`)}
              className="block h-full w-full px-4 py-2"
            >
              {groupName.charAt(0).toUpperCase().concat(groupName.slice(1))}
            </a>
            {isActive(`#trait-group-${groupName}`) && (
              <div className="pointer-events-none absolute top-full left-0 h-2 w-full bg-white before:absolute before:h-full before:w-full before:rounded-tr-full before:bg-[#085E7D]"></div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TraitGroupNavigator;

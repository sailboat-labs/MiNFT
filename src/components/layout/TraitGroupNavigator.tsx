import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLayers, getTraitGroups } from "redux/reducers/selectors/layers";

type Props = {
  name?: string;
};

const TraitGroupNavigator: FC<Props> = () => {
  const traitGroups = useSelector(getTraitGroups);
  const layers = useSelector(getLayers);
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

  useEffect(() => {
    if (activeTraitID == "" && layers.length > 0) {
      setActiveTraitID(`#trait-group-${layers[0].name}`);
    }
  }, [layers]);

  return (
    <nav
      aria-label="traits-navbar"
      className="h-screen w-[200px] rounded-r-lg bg-gradient-to-b from-cyan-500 via-cyan-500 to-blue-500 "
    >
      <div className="flex w-full items-center justify-center p-4">
        <Link href="/" passHref>
          <span className="flex cursor-pointer select-none items-center justify-center text-xl font-black leading-none  text-white dark:text-gray-200">
            Magic Mynt<span className="text-[#FFD32D]">.</span>
          </span>
        </Link>
      </div>
      {/* <FolderUploader /> */}
      <ul className="mt-10">
        {traitGroups.map((groupName: string, index: number) => (
          <li
            className={`relative my-2 ml-2 rounded-tl-full rounded-bl-full  text-sm font-medium text-white transition-all duration-100 hover:bg-[#0d7ba3] dark:text-gray-700  ${
              isActive(`#trait-group-${groupName}`) &&
              "bg-white text-[#085E7D]  hover:bg-white hover:tracking-wider dark:bg-[color:var(--dark)]"
            }`}
            key={groupName + index}
          >
            {isActive(`#trait-group-${groupName}`) && (
              <div className="pointer-events-none absolute bottom-full left-0 h-2 w-full bg-white before:absolute before:h-full before:w-full before:rounded-br-full before:bg-cyan-500 dark:bg-[color:var(--dark)]"></div>
            )}
            <a
              href={`#trait-group-${groupName}`}
              onClick={() => setActiveTraitID(`#trait-group-${groupName}`)}
              className="block h-full w-full px-4 py-2"
            >
              {groupName.charAt(0).toUpperCase().concat(groupName.slice(1))}
            </a>
            {isActive(`#trait-group-${groupName}`) && (
              <div className="pointer-events-none absolute top-full left-0 h-2 w-full bg-white before:absolute before:h-full before:w-full before:rounded-tr-full before:bg-cyan-500 dark:bg-[color:var(--dark)]"></div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TraitGroupNavigator;

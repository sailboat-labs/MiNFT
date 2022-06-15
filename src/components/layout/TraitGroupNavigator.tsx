import React, { FC } from "react";
import { useSelector } from "react-redux";
import { getTraitGroups } from "redux/reducers/selectors/layers";

type Props = {
  name?: string;
};

const TraitGroupNavigator: FC<Props> = () => {
  const traitGroups = useSelector(getTraitGroups);

  return (
    <nav
      aria-label="traits-navbar"
      className="h-screen w-[150px] overflow-y-auto bg-gradient-to-t from-cyan-500 to-blue-500 text-white"
    >
      <ul>
        {traitGroups.map((groupName: string, index: number) => (
          <li className="px-3 py-2 text-sm" key={groupName + index}>
            <a href={`#trait-group-${groupName}`} className="block w-full">
              {groupName.charAt(0).toUpperCase().concat(groupName.slice(1))}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TraitGroupNavigator;

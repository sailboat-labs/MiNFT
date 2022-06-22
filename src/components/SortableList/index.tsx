import React from "react";
import { SortableContainer } from "react-sortable-hoc";

import { Trait } from "@/interfaces/get-started";

import SortableItem from "./SortableItem";

interface AppProps {
  items: any[];
  // setTraits: (traits: LayerName[]) => void;
}

const SortableList = SortableContainer(({ items }: AppProps) => {
  /**
   * toggles a specific trait
   *
   * @param {number} id - id of trait
   * @returns {undefined}
   */
  function toggleTrait(name: string): void {
    const temp = [...items];
    const traitIndex = temp.findIndex((item) => item.name === name);
    temp[traitIndex] = {
      ...temp[traitIndex],
      enabled: !temp[traitIndex].enabled,
    };

    // setTraits(temp);
  }

  return (
    <ul>
      {items.map((item: Trait, index: number) => (
        <SortableItem
          toggleTrait={toggleTrait}
          value={item.name}
          enabled={item.enabled}
          key={item.name + index}
          index={index}
        />
      ))}
    </ul>
  );
});

export default SortableList;

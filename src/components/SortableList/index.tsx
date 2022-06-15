import React from "react";
import { SortableContainer } from "react-sortable-hoc";

import { Trait } from "@/interfaces/get-started";

import SortableItem from "./SortableItem";

interface AppProps {
  items: Trait[];
  setTraits: (traits: Trait[]) => void;
}

const SortableList = SortableContainer(({ items, setTraits }: AppProps) => {
  /**
   * toggles a specific trait
   *
   * @param {number} id - id of trait
   * @returns {undefined}
   */
  function toggleTrait(id: number): void {
    const temp = [...items];
    const traitIndex = temp.findIndex((item) => item.id === id);
    temp[traitIndex] = {
      ...temp[traitIndex],
      enabled: !temp[traitIndex].enabled,
    };

    setTraits(temp);
  }

  return (
    <ul>
      {items.map((item: Trait, index: number) => (
        <SortableItem
          enabled={item.enabled}
          toggleTrait={toggleTrait}
          key={item.id}
          id={item.id}
          index={index}
          value={item.name}
          elementLength={item.elements.length}
        />
      ))}
    </ul>
  );
});

export default SortableList;

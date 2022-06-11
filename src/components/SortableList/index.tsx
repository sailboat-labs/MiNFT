import React from "react";
import { SortableContainer } from "react-sortable-hoc";

import SortableItem from "./SortableItem";

const SortableList = SortableContainer(({ items }: { items: string[] }) => {
  return (
    <ul>
      {items.map((item: string, index: number) => (
        <SortableItem key={item + index} index={index} value={item} />
      ))}
    </ul>
  );
});

export default SortableList;

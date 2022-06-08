import React from "react";
import { SortableContainer } from "react-sortable-hoc";

import SortableItem from "./SortableItem";

const SortableList = SortableContainer(() => {
  return (
    <ul>
      <SortableItem index={1} value="Hey 1" />
      <SortableItem index={2} value="Hey 2" />
      {/* {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))} */}
    </ul>
  );
});

export default SortableList;

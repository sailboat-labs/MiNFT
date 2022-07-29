import React from "react";
import { useSelector } from "react-redux";
import { SortableContainer } from "react-sortable-hoc";
import { getLayerOrder } from "redux/reducers/selectors/layers";

import { Trait } from "@/interfaces";

import SortableItem from "./SortableItem";

const SortableList = SortableContainer(() => {
  const layerOrder = useSelector(getLayerOrder);

  return (
    <ul>
      {layerOrder.map((item: Trait, index: number) => (
        <SortableItem
          enabled={item.enabled}
          key={item.id}
          id={item.id}
          value={item.name}
        />
      ))}
    </ul>
  );
});

export default SortableList;

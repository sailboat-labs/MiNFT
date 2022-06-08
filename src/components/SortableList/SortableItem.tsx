import React from "react";
import { SortableElement } from "react-sortable-hoc";

const SortableItem = SortableElement(({ value }: { value: string }) => (
  <li>value</li>
));

export default SortableItem;

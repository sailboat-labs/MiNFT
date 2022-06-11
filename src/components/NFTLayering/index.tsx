import React, { useState } from "react";
import { arrayMove } from "react-sortable-hoc";

import SortableList from "../SortableList";

const NFTLayering = () => {
  const [layers, setLayers] = useState([
    "Value 1",
    "Value 2",
    "Value 3",
    "Value 4",
    "Value 5",
    "Value 6",
    "Value 7",
    "Value 8",
  ]);

  function onSortEnd({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) {
    setLayers(arrayMove(layers, oldIndex, newIndex));
  }

  return (
    <div className="mx-4 w-full max-w-5xl transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all">
      <h1 className="mb-0 text-4xl font-semibold">Edit Template</h1>
      <div className="mt-8 flex gap-24">
        <article className="flex-1">
          <div className="mt-2">
            <div className="mt-3 flex flex-col gap-2">
              <label htmlFor="name">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                id="#name"
                className="rounded border border-gray-200"
              />
            </div>
            {/* Sortable list */}
            <strong className="mt-5 mb-1 block">Attributes</strong>
            <div className="max-h-[400px] overflow-y-auto">
              <SortableList items={layers} onSortEnd={onSortEnd} />
            </div>
          </div>
        </article>
        {/* preview box */}
        <div className="h-[350px] w-[350px] rounded-xl bg-gray-100">
          some preview box
        </div>
      </div>

      <div className="mt-6">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all duration-150 hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          // onClick={createProject}
        >
          Create Project
        </button>
      </div>
    </div>
  );
};

export default NFTLayering;

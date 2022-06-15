// import { arrayMove } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import React, { useState } from "react";

import { Trait } from "@/interfaces/get-started";

import SortableList from "../SortableList";

const NFTLayering = () => {
  const [NFTName, setNFTName] = useState("NFT Name");
  const [traits, setTraits] = useState<Trait[]>([
    {
      id: 1,
      name: "Background",
      value: {
        name: "Bg1.png",
        path: "localhost/bg1.png",
        filename: "bg1.png",
      },
      enabled: true,
    },
    {
      id: 2,
      name: "Eye",
      value: {
        name: "eye1.png",
        path: "localhost/eye1.png",
        filename: "eye1.png",
      },
      enabled: false,
    },
    {
      id: 3,
      name: "Body",
      value: {
        name: "Bg1.png",
        path: "localhost/bg1.png",
        filename: "bg1.png",
      },
      enabled: true,
    },
    {
      id: 4,
      name: "Accessory",
      value: {
        name: "eye1.png",
        path: "localhost/eye1.png",
        filename: "eye1.png",
      },
      enabled: true,
    },
  ]);

  function onSortEnd({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) {
<<<<<<< HEAD
    setTraits(arrayMove(traits, oldIndex, newIndex));

    console.log(traits);
=======
    setTraits(arrayMoveImmutable(traits, oldIndex, newIndex));
>>>>>>> bb5aacfe427140d4f823fd301c0c203bac3f1d48
  }

  /**
   * deletes a template
   *
   * @returns {undefined}
   */
  function deleteTemplate(): void {
    // todo: code to delete template goes here
  }
  /**
   * saves nft template
   *
   * @returns {undefined}
   */
  function saveTemplate(): void {
    /**
     *  todo: code to save template goes here
     *
     * -- traits variable contains the the last version of the trait modification
     * -- NFTName variable contains updated name of the NFT template being modified
     */
  }

  console.log(traits);

  return (
    <div className="w-full max-w-5xl transform overflow-hidden rounded bg-white text-left align-middle transition-all">
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
                value={NFTName}
                onChange={(evt) => setNFTName(evt.target.value)}
                className="rounded border border-gray-200"
              />
            </div>
            <strong className="mt-5 mb-1 block">Attributes</strong>
            <div className="max-h-[400px] overflow-y-auto">
              <SortableList
                items={traits}
                onSortEnd={onSortEnd}
                setTraits={setTraits}
              />
            </div>
          </div>
        </article>
        <div className="h-[350px] w-[350px] rounded-xl bg-gray-100">
          some preview box
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-6">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-blue-500 px-4 py-2 text-sm font-medium text-blue-500 transition-all duration-150 hover:bg-blue-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => deleteTemplate()}
        >
          Delete Template
        </button>
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all duration-150 hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => saveTemplate()}
        >
          Save Template
        </button>
      </div>
    </div>
  );
};

export default NFTLayering;

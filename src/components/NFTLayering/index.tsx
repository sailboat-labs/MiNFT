// import { arrayMove } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SortableList from "../SortableList";

const NFTLayering = () => {
  const [NFTName, setNFTName] = useState("NFT Name");
  const dispatch = useDispatch();
  const store = useSelector((state) => state) as any;
  const layersState = store.layersReducer;
  const [traits, setTraits] = useState([]);

  function onSortEnd({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) {
    setTraits(arrayMoveImmutable(traits, oldIndex, newIndex));
  }

  useEffect(() => {
    console.log(layersState.layers);
  }, [layersState]);

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

  return (
    <div className="w-full max-w-5xl transform overflow-hidden rounded bg-white text-left align-middle transition-all">
      <div className="mt-0 flex gap-24">
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
              <SortableList onSortEnd={onSortEnd} />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default NFTLayering;

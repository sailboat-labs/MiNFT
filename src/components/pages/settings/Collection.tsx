import React from "react";

const CollectionSettings = () => {
  return (
    <div className="py-12">
      <h4>Collection</h4>
      <p>Metadata for this collection of NFTs</p>
      <form action="#" className="mt-6">
        <div className="mt-6 grid grid-cols-2 items-start gap-6">
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="name">
              Name
            </label>
            <input type="text" className="flex-1 rounded-lg" />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="familiy">
              Family
            </label>
            <input type="text" className="flex-1 rounded-lg" />
            <p className="mt-2 text-sm">
              Optional name for a group of collections.
            </p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 items-start gap-6">
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="symbol">
              Symbol
            </label>
            <input type="text" className="flex-1 rounded-lg" />
            <p className="mt-2 text-sm">Exchange symbol (e.g SNEK)</p>
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="supply">
              Supply
            </label>
            <input type="text" className="flex-1 rounded-lg" />
            <p className="mt-2 text-sm">Number of tokens to generate.</p>
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <label className="mb-2 font-medium" htmlFor="external url">
            External URL
          </label>
          <input type="text" className="flex-1 rounded-lg" />
          <p className="mt-2 text-sm">
            Link to the website for this collection.
          </p>
        </div>
        <div className="mt-6 flex flex-col">
          <label className="mb-2 font-medium" htmlFor="description">
            Description
          </label>
          <textarea className="flex-1 rounded-lg"></textarea>
        </div>
      </form>
    </div>
  );
};

export default CollectionSettings;

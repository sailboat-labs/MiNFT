import React, { ChangeEvent } from "react";

const NewProperty = () => {
  /**
   * handles change in file input
   *
   * @param evt - ChangeEvent
   */
  function handleFileChanged(evt: ChangeEvent<HTMLInputElement>) {
    console.log(evt);
  }

  return (
    <form className="rounded-xl border border-[color:var(--border-gray)] bg-[color:var(--bg-gray)] p-6">
      <div className="flex flex-col gap-3">
        <label htmlFor="newProperty" className="font-semibold">
          New Property
        </label>
        <input
          type="text"
          placeholder="Name"
          className="rounded-sm border-[color:var(--border-gray)]"
          id="newProperty"
        />
      </div>
      <div className="relative mt-4 mb-4 w-full overflow-hidden rounded-md border-2 border-dashed border-[color:var(--indigo)] bg-[color:var(--bg-indigo)] py-2 hover:cursor-pointer">
        <div className="bg-indigo hover:bg-indigo-dark flex w-full items-center justify-center py-2 px-4 font-bold text-[color:var(--blue)]">
          <svg
            className="rotate-180 transform "
            fill="#30489C"
            height="18"
            viewBox="0 0 24 24"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
          </svg>
          <span className="ml-2">Add your traits here</span>
        </div>
        <input
          className="pin-r pin-t absolute block cursor-pointer opacity-0"
          type="file"
          name="vacancyImageFiles"
          onChange={handleFileChanged}
          multiple
        />
      </div>
    </form>
  );
};

export default NewProperty;

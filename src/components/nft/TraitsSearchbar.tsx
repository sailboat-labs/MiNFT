import React from "react";

const TraitsSearchbar = () => {
  return (
    <div className="group sticky top-1 z-20 flex bg-white py-2 px-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5  self-center fill-gray-300 "
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
      <input
        type="text"
        placeholder="search"
        className="w-full border-none placeholder:text-gray-300 focus:ring-0 placeholder:focus:text-gray-400"
      />
    </div>
  );
};

export default TraitsSearchbar;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchFilter } from "redux/reducers/slices/layers";

const TraitsSearchbar = () => {
  const dispatch = useDispatch();
  const [inputIsFocused, setInputIsFocused] = useState<boolean>(false);

  return (
    <div
      className={`group sticky top-1 z-20 my-1 flex overflow-hidden rounded-full bg-white py-1 px-2 ring-1 ring-gray-300  ${
        inputIsFocused && "!ring-indigo-800"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`ml-2 h-7  w-7 self-center fill-gray-300  ${
          inputIsFocused && "fill-indigo-800"
        }`}
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
      <input
        onBlur={() => setInputIsFocused(false)}
        onFocus={() => setInputIsFocused(true)}
        type="text"
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(setSearchFilter(evt.target.value))
        }
        placeholder="search layer or trait"
        className="w-full border-none text-gray-500 placeholder:text-gray-300 focus:ring-0 placeholder:focus:text-gray-400"
      />
    </div>
  );
};

export default TraitsSearchbar;

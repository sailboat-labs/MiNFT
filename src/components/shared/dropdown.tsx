import { Dispatch, SetStateAction, useState } from "react";

type props = {
  onItemSelected: Dispatch<SetStateAction<string | undefined>>;
  initial?: string;
  options: string[];
  className?: string;
};

export default function Dropdown({
  onItemSelected,
  initial,
  options,
  className,
}: props) {
  const [onParentClick, setOnParentClick] = useState<{
    show: boolean;
    selected: string;
  }>({ show: false, selected: initial ?? "Select One" });
  return (
    <div className="relative w-full">
      <button
        id="dropdownButton"
        onClick={() => {
          setOnParentClick({
            show: !onParentClick.show,
            selected: onParentClick.selected,
          });
        }}
        data-dropdown-toggle="dropdown"
        className={`inline-flex w-full items-center justify-between rounded-lg bg-gray-200 px-4 py-2.5 text-center text-sm font-medium capitalize focus:ring-4 focus:ring-blue-300 ${className}`}
        type="button"
      >
        {onParentClick.selected}
        <svg
          className="ml-2 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      <div
        id="dropdown"
        className={`absolute z-10 mt-3 w-full list-none items-center divide-y divide-gray-100 rounded bg-white text-base shadow transition-all  ${
          onParentClick.show
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        }`}
      >
        <ul className="py-1" aria-labelledby="dropdownButton">
          {options.map((option, index) => (
            <li
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => {
                onItemSelected(option);
                setOnParentClick({ show: false, selected: option });
              }}
              key={index}
            >
              <div className="block py-2 px-4 text-sm capitalize text-gray-700 hover:bg-gray-100">
                {option}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

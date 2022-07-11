import React from "react";

interface AppProps {
  id: number;
  value: string;
  enabled: boolean;
}

function SortableItem({ id, enabled, value }: AppProps) {
  return (
    <li className="flex cursor-grab list-none items-center justify-between gap-2 rounded py-4 pr-2 hover:bg-gray-100">
      <div className="flex items-end gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
        <span className="font-bold"> {value}</span>
        {/* <span className="text-sm text-gray-700">
          {elementLength} variations
        </span> */}
      </div>
      {/* <Switch
        checked={enabled}
        onChange={() => toggleTrait(value)}
        className={`${
          enabled ? "bg-blue-600" : "bg-gray-200"
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          className={`${
            enabled ? "translate-x-6" : "translate-x-1"
          } pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-100`}
        />
      </Switch> */}
    </li>
  );
}

export default SortableItem;

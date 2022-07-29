import React, { FC, useState } from "react";

interface AppProps {
  color?: string;
  selected?: boolean;
  className?: string;
  value: string | number;
}

const BaseCheckbox: FC<AppProps> = ({
  color = "#000000",
  value,
  selected = false,
  className = "",
}) => {
  const [checked, setChecked] = useState(selected);

  return (
    <div className={`flex items-start gap-2 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 fill-[${color}] ${
          checked && `bg-[${color}] rounded fill-white`
        }`}
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      <span>{value}</span>
    </div>
  );
};

export default BaseCheckbox;

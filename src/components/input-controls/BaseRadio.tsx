import React, { FC } from "react";

interface AppProps {
  className?: string;
  checked?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const BaseRadio: FC<AppProps> = ({ className, onClick, checked, children }) => {
  return (
    <div
      className={`relative flex cursor-pointer flex-wrap items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-all duration-100 hover:bg-gray-50 dark:bg-[color:var(--dark)]  ${
        checked && "border-[#085E7D] text-[#085E7D]"
      } ${className}`}
      onClick={onClick}
    >
      {checked && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-2 right-2 h-5 w-5 fill-[#085E7D]"
          viewBox="0 0 20 20"
          // fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {children}
    </div>
  );
};

export default BaseRadio;

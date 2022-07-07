import React, { useState } from "react";

interface AppProps {
  type?: string;
  inputClass?: string;
  placeholder?: string;
  wrapperClass?: string;
  postfixClass?: string;
  postfix?: React.ReactNode;
}

const BaseInput = ({
  postfix,
  wrapperClass,
  inputClass,
  placeholder,
  type = "text",
  postfixClass,
}: AppProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div
      className={`inline-flex items-center overflow-hidden rounded-md bg-white ring-1 ring-gray-200 ${
        isFocused && "ring-indigo-800"
      } ${wrapperClass}`}
    >
      <input
        className={`flex-1 border-0 outline-none focus:ring-0 ${inputClass}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        type={type}
      />
      <div className={`box-content p-2 ${postfixClass}`}>{postfix}</div>
    </div>
  );
};

export default BaseInput;

import React, { useState } from "react";

interface AppProps {
  type?: string;
  inputClass?: string;
  placeholder?: string;
  wrapperClass?: string;
  postfixClass?: string;
  postfix?: React.ReactNode;
  error?: React.ReactNode | null;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const BaseInput = ({
  error,
  postfix,
  onChange,
  inputClass,
  placeholder,
  wrapperClass,
  postfixClass,
  type = "text",
  ...props
}: AppProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <>
      <div
        className={`inline-flex items-center overflow-hidden rounded-md bg-white ring-1 ring-gray-200 ${
          isFocused && "ring-indigo-800"
        } ${wrapperClass}`}
      >
        <input
          onChange={onChange}
          className={`flex-1 border-0 outline-none focus:ring-0 ${inputClass}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          {...props}
          type={type}
        />
        {postfix && (
          <div className={`box-content p-2 ${postfixClass}`}>{postfix}</div>
        )}
      </div>
      <p className="text-sm text-red-500">{error}</p>
    </>
  );
};

export default BaseInput;

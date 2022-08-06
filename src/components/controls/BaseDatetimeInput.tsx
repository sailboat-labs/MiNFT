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

const BaseDatetimeInput = ({
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

  const date = new Date();

  const month =
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
  const currentDateValue = `${date.getFullYear()}-${month}-${day}`;
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const hour =
    date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const currentTime = `${hour}:${minutes}`;
  const now = `${currentDateValue}T${currentTime}`;
  const dateTomorrow = new Date(Date.now() + 86400 * 1000).toISOString();
  const tomorrow = dateTomorrow.substring(0, 16);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(tomorrow);
  
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
          value={startDate}
        />
        {postfix && (
          <div className={`box-content p-2 ${postfixClass}`}>{postfix}</div>
        )}
      </div>
      <p className="text-sm text-red-500">{error}</p>
    </>
  );
};

export default BaseDatetimeInput;

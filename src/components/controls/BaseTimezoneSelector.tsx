import { useEffect, useState } from "react";
import TimezoneSelect from "react-timezone-select";

interface AppProps {
  type?: string;
  inputClass?: string;
  placeholder?: string;
  wrapperClass?: string;
  postfixClass?: string;
  postfix?: React.ReactNode;
  error?: React.ReactNode | null;
  value?: string;
  defaultValue?: string;
  disabled?: boolean, 
  onChange?: (value: any) => void;
}

const BaseTimezoneSelector = ({ error, onChange, value, defaultValue, disabled, ...props }: AppProps) => {
  //const [timezone, setTimezone] = useState(value ?? '');
  const [timezone, setTimezone] = useState(value ?? "");

  useEffect(() => {
    if (value) {
      setTimezone(value);
    }
  }, [value]);

  useEffect(() => {
    if (onChange && timezone && timezone != value) {
      onChange(timezone);
    }
  }, [timezone, value]);

  return (
    <>
      <TimezoneSelect
        value={timezone}
        onChange={(e) => {
          setTimezone(e.value);
        }}
        placeholder="Select timezone..."
        isDisabled={disabled}
      />
      <p className="text-sm text-red-500">{error}</p>
    </>
  );
};

export default BaseTimezoneSelector;

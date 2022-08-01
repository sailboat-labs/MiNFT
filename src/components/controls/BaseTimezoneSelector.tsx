import { useState } from "react";
import TimezoneSelect from 'react-timezone-select'; 

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

const BaseTimezoneSelector = ({
  error,
  onChange,
  ...props
}: AppProps) => {

  const [timezone, setTimezone ] = useState({})

  return (
    <>
      <TimezoneSelect 
        value={timezone}
        onChange={(e) => {
          setTimezone(e.value)
        }}
        placeholder='Select timezone...'
      />
      <p className="text-sm text-red-500">{error}</p>
    </>
  )
}

export default BaseTimezoneSelector
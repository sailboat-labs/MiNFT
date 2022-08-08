import { Listbox, Transition } from "@headlessui/react";
import React, { FC, Fragment, useState } from "react";

interface SelectOption {
  name: string | number;
  label: string;
}

interface AppProps {
  wrapperClass?: string;
  togglerClass?: string;
  options: SelectOption[];
  // defaultValue?: SelectOption;
  onChange: (value: SelectOption) => void;
}

const CustomSelect: FC<AppProps> = ({
  options,
  onChange,
  wrapperClass,
  // defaultValue,
  togglerClass,
}) => {
  const [selected, setSelected] = useState<SelectOption>(
    options[0] ?? { label: "--select option--", name: "" }
  );

  function handleChange(value: SelectOption) {
    setSelected(value);
    onChange(value);
  }

  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className={`relative mt-1 w-fit ${wrapperClass}`}>
        <Listbox.Button
          className={`relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ${togglerClass}`}
        >
          <span className="block truncate">{selected?.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option, optionIdx) => (
              <Listbox.Option
                key={optionIdx}
                onClick={() => console.log(option)}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 px-4 ${
                    active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.name}
                    </span>
                    {/* {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                      </span>
                    ) : null} */}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default CustomSelect;

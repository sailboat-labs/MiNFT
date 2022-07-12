import React from "react";

import { SelectOption } from "@/interfaces";

import BaseSelect from "../controls/BaseSelect";

interface AppProps {
  title: string | React.ReactNode;
  onChange: (value: any) => void;
  selectOptions: SelectOption[];
}

const ContractStepHeader = ({ title, selectOptions, onChange }: AppProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl text-indigo-800">{title}</h2>
      <div className="flex items-center gap-2">
        <span className="font-medium text-indigo-800">Choose role:</span>
        <div className="min-w-[150px]">
          <BaseSelect options={selectOptions} theme="dark" />
        </div>
      </div>
    </div>
  );
};

export default ContractStepHeader;

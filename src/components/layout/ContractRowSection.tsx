import React, { FC } from "react";

interface AppProps {
  name: string;
  className?: string;
  headingClass?: string;
  children: React.ReactNode;
  subText?: React.ReactNode;
}

const ContractFormRowSection: FC<AppProps> = ({
  name,
  className,
  headingClass,
  subText,
  children,
}) => {
  return (
    <div className={`gap-4 lg:flex ${className}`}>
      <div className="w-[200px]">
        <h4 className={headingClass}>{name}</h4>
        {subText && <p className="text-sm">{subText}</p>}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default ContractFormRowSection;

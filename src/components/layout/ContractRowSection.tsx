import React, { FC } from "react";

interface AppProps {
  name: string;
  children: React.ReactNode;
  className?: string;
  headingClass?: string;
}

const ContractFormRowSection: FC<AppProps> = ({
  name,
  className,
  headingClass,
  children,
}) => {
  return (
    <div className={`gap-12 lg:flex ${className}`}>
      <div className="w-[250px]">
        <h4 className={headingClass}>{name}</h4>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default ContractFormRowSection;

import React, { FC, HTMLAttributes } from "react";

interface AppProps {
  props?: HTMLAttributes<HTMLDivElement>;
}

const NFTPreview: FC<AppProps> = ({ ...props }) => {
  return (
    <div className="bg-[color:var(--bg-indigo)]" {...props}>
      <div>Preview</div>
    </div>
  );
};

export default NFTPreview;

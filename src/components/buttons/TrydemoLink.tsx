import { useState } from "react";

import Demo from "../home/modals/Demo";
interface ContactProps {
  className?: string;
}

const TrydemoLink = ({ className }: ContactProps) => {
  const [showDemo, setShowDemo] = useState<boolean>(false);

  return (
    <>
      <a
        className={`${className} z-30 flex items-center justify-center`}
        onClick={() => setShowDemo(true)}
      >
        Try Demo
      </a>
      <Demo show={showDemo} onClose={() => setShowDemo(false)} />
    </>
  );
};

export default TrydemoLink;

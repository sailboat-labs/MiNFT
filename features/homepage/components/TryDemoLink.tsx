import { useState } from "react";

const TrydemoLink = () => {
  const [showDemo, setShowDemo] = useState<boolean>(false);

  return (
    <>
      <a
        className={`"relative md:px-10" z-30 mt-12 w-fit rounded-xl border border-black bg-transparent px-7 py-4 font-bold text-black transition-all hover:scale-105 hover:cursor-pointer`}
        onClick={() => setShowDemo(true)}
      >
        Watch Demo
      </a>
    </>
  );
};

export default TrydemoLink;

import { useState } from "react";

import RequestDemo from "../home/modals/RequestDemo";

interface ContactProps {
  className?: string;
}

const RequestDemoLink = ({ className }: ContactProps) => {
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <>
      <a
        className={`${className} z-30 flex items-center justify-center`}
        onClick={() => setShowForm(true)}
      >
        Request a Demo
      </a>
      <RequestDemo show={showForm} onClose={() => setShowForm(false)} />
    </>
  );
};

export default RequestDemoLink;

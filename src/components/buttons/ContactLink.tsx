import { useState } from "react";

import Contact from "../home/modals/Contact";

interface ContactProps {
  className?: string;
}

const ContactLink = ({ className }: ContactProps) => {
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <>
      <a
        className={`${className} z-30 flex items-center justify-center`}
        onClick={() => setShowForm(true)}
      >
        Contact Us
      </a>
      <Contact show={showForm} onClose={() => setShowForm(false)} />
    </>
  );
};

export default ContactLink;

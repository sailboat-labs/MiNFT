import { useState } from "react";

import Contact from "../home/modals/RequestDemo";
import UnstyledLink from "../links/UnstyledLink";
interface ContactProps {
  className?: string;
}

const RequestDemoLink = ( { className }: ContactProps) => {

  const [showForm, setShowForm] = useState<boolean>(false)

  return (
    <>
      <a
        className={`${className} flex z-30 items-center justify-center`}
        onClick={() => setShowForm(true)}
      >
        Contact Us
      </a>
      <RequestDemo show={showForm} onClose={() => setShowForm(false)} />
    </>
  )
}

export default RequestDemoLink
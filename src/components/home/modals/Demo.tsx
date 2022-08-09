import { Transition } from "@headlessui/react";
import React, { useEffect } from "react";

interface DemoProps {
  show: boolean;
  onClose: React.MouseEventHandler<HTMLDivElement>;
}

export default function Demo({ show, onClose }: DemoProps) {
  useEffect(() => {
    document.documentElement.style.overflow = show ? "hidden" : "auto";
  }, [show]);

  return (
    <Transition
      show={show}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <section className="fixed inset-0 z-[9999] flex items-center justify-center">
        <div
          id="demo-button"
          className="absolute inset-0 bg-[rgba(0,0,0,0.7)]"
          onClick={onClose}
        ></div>
        <article className="relative z-[9999] mx-4 overflow-hidden lg:flex-row">
          <div className="">
            <iframe
              // width={600}
              // height={500}
              width="871"
              height="490"
              src="https://www.youtube.com/embed/IBXKoUMEWeM?autoplay=1&rel=0"
              title="Magic Mint Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </article>
      </section>
    </Transition>
  );
}

import emailjs from "@emailjs/browser";
import { Transition } from "@headlessui/react";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import ReCaptcha from "react-google-recaptcha";
import * as Yup from "yup";

import Input from "./Input";

interface ContactProps {
  show: boolean;
  onClose: React.MouseEventHandler<HTMLDivElement>;
}

export default function Demo({ show, onClose }: ContactProps) {
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
        <article className="relative z-[9999] mx-4 flex max-w-lg flex-1 flex-col overflow-hidden rounded-lg bg-white text-left lg:flex-row">
          <div className="w-full sm:w-4/5 lg:w-3/5">
            <iframe width="726" height="408" src="https://www.youtube.com/embed/IBXKoUMEWeM" title="Magic Mint Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </article>
      </section>
    </Transition>
  );
}

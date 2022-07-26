import emailjs from "@emailjs/browser";
import { Transition } from "@headlessui/react";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import ReCaptcha from "react-google-recaptcha";
import * as Yup from "yup";

import Input from "./Input";

interface RequestDemoProps {
  show: boolean;
  onClose: React.MouseEventHandler<HTMLDivElement>;
}

export default function RequestDemo({ show, onClose }: RequestDemoProps) {
  useEffect(() => {
    document.documentElement.style.overflow = show ? "hidden" : "auto";
  }, [show]);

  const [captchaChecked, setCaptchaChange] = useState(false);

  const onCaptchaChange = (value: string) => {
    setCaptchaChange(!captchaChecked);
  };

  const validate = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const formRef = useRef();

  const submitForm = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_REQUEST_DEMO,
      formRef.current,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );
    document.getElementById("request-demo-button").click();
  };

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
          id="request-demo-button"
          className="absolute inset-0 bg-[rgba(0,0,0,0.7)]"
          onClick={onClose}
        ></div>
        <article className="relative z-[9999] mx-4 flex max-w-lg flex-1 flex-col overflow-hidden rounded-lg bg-white text-left lg:flex-row">
          <div className="w-full flex-col p-10 text-black sm:w-4/5 lg:w-3/5">
            <h4 className="text-3xl font-bold">Request a demo</h4>
            <div className="flex items-center">
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                }}
                validationSchema={validate}
                onSubmit={submitForm}
              >
                {(formik) => (
                  <form id="contact-form" ref={formRef} onSubmit={submitForm}>
                    <div className="text-gray-200">
                      <Input name="name" type="text" placeholder="Name *" />
                      <Input
                        name="email"
                        type="email"
                        placeholder="Email Address *"
                      />
                    </div>
                    <ReCaptcha
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                      onChange={onCaptchaChange}
                      className="my-6 w-full"
                    />
                    <button
                      type="submit"
                      className="rounded-xl border border-black bg-transparent py-3 px-12 font-dmsans text-lg text-[#1F1A17]"
                    >
                      Request a quote
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </article>
      </section>
    </Transition>
  );
}

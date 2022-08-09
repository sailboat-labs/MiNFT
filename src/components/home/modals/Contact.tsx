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

export default function Contact({ show, onClose }: ContactProps) {
  useEffect(() => {
    document.documentElement.style.overflow = show ? "hidden" : "auto";
  }, [show]);

  const [captchaChecked, setCaptchaChange] = useState(false);

  const onCaptchaChange = () => {
    setCaptchaChange(!captchaChecked);
  };

  const validate = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const formRef = useRef();

  const submitForm = (e: any) => {
    e.preventDefault();

    if (process.env.NEXT_PUBLIC_ENVIRONMENT == "production") {
      emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      alert(
        `Hi ${e.target.name.value}, thank you for contacting Magic Mynt. We will get back to you as soon as possible.`
      );
    } else if (process.env.NEXT_PUBLIC_ENVIRONMENT == "development") {
      alert(
        `Hi ${e.target.name.value}, we have accurately captured your information. However, this project is not in production, hence we will not be sending your form to Magic Mynt.`
      );
    }
    document.getElementById("contact-us")?.click();
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
          id="contact-us"
          className="absolute inset-0 bg-[rgba(0,0,0,0.7)]"
          onClick={onClose}
        ></div>
        <article className="relative z-[9999] mx-4 flex max-w-lg flex-1 flex-col overflow-hidden rounded-lg bg-white text-left md:max-w-3xl lg:max-w-lg lg:flex-row">
          <div className="flex w-full flex-col justify-center px-5 py-10 text-black sm:w-4/5 md:w-3/4 md:p-10 lg:w-3/5">
            <h4 className="mx-auto w-full px-3 text-3xl font-bold md:px-0">
              Contact us
            </h4>
            <div className="mx-auto flex items-center justify-center md:block lg:flex">
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  message: "",
                }}
                validationSchema={validate}
                onSubmit={submitForm}
              >
                {() => (
                  <form id="contact-form" ref={formRef} onSubmit={submitForm}>
                    <div className="text-gray-200">
                      <Input name="name" type="text" placeholder="Name *" />
                      <Input
                        name="email"
                        type="email"
                        placeholder="Email Address *"
                      />
                      <Input
                        name="message"
                        type="text"
                        placeholder="Your message here ..."
                      />
                    </div>
                    <ReCaptcha
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                      onChange={onCaptchaChange}
                      className=" my-4 w-full md:my-6"
                    />
                    <button
                      type="submit"
                      className="rounded-xl border border-black bg-transparent py-3 px-12 font-dmsans text-lg text-[#1F1A17]"
                    >
                      Send Message
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

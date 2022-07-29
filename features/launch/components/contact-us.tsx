import emailjs from "@emailjs/browser";
import { Dialog, Transition } from "@headlessui/react";
import { Input } from "@mui/material";
import { Formik } from "formik";
import { Fragment, useRef, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

export default function ContactUs() {
  const [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [captchaChecked, setCaptchaChange] = useState(false);

  const onCaptchaChange = (value: string) => {
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
    if (
      window.location.href.includes("localhost") ||
      window.location.href.includes("staging")
    ) {
      alert(
        `Hi ${e.target.name.value}, we have accurately captured your information. However, this project is not in production, hence we will not be sending your form to Magic Mynt.`
      );
    } else {
      if (
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
        formRef.current ||
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
        return toast.error("An error occured");

      emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      alert(
        `Hi ${e.target.name.value}, thank you for contacting Magic Mynt. We will get back to you as soon as possible.`
      );
    }
    document.getElementById("contact-us").click();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <section className="fixed inset-0 z-[9999] flex items-center justify-center">
                    <div
                      id="contact-us"
                      className="absolute inset-0 bg-[rgba(0,0,0,0.7)]"
                      onClick={closeModal}
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
                            {(formik) => (
                              <form
                                id="contact-form"
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                ref={formRef}
                                onSubmit={submitForm}
                              >
                                <div className="text-gray-200">
                                  <Input
                                    name="name"
                                    type="text"
                                    placeholder="Name *"
                                  />
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
                                  sitekey={
                                    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
                                  }
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

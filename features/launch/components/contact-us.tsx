import emailjs from "@emailjs/browser";
import { Dialog, Transition } from "@headlessui/react";
import { Formik } from "formik";
import { Fragment, useRef, useState } from "react";
import ReCaptcha from "react-google-recaptcha";
import toast from "react-hot-toast";
import * as Yup from "yup";

export default function ContactUs() {
  const [isOpen, setIsOpen] = useState(false);

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
    closeModal();
  };

  return (
    <>
      <div onClick={openModal} className="cursor-pointer sm:mr-10 lg:mr-14">
        Contact us
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
                <Dialog.Panel className="flex h-fit w-fit transform flex-col overflow-hidden rounded-2xl bg-white p-6 pr-20 text-left align-middle shadow-xl transition-all">
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
                      onSubmit={() => {
                        //
                      }}
                    >
                      {(formik) => (
                        <form
                          id="contact-form"
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          ref={formRef}
                          onSubmit={submitForm}
                        >
                          <div className="mt-20 flex flex-col gap-10 text-gray-200">
                            <input
                              className="rounded-lg"
                              name="name"
                              type="text"
                              placeholder="Name *"
                            />
                            <input
                              className="rounded-lg"
                              name="email"
                              type="email"
                              placeholder="Email Address *"
                            />
                            <input
                              className="rounded-lg"
                              name="message"
                              type="text"
                              placeholder="Your message here ..."
                            />
                          </div>
                          <ReCaptcha
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                            onChange={onCaptchaChange}
                            className=" my-4 mt-10 w-full md:my-6"
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

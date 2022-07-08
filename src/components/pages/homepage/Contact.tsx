import { Form, Formik } from "formik";
import * as Yup from "yup";

import Input from "./Input";

const Contact = () => {
  // const captchaRef = useRef(null);
  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   const token = captchaRef.current.getValue();
  //   captchaRef.current.reset();
  //   console.log(token);
  // };

  const validate = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email address is required"),
    message: Yup.string().required("Please enter your message."),
  });

  return (
    <section id="contact">
      <div className="mx-auto w-4/5 pt-10 pb-20 font-montserrat text-white sm:py-20 lg:w-3/4 lg:pb-28">
        <h1 className="text-5xl font-medium lg:text-6xl ">Contact Us</h1>
        <div>
          <Formik
            initialValues={{
              name: "",
              email: "",
              message: "",
            }}
            validationSchema={validate}
            onSubmit={(values) => {
              alert(values.name + " " + values.email + " " + values.message);
            }}
          >
            {(formik) => (
              <Form className="text-gray-800">
                <div className="py-5">
                  <Input
                    name="name"
                    label="Name"
                    type="text"
                    placeholder="Name"
                    className="w-full rounded-lg lg:w-96 "
                  />
                  <Input
                    name="email"
                    label="Email Address"
                    type="email"
                    placeholder="Email Address"
                    className="w-full rounded-lg lg:w-96 "
                  />
                  <Input
                    name="message"
                    label="Your Message"
                    type="text"
                    placeholder="Your message"
                    className="h-48 w-full rounded-lg lg:w-1/2"
                  />
                </div>
                {/* <div className="mb-10">
                  <RECAPTCHA
                    ref={captchaRef}
                    sitekey=""
                  />
                </div> */}
                <div className="flex w-72 flex-row justify-between sm:w-80">
                  <button
                    type="submit"
                    className="rounded-lg border-2 border-indigo-800 bg-indigo-800 py-3 px-5 font-semibold text-white"
                  >
                    Send Message
                  </button>
                  <button
                    type="reset"
                    className="rounded-lg border-2 border-red-500 py-3 px-5 text-white"
                  >
                    Clear form
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default Contact;

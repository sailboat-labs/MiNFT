import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import Input from "./Input";

export default function Contact() {
  const [heading, setHeading] = useState("Join the Bloody Bastards");

  const changeHeading = (e: any) => {
    e.preventDefault();
    setHeading(e.target.value);
  };

  const validate = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    discordUsername: Yup.string().required("Discord username required"),
    ETHaddress: Yup.string().required("ETH address required"),
  });

  return (
    <div>
      <div className="w-4/5 mx-auto flex flex-col items-center pt-40 pb-28 text-white lg:flex-row">
        <div className="w-full lg:w-3/5">
          <textarea
            rows={3}
            id="contact-heading"
            value={heading}
            onChange={changeHeading}
            onBlur={changeHeading}
            className="w-full resize-none overflow-hidden whitespace-normal border-0 bg-transparent font-serif text-6xl font-bold italic md:text-9xl lg:text-center"
          />
        </div>
        <div className="flex items-center lg:ml-10">
          <Formik
            initialValues={{
              email: "",
              discordUsername: "",
              ETHaddress: "",
            }}
            validationSchema={validate}
            onSubmit={(values) => console.log(values)}
          >
            {(formik) => (
              <Form>
                <div className="text-gray-200">
                  <Input name="email" type="email" placeholder="Email *" />
                  <Input
                    name="discordUsername"
                    type="text"
                    placeholder="Discord username *"
                  />
                  <Input
                    name="ETHaddress"
                    type="text"
                    placeholder="ETH public address *"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-8 rounded-xl bg-[#006C35] py-5 px-12 text-xl"
                >
                  Reserve your Chutiya
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

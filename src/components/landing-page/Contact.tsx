import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import Input from "./Input";

export default function Contact() {
  const [heading, setHeading] = useState("Join the Royal Saudis");

  const changeHeading = (e: any) => {
    e.preventDefault();
    setHeading(e.target.value);
  };

  const validate = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    discordUsername: Yup.string().required("Discord username required"),
    ETHaddress: Yup.string().required("ETH address required"),
  });

  return (
    <div>
      <div className="flex pt-40 pb-28 text-white w-3/4 mx-auto ">
        <div className='w-1/2'>
          <textarea
            rows={3}
            id="contact-heading"
            value={heading}
            onChange={changeHeading}
            onBlur={changeHeading}
            className="w-full resize-none overflow-hidden whitespace-normal border-0 bg-transparent text-center font-serif text-9xl font-bold italic"
          />
        </div>
        <div className="flex items-center ml-16">
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
                  <Input name='email' type="email" placeholder="Email *"/>
                  <Input name='discordUsername' type="text" placeholder="Discord username *" />
                  <Input name='ETHaddress' type="text" placeholder="ETH public address *" />
                </div>
                <button type="submit" className="bg-[#006C35] py-5 px-12 mt-8 rounded-xl">
                  Reserve your Sheikh
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

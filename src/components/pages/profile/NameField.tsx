import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMoralis } from "react-moralis";
import * as Yup from "yup";

import { User } from "@/types";
import Web3 from "web3";

type props = {
  name?: string;
};

export default function ProfileName({ name }: props) {
  const { account } = useMoralis();

 

  const formInitialValues = {
    name: name,
  };

  const formValidationSchema = Yup.object().shape({
    name: Yup.string().trim().lowercase(),
  });
  

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={formValidationSchema}
      onSubmit={(values, { setSubmitting }) => {null}}
    >
      <Form className="mt-5 flex items-center gap-2">
        <Field
          name="name"
          disabled={true}
          placeholder="Verify ENS"
          className="w-52  rounded-md border-2 bg-gray-50 text-center text-xl font-bold disabled:border-0 disabled:bg-white"
        />
        
      </Form>
    </Formik>
  );
}

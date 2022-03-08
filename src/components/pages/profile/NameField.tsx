/* eslint-disable unused-imports/no-unused-vars */
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

type props = {
  name?: string;
};

export default function ProfileName({ name }: props) {
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
      onSubmit={(_values, { setSubmitting }) => {
        null;
      }}
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

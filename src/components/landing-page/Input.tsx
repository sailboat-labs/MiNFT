import { ErrorMessage, useField } from "formik";
import React from "react";

export default function Input({ label = "none", ...props }) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [field, meta] = useField(props);

  return (
    <div className="mt-6 flex flex-col rounded-xl text-gray-200 ">
      <input
        id="contact-input"
        className={`w-[20rem] rounded-xl border-0 bg-orange-300 px-5 py-6 font-dmsans text-gray-300 md:w-[30rem] ${
          meta.touched && meta.error && "is-invalid"
        }`}
        {...field}
        {...props}
      />
      <ErrorMessage
        component="div"
        name={field.name}
        className="pt-1 font-dmsans text-black"
      />
    </div>
  );
}

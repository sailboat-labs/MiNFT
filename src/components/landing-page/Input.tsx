import { ErrorMessage, useField } from "formik";
import React from "react";

export default function Input({ label = "none", ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="mt-6 flex flex-col rounded-xl text-gray-200 ">
      <input
        id="contact-input"
        className={`w-[30rem] rounded-xl border-0 bg-[#595959] px-5 py-6 font-dmsans text-gray-300 ${
          meta.touched && meta.error && "is-invalid"
        }`}
        {...field}
        {...props}
      />
      <ErrorMessage
        component="div"
        name={field.name}
        className="pt-1 text-red-500 font-dmsans"
      />
    </div>
  );
}

import { ErrorMessage, useField } from "formik";
import React from "react";

export default function Input({ label = "none", ...props }) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [field, meta] = useField(props);

  return (
    <div className="mt-6 flex flex-col rounded-xl ">
      {field.name == "message" ? (
        <textarea
          id="contact-input"
          className={`h-32 md:h-40 w-[20rem] resize-none rounded-xl border border-gray-300 py-2 px-4 font-dmsans text-[#1F1A17] md:w-[28rem] lg:w-[25rem] lg:py-3 lg:px-5 ${
            meta.touched && meta.error && "is-invalid"
          }`}
          {...field}
          {...props}
        />
      ) : (
        <input
          id="contact-input"
          className={`w-[20rem] rounded-xl border border-gray-300 py-2 px-4 font-dmsans text-[#1F1A17] md:w-[28rem] lg:w-[25rem] lg:py-3 lg:px-5 ${
            meta.touched && meta.error && "is-invalid"
          }`}
          {...field}
          {...props}
        />
      )}
      <ErrorMessage
        component="div"
        name={field.name}
        className="pt-1 font-dmsans text-sm text-red-500"
      />
    </div>
  );
}

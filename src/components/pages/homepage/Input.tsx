import { ErrorMessage, useField } from "formik";
import React from "react";

export default function Input({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="my-5 flex flex-col">
      <label htmlFor={field.name + ' *'} className="mb-2 font-medium text-indigo-200 required">
        {label}
      </label>
      {field.name == "message" ? (
        <textarea
          id="contact-input"
          className={`text-gray-700 ${
            meta.touched && meta.error && "is-invalid"
          }`}
          {...field}
          {...props}
        />
      ) : (
        <input
          id="contact-input"
          className={`text-gray-700 ${
            meta.touched && meta.error && "is-invalid"
          }`}
          {...field}
          {...props}
        />
      )}

      <ErrorMessage
        component="div"
        name={field.name}
        className="pt-1 font-medium text-red-600"
      />
    </div>
  );
}

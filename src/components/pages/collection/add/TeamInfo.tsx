import { ErrorMessage, Field } from "formik";

export default function TeamInfo() {
  return (
    <div className="mt-10 flex items-center">
      <div className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
        Team Info
      </div>
      <Field
        as="textarea"
        className="mx-6 min-h-[120px] w-full rounded-lg border-2"
        placeholder="Team Info"
        name="teamInfo"
      />
      <div className="text-red-500">
        <ErrorMessage name="teamInfo" component="div" />
      </div>
    </div>
  );
}
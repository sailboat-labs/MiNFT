import { ErrorMessage, Field } from "formik";

export default function WhyILikeProject() {
  return (
    <div className="mt-5 flex items-center">
      <div className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
        Why do you like this project
      </div>
      <div className="mx-6 flex w-full flex-col">
        <Field
          as="textarea"
          className=" min-h-[150px] w-full rounded-lg border-2"
          placeholder="Why do you like this project"
          name="whyILikeProject"
        />
        <div className="text-red-500">
          <ErrorMessage name="whyILikeProject" component="div" />
        </div>
      </div>
    </div>
  );
}

import { ErrorMessage, Field } from "formik";

export default function CollectionDescription() {
  return (
    <div className="mt-5 flex">
      <div className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 dark:text-gray-200 ">
        Description
      </div>
      <div className="mx-6 flex w-full flex-col">
        <Field
          as="textarea"
          className=" min-h-[150px] w-full rounded-lg border-2 dark:bg-black dark:text-white"
          placeholder="Collection Description"
          name="description"
        />
        <div className="text-red-500">
          <ErrorMessage name="description" component="div" />
        </div>
      </div>
    </div>
  );
}
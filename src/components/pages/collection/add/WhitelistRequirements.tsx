import { ErrorMessage, Field } from "formik";

export default function WhitelistRequirements() {
  return (
    <div className="mt-10 flex w-full items-center ">
      <div className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 dark:text-gray-200 ">
        Whitelist requirements
      </div>
      <div className="w-full whitespace-nowrap py-2 px-6 text-sm text-gray-500">
        <Field
          as="textarea"
          className=" min-h-[120px] w-full rounded-lg border-2"
          placeholder="whitelist requirements"
          name="whitelistRequirements"
        />
        <div className="text-red-500">
          <ErrorMessage name="whitelistRequirements" component="div" />
        </div>
      </div>
    </div>
  );
}

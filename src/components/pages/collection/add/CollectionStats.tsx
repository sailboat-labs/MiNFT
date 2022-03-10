import { ErrorMessage, Field } from "formik";

import Dropdown from "@/components/shared/dropdown";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CollectionStats(props: any) {
  return (
    <div className="mt-10 grid grid-cols-1 items-start md:grid-cols-2 ">
      <table className="w-full">
        <tbody>
          <tr className=" ">
            <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 dark:text-gray-200 ">
              Pre-sale Mint cost
            </td>
            <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
              <Field
                type="number"
                className="default-input w-full "
                placeholder="Pre-sale mint cost"
                name="preSaleCost"
              />
              <div className="text-red-500">
                <ErrorMessage name="preSaleCost" component="div" />
              </div>
            </td>
          </tr>
          <tr className=" ">
            <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 dark:text-gray-200 ">
              Public Mint cost
            </td>
            <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
              <Field
                type="number"
                className="default-input w-full "
                placeholder="public mint cost"
                name="publicMintCost"
              />
              <div className="text-red-500">
                <ErrorMessage name="publicMintCost" component="div" />
              </div>
            </td>
          </tr>

          <tr className=" ">
            <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 dark:text-gray-200 ">
              Mints per Presale
            </td>
            <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
              <Field
                type="number"
                className="default-input w-full "
                placeholder="Mints per Presale"
                name="mintsPerPresale"
              />
              <div className="text-red-500">
                <ErrorMessage name="mintsPerPresale" component="div" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="w-full">
        <tbody>
          <tr className=" ">
            <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 dark:text-gray-200 ">
              Whitelist Available
            </td>
            <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
              <Dropdown
                initial={props.whitelistAvailable}
                onItemSelected={props.setWhitelistAvailable}
                options={["yes", "no"]}
                className="w-full "
              />
            </td>
          </tr>
          <tr className=" ">
            <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 dark:text-gray-200 ">
              Supply
            </td>
            <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
              <Field
                type="number"
                className="default-input w-full "
                placeholder="supply"
                name="supply"
              />
              <div className="text-red-500">
                <ErrorMessage name="supply" component="div" />
              </div>
            </td>
          </tr>
          <tr className=" ">
            <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 dark:text-gray-200 ">
              Mints per Transaction
            </td>
            <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
              <Field
                type="number"
                className="default-input w-full "
                placeholder="Mints per Transaction"
                name="mintsPerTx"
              />
              <div className="text-red-500">
                <ErrorMessage name="mintsPerTx" component="div" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

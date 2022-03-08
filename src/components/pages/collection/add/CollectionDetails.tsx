import { ErrorMessage, Field } from "formik";

import { blockchains } from "@/data/blockchains";
import { categories } from "@/data/categories";

import ImageUpload from "@/components/collection/ImageUpload";
import Dropdown from "@/components/shared/dropdown";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CollectionDetails(props: any) {
  return (
    <div className="mt-10 flex flex-col md:flex-row">
      <div className="h-72 flex-1 ">
        <div className="overflow-hidden sm:rounded-lg">
          <table className="w-full">
            <tbody>
              <tr className="bg-white ">
                <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                  Collection Name
                </td>
                <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                  <Field
                    name="name"
                    className="default-input w-full"
                    placeholder="Collection"
                  />
                  <div className="text-red-500">
                    <ErrorMessage name="name" component="div" />
                  </div>
                </td>
              </tr>
              <tr className="bg-white ">
                <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                  Blockchain
                </td>
                <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                  <Dropdown
                    initial={props.selectedBlockchain}
                    onItemSelected={props.setSelectedBlockchain}
                    options={blockchains}
                    className="w-full "
                  />
                </td>
              </tr>
              <tr className="bg-white ">
                <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                  Collection Image
                </td>
                <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                  <ImageUpload
                    setImageUrl={props.setImageUrl}
                    imageUrl={props.imageUrl}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex-1">
        <div className="sm:rounded-lg">
          <table className="w-full">
            <tbody>
              <tr className="w-full bg-white">
                <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                  Project Type
                </td>
                <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                  <Dropdown
                    initial={props.selectedProjectType}
                    onItemSelected={props.setSelectedProjectType}
                    options={categories}
                    className="w-full"
                  />
                </td>
              </tr>
              <tr className="bg-white ">
                <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                  Website
                </td>
                <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                  <Field
                    name="website"
                    className="default-input w-full"
                    placeholder="Website"
                  />
                  <div className="text-red-500">
                    <ErrorMessage name="website" component="div" />
                  </div>
                </td>
              </tr>
              <tr className="bg-white ">
                <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                  Twitter handle
                </td>
                <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                  <Field
                    name="twitter" // type="text"
                    className="default-input w-full"
                    placeholder="Twitter"
                  />
                  <div className="text-red-500">
                    <ErrorMessage name="twitter" component="div" />
                  </div>
                </td>
              </tr>
              <tr className="bg-white ">
                <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                  Discord
                </td>
                <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                  <Field
                    name="discord" // type="text"
                    className="default-input w-full"
                    placeholder="Discord"
                  />
                  <div className="text-red-500">
                    <ErrorMessage name="discord" component="div" />
                  </div>
                </td>
              </tr>
              <tr className="bg-white ">
                <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                  Etherscan
                </td>
                <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                  <Field // type="text"
                    className="default-input w-full"
                    placeholder="Etherscan"
                    name="etherscan"
                  />
                  <div className="text-red-500">
                    <ErrorMessage name="etherscan" component="div" />
                  </div>
                </td>
              </tr>
              <tr className="bg-white ">
                <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                  Opensea
                </td>
                <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                  <Field // type="text"
                    className="default-input w-full"
                    placeholder="Opensea"
                    name="opensea"
                  />
                  <div className="text-red-500">
                    <ErrorMessage name="opensea" component="div" />
                  </div>
                </td>
              </tr>
              <tr className="bg-white ">
                <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                  Whitepaper
                </td>
                <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                  <Field // type="text"
                    className="default-input w-full"
                    placeholder="Whitepaper"
                    name="whitepaper"
                  />
                  <div className="text-red-500">
                    <ErrorMessage name="whitepaper" component="div" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

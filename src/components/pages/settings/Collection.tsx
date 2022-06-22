import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

const CollectionSettings = () => {
  const formik: any = useFormik({
    initialValues: {
      name: "",
      family: "",
      symbol: "",
      supply: 0,
      link: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter collection name"),
      family: Yup.string().optional(),
      symbol: Yup.string().required("symbol is required"),
      supply: Yup.number().required("supply is required"),
      link: Yup.string().optional(),
      description: Yup.string().required("enter description"),
    }),
    onSubmit(values, formik) {
      console.log("submitting", values);
    },
  });
  /**
   *
   * @param {string} fieldName - field in form to check
   * @returns {boolean} - true or false
   */
  // function hasError(fieldName: string) {
  //   return formik.touched[fieldName] && formik.errors[fieldName];
  // }

  return (
    <div className="py-12">
      <h4>Collection</h4>
      <p>Metadata for this collection of NFTs</p>
      <form action="#" className="mt-6" onSubmit={formik.handleSubmit}>
        <div className="mt-6 grid grid-cols-2 items-start gap-6">
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              className="flex-1 rounded-lg"
              {...formik.getFieldProps("name")}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="familiy">
              Family
            </label>
            <input
              placeholder="(optional)"
              type="text"
              className="flex-1 rounded-lg"
              {...formik.getFieldProps("family")}
            />
            <p className="mt-2 text-sm">
              Optional name for a group of collections.
            </p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 items-start gap-6">
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="symbol">
              Symbol
            </label>
            <input
              type="text"
              className="flex-1 rounded-lg"
              {...formik.getFieldProps("symbol")}
            />
            <p className="mt-2 text-sm">Exchange symbol (e.g SNEK)</p>
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="supply">
              Supply
            </label>
            <input
              type="number"
              className="flex-1 rounded-lg"
              {...formik.getFieldProps("supply")}
            />
            <p className="mt-2 text-sm">Number of tokens to generate.</p>
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <label className="mb-2 font-medium" htmlFor="external url">
            External URL
          </label>
          <input
            type="text"
            placeholder="(optional)"
            className="flex-1 rounded-lg"
            {...formik.getFieldProps("link")}
          />
          <p className="mt-2 text-sm">
            Link to the website for this collection.
          </p>
        </div>
        <div className="mt-6 flex flex-col">
          <label className="mb-2 font-medium" htmlFor="description">
            Description
          </label>
          <textarea
            rows={6}
            placeholder="Enter description"
            className="flex-1 rounded-lg"
            {...formik.getFieldProps("description")}
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default CollectionSettings;

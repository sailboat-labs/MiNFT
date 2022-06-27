import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getConfiguration } from "redux/reducers/selectors/settings";
import { setConfiguration } from "redux/reducers/slices/configuration";
import * as Yup from "yup";

const CollectionSettings = () => {
  const dispatch = useDispatch();
  const configuration = useSelector(getConfiguration);
  // console.log(configuration);

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
              defaultValue={configuration.name}
              onChange={(e) => {
                dispatch(
                  setConfiguration({ key: "name", value: e.target.value })
                );
              }}
              type="text"
              className="flex-1 rounded-lg"
              // {...formik.getFieldProps("name")}
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
              defaultValue={configuration.family}
              onChange={(e) => {
                dispatch(
                  setConfiguration({ key: "family", value: e.target.value })
                );
              }}
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
              defaultValue={configuration.symbol}
              className="flex-1 rounded-lg"
              onChange={(e) => {
                dispatch(
                  setConfiguration({ key: "symbol", value: e.target.value })
                );
              }}
            />
            <p className="mt-2 text-sm">Exchange symbol (e.g SNEK)</p>
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="supply">
              Supply
            </label>
            <input
              defaultValue={configuration.supply}
              type="number"
              className="flex-1 rounded-lg"
              onChange={(e) => {
                dispatch(
                  setConfiguration({ key: "supply", value: e.target.value })
                );
              }}
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
            defaultValue={configuration.externalLink}
            onChange={(e) => {
              dispatch(
                setConfiguration({ key: "externalLink", value: e.target.value })
              );
            }}
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
            defaultValue={configuration.description}
            onChange={(e) => {
              dispatch(
                setConfiguration({ key: "description", value: e.target.value })
              );
            }}
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default CollectionSettings;

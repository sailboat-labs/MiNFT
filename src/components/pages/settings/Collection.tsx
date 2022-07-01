import { useFormik } from "formik";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getConfiguration } from "redux/reducers/selectors/configuration";
import { getLayers } from "redux/reducers/selectors/layers";
import { setConfiguration } from "redux/reducers/slices/configuration";
import * as Yup from "yup";

import { enumNFTGenConfig } from "@/enums/nft-gen-configurations";
import { ILayer } from "@/interfaces";

const CollectionSettings = () => {
  const dispatch = useDispatch();
  const configuration = useSelector(getConfiguration);
  // console.log(configuration);
  const layers = useSelector(getLayers) as ILayer[];

  function setMaximumSupply() {
    let maxSupply = 1;
    for (let i = 0; i < layers.length; i++) {
      if (layers[i].elements.length > 0) {
        maxSupply *= layers[i].elements.length;
      }
    }
    dispatch(
      setConfiguration({ key: enumNFTGenConfig.SUPPLY, value: maxSupply })
    );
  }

  function getMaximumSupply() {
    let maxSupply = 1;
    for (let i = 0; i < layers.length; i++) {
      if (layers[i].elements?.length > 0) {
        maxSupply *= layers[i].elements.length;
      }
    }
    return maxSupply;
  }

  function handleSupplyChange(supply: number) {
    if (supply < 0) return;
    if (supply > getMaximumSupply()) {
      toast.dismiss();
      toast.error(`Maximum supply is ${getMaximumSupply()}`);
      dispatch(
        setConfiguration({
          key: "supply",
          value: getMaximumSupply(),
        })
      );
    } else {
      dispatch(setConfiguration({ key: "supply", value: supply }));
    }
  }

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

  useEffect(() => {
    if (getMaximumSupply() < configuration.supply) {
      setMaximumSupply();
    }
  }, [layers]);

  return (
    <div className="pt-12">
      <h4>Collection</h4>
      <p>Metadata for this collection of NFTs</p>
      <form action="#" className="mt-6" onSubmit={formik.handleSubmit}>
        <div className="mt-6 grid grid-cols-2 items-start gap-6">
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="name">
              Name
            </label>
            <input
              defaultValue={configuration[enumNFTGenConfig.NAME]}
              onChange={(e) => {
                dispatch(
                  setConfiguration({
                    key: enumNFTGenConfig.NAME,
                    value: e.target.value,
                  })
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
              defaultValue={configuration[enumNFTGenConfig.FAMILY]}
              onChange={(e) => {
                dispatch(
                  setConfiguration({
                    key: enumNFTGenConfig.FAMILY,
                    value: e.target.value,
                  })
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
              defaultValue={configuration[enumNFTGenConfig.SYMBOL]}
              className="flex-1 rounded-lg"
              onChange={(e) => {
                dispatch(
                  setConfiguration({
                    key: enumNFTGenConfig.SYMBOL,
                    value: e.target.value,
                  })
                );
              }}
            />
            <p className="mt-2 text-sm">Exchange symbol (e.g SNEK)</p>
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="supply">
              Supply{" "}
              <span className="text-xs text-gray-500">
                Max: {getMaximumSupply()}
              </span>
            </label>
            <div className="flex items-center gap-3">
              <input
                defaultValue={configuration[enumNFTGenConfig.SUPPLY]}
                value={configuration.supply}
                type="number"
                className="flex-1 rounded-lg"
                onChange={(e) => {
                  handleSupplyChange(parseInt(e.target.value));
                }}
              />
              <div
                className="gradient-button"
                onClick={() => {
                  setMaximumSupply();
                }}
              >
                Max
              </div>
            </div>
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
            defaultValue={configuration[enumNFTGenConfig.BASE_URL]}
            onChange={(e) => {
              dispatch(
                setConfiguration({
                  key: enumNFTGenConfig.BASE_URL,
                  value: e.target.value,
                })
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
            defaultValue={configuration[enumNFTGenConfig.DESCRIPTION]}
            onChange={(e) => {
              dispatch(
                setConfiguration({
                  key: enumNFTGenConfig.DESCRIPTION,
                  value: e.target.value,
                })
              );
            }}
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default CollectionSettings;

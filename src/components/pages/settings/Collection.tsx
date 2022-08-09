import saveInformationToFirebase from "features/traitmixer/utils/save-information";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getLayers } from "redux/reducers/selectors/layers";
import { getProjectState } from "redux/reducers/selectors/project";
import { setConfiguration } from "redux/reducers/slices/configuration";
import { resetElementCounts } from "redux/reducers/slices/layers";
import * as Yup from "yup";

import { enumNFTGenConfig } from "@/enums/nft-gen-configurations";
import { ILayer, IProject } from "@/interfaces";

const CollectionSettings = () => {
  const dispatch = useDispatch();
  // console.log(configuration);
  const layers = useSelector(getLayers) as ILayer[];
  const project = useSelector(getProjectState) as IProject;
  const router = useRouter();
  function setMaximumSupply() {
    let maxSupply = 1;
    for (let i = 0; i < layers.length; i++) {
      if (layers[i].elements.length > 0) {
        maxSupply *= layers[i].elements.length;
      }
    }
    handleUpdateProjectInformation("tokenSupply", maxSupply);
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
      dispatch(resetElementCounts(getMaximumSupply()));
    } else {
      dispatch(setConfiguration({ key: "supply", value: supply }));
      dispatch(resetElementCounts(supply));
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

  // useEffect(() => {
  //   if (getMaximumSupply() < configuration.supply) {
  //     setMaximumSupply();
  //   }
  // }, [layers]);

  function handleUpdateProjectInformation(field: string, value: any) {
    saveInformationToFirebase(project, field, value);
  }

  return (
    <div className="pt-12">
      <div className="mt-10 mb-5 flex items-center gap-5">
        <div className="text-xl text-indigo-500">Collection</div>
        <div className=" flex-1 rounded-lg border "></div>
      </div>
      <p>Metadata for this collection of NFTs</p>
      <form action="#" className="mt-6" onSubmit={formik.handleSubmit}>
        <div className="mt-6 grid grid-cols-2 items-start gap-6">
          <div className="flex flex-col">
            <label className="mb-2 font-medium dark:text-white" htmlFor="name">
              Name
            </label>
            <input
              defaultValue={project.projectName}
              onChange={(e) => {
                dispatch(
                  setConfiguration({
                    key: enumNFTGenConfig.NAME,
                    value: e.target.value,
                  })
                );
                handleUpdateProjectInformation("projectName", e.target.value);
              }}
              type="text"
              className="flex-1 rounded-lg dark:bg-[rgba(255,255,255,0.02)] dark:text-gray-300"
              // {...formik.getFieldProps("name")}
            />
          </div>
          <div className="flex flex-col">
            <label
              className="mb-2 font-medium dark:text-white"
              htmlFor="familiy"
            >
              Family
            </label>
            <input
              placeholder="(optional)"
              type="text"
              className="flex-1 rounded-lg dark:bg-[rgba(255,255,255,0.02)] dark:text-gray-300"
              defaultValue={project.family}
              onChange={(e) => {
                dispatch(
                  setConfiguration({
                    key: enumNFTGenConfig.FAMILY,
                    value: e.target.value,
                  })
                );
                handleUpdateProjectInformation("family", e.target.value);
              }}
            />
            <p className="mt-2 text-sm">
              Optional name for a group of collections.
            </p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 items-start gap-6">
          <div className="flex flex-col">
            <label
              className="mb-2 font-medium dark:text-white"
              htmlFor="symbol"
            >
              Symbol
            </label>
            <input
              type="text"
              defaultValue={project.symbol}
              className="flex-1 rounded-lg dark:bg-[rgba(255,255,255,0.02)] dark:text-gray-300"
              onChange={(e) => {
                dispatch(
                  setConfiguration({
                    key: enumNFTGenConfig.SYMBOL,
                    value: e.target.value,
                  })
                );
                handleUpdateProjectInformation("symbol", e.target.value);
              }}
            />
            <p className="mt-2 text-sm">Exchange symbol (e.g NZMX)</p>
          </div>
          <div className="flex flex-col">
            <label
              className="mb-2 font-medium dark:text-white"
              htmlFor="supply"
            >
              Supply{" "}
              <span className="text-xs text-gray-500">
                Max: {getMaximumSupply()}
              </span>
            </label>
            <div className="flex items-center gap-3">
              <input
                defaultValue={project.tokenSupply}
                // value={configuration.supply}
                type="number"
                className="flex-1 rounded-lg dark:bg-[rgba(255,255,255,0.02)] dark:text-gray-300"
                onChange={(e) => {
                  handleSupplyChange(parseInt(e.target.value));
                  handleUpdateProjectInformation("tokenSupply", e.target.value);
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
          <label
            className="mb-2 font-medium dark:text-white"
            htmlFor="external url"
          >
            External URL
          </label>
          <input
            type="text"
            placeholder="External URL"
            className="flex-1 rounded-lg dark:bg-[rgba(255,255,255,0.02)] dark:text-gray-300"
            defaultValue={project.baseUrl}
            onChange={(e) => {
              dispatch(
                setConfiguration({
                  key: enumNFTGenConfig.BASE_URL,
                  value: e.target.value,
                })
              );
              handleUpdateProjectInformation("baseURL", e.target.value);
            }}
          />
          <p className="mt-2 text-sm">
            Link to the website for this collection.
          </p>
        </div>
        <div className="mt-6 flex flex-col">
          <label
            className="mb-2 font-medium dark:text-white"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            rows={6}
            placeholder="Enter description"
            className="flex-1 rounded-lg dark:bg-[rgba(255,255,255,0.02)] dark:text-gray-300"
            defaultValue={project.description}
            onChange={(e) => {
              dispatch(
                setConfiguration({
                  key: enumNFTGenConfig.DESCRIPTION,
                  value: e.target.value,
                })
              );
              handleUpdateProjectInformation("description", e.target.value);
            }}
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default CollectionSettings;

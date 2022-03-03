import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { v4 } from "uuid";
import * as Yup from "yup";

import { blockchains } from "@/data/blockchains";
import { categories } from "@/data/categories";
import { yesno } from "@/data/yesno";

import ImageUpload from "@/components/collection/ImageUpload";
import Layout from "@/components/layout/Layout";
import Dropdown from "@/components/shared/dropdown";

import { Collection } from "@/types";

interface IAddCollectionProps {
  collection?: Collection;
}

export default function AddCollection({ collection }: IAddCollectionProps) {
  const [selectedProjectType, setSelectedProjectType] = useState<string>();
  const [whitelistAvailable, setWhitelistAvailable] = useState<string>();
  const [selectedBlockchain, setSelectedBlockchain] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string>();

  const [presaleMintDateTime, setPresaleMintDateTime] = useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );

  const [publicMintDateTime, setPublicMintDateTime] = useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );

  const handlePresaleMintDateTimeChange = (newValue: Date | null) => {
    setPresaleMintDateTime(newValue);
  };

  const handlePublicMintDateTimeChange = (newValue: Date | null) => {
    setPublicMintDateTime(newValue);
  };

  const collectionForm = useFormik({
    initialValues: {
      name: collection?.name,
      website: collection?.website,
      twitter: collection?.twitter,
      discord: collection?.discord,
      etherscan: collection?.etherscan,
      opensea: collection?.opensea,
      description: collection?.description,
      preMintDate: collection?.preMintDate,
      publicMintDate: collection?.publicMintDate,
      preSaleCost: collection?.preSaleCost,
      publicMintCost: collection?.publicMintCost,
      supply: collection?.supply,
      whitelistAvailable: collection?.whitelistAvailable,
      whitelistRequirements: collection?.whitelistRequirements,
      teamInfo: collection?.teamInfo,
    },
    validationSchema: Yup.object({
      name: Yup.string(),
      website: Yup.string(),
      twitter: Yup.string(),
      discord: Yup.string(),
      etherscan: Yup.string(),
      opensea: Yup.string(),
      description: Yup.string(),
      preMintDate: Yup.string(),
      publicMintDate: Yup.string(),
      preSaleCost: Yup.string(),
      publicMintCost: Yup.string(),
      supply: Yup.string(),
      whitelistAvailable: Yup.string(),
      whitelistRequirements: Yup.string(),
      teamInfo: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        collectionForm.setSubmitting(true);
        const timestamp = new Date().toISOString();
        const _collection: Collection = {
          id: collection?.id ?? v4(),
          name: values.name,
          blockchain: selectedBlockchain,
          projectType: selectedProjectType,
          website: values.website,
          twitter: values.twitter,
          discord: values.discord,
          etherscan: values.etherscan,
          opensea: values.opensea,
          description: values.description,
          preMintDate: values.preMintDate,
          publicMintDate: values.publicMintDate,
          preSaleCost: values.preSaleCost,
          publicMintCost: values.publicMintCost,
          supply: values.supply,
          whitelistAvailable: values.whitelistAvailable,
          whitelistRequirements: values.whitelistRequirements,
          teamInfo: values.teamInfo,
          image: imageUrl,
          dateCreated: collection?.dateCreated ?? timestamp,
          lastUpdated: timestamp,
        };

        const { data } = collection
          ? await axios.put("/api/collections", {
              collection: _collection,
            })
          : await axios.post("/api/collections", {
              collection: _collection,
            });

        if (data.success) {
          toast.success("Added");
        } else {
          toast.error(data.message);
        }
        collectionForm.setSubmitting(false);
      } catch (error) {
        toast.error("Unable to add collection");
      } finally {
        collectionForm.resetForm();
      }
    },
  });

  return (
    <Layout>
      <form className="contained mt-10">
        <div className="flex justify-between">
          <strong className="text-2xl ">Add New Collection</strong>
          <button
            className="mr-6 rounded-md bg-gray-300 py-1 px-5 font-bold shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              collectionForm.handleSubmit();
            }}
          >
            Add
          </button>
        </div>

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
                      <input
                        // type="text"
                        className="default-input w-full"
                        placeholder="Collection"
                        {...collectionForm.getFieldProps("name")}
                      />
                    </td>
                  </tr>
                  <tr className="bg-white ">
                    <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                      Blockchain
                    </td>
                    <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                      <Dropdown
                        onItemSelected={setSelectedBlockchain}
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
                        setImageUrl={setImageUrl}
                        imageUrl={imageUrl}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className=" flex-1 ">
            <div className="overflow-hidden sm:rounded-lg">
              <table className="w-full">
                <tbody>
                  <tr className="w-full bg-white">
                    <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                      Project Type
                    </td>
                    <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                      <Dropdown
                        onItemSelected={setSelectedProjectType}
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
                      <input
                        // type="text"
                        className="default-input w-full"
                        placeholder="Website"
                        {...collectionForm.getFieldProps("website")}
                      />
                    </td>
                  </tr>
                  <tr className="bg-white ">
                    <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                      Twitter
                    </td>
                    <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                      <input
                        // type="text"
                        className="default-input w-full"
                        placeholder="Twitter"
                        {...collectionForm.getFieldProps("twitter")}
                      />
                    </td>
                  </tr>
                  <tr className="bg-white ">
                    <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                      Discord
                    </td>
                    <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                      <input
                        // type="text"
                        className="default-input w-full"
                        placeholder="Discord"
                        {...collectionForm.getFieldProps("discord")}
                      />
                    </td>
                  </tr>
                  <tr className="bg-white ">
                    <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                      Etherscan
                    </td>
                    <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                      <input
                        // type="text"
                        className="default-input w-full"
                        placeholder="Etherscan"
                        {...collectionForm.getFieldProps("etherscan")}
                      />
                    </td>
                  </tr>
                  <tr className="bg-white ">
                    <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                      Opensea
                    </td>
                    <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                      <input
                        // type="text"
                        className="default-input w-full"
                        placeholder="Opensea"
                        {...collectionForm.getFieldProps("opensea")}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-5 flex">
          <div className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
            Description
          </div>
          <textarea
            className="mx-6 min-h-[150px] w-full rounded-lg border-2"
            placeholder="Collection Description"
            {...collectionForm.getFieldProps("description")}
          />
        </div>

        <div className="mt-10 flex flex-col gap-5 md:flex-row">
          <div className="flex items-center bg-white">
            <span className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
              Pre-sale Mint date and time
            </span>
            <span className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  value={presaleMintDateTime}
                  onChange={setPresaleMintDateTime}
                  renderInput={(
                    params: JSX.IntrinsicAttributes & TextFieldProps
                  ) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </span>
          </div>
          <div className="flex items-center bg-white">
            <span className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
              Public Mint date and time
            </span>
            <span className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  value={publicMintDateTime}
                  onChange={setPublicMintDateTime}
                  renderInput={(
                    params: JSX.IntrinsicAttributes & TextFieldProps
                  ) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </span>
          </div>
        </div>

        <div className="mt-10 flex items-start overflow-hidden sm:rounded-lg">
          <table className="w-full">
            <tbody>
              <tr className="bg-white ">
                <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                  Pre-sale Mint cost
                </td>
                <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                  <input
                    className="default-input w-full"
                    placeholder="Pre-sale mint cost"
                    {...collectionForm.getFieldProps("preSaleMintCost")}
                  />
                </td>
              </tr>
              <tr className="bg-white ">
                <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                  Whitelist Available
                </td>
                <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                  <Dropdown
                    onItemSelected={setWhitelistAvailable}
                    options={yesno}
                    className="w-full "
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table className="w-full">
            <tbody>
              <tr className="bg-white ">
                <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                  Public Mint cost
                </td>
                <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                  <input
                    className="default-input w-full"
                    placeholder="public mint cost"
                    {...collectionForm.getFieldProps("publicMintCost")}
                  />
                </td>
              </tr>
              <tr className="bg-white ">
                <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                  Whitelist requirements
                </td>
                <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                  <input
                    className="default-input w-full"
                    placeholder="whitelist requirements"
                    {...collectionForm.getFieldProps("whitelistRequirements")}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table className="w-full">
            <tbody>
              <tr className="bg-white ">
                <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                  Supply
                </td>
                <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                  <input
                    className="default-input w-full"
                    placeholder="supply"
                    {...collectionForm.getFieldProps("supply")}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-10 flex">
          <div className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
            Team Info
          </div>
          <textarea
            className="mx-6 min-h-[150px] w-full rounded-lg border-2"
            placeholder="Team Info"
            {...collectionForm.getFieldProps("teamInfo")}
          />
        </div>
      </form>
    </Layout>
  );
}

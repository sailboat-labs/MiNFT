/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import axios from "axios";
import dashify from "dashify";
import {
  collection as fire,
  DocumentData,
  getFirestore,
  query,
} from "firebase/firestore";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useMetaMask } from "metamask-react";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import { v4 } from "uuid";
import * as Yup from "yup";

import { firebaseApp } from "@/lib/firebase";

import { blockchains } from "@/data/blockchains";
import { categories } from "@/data/categories";

import ImageUpload from "@/components/collection/ImageUpload";
import Layout from "@/components/layout/Layout";
import UploadingPost from "@/components/pages/collection/add/uploading_post_modal";
import ConnectWalletFullScreen from "@/components/shared/connect_wallet_fullscreen";
import Dropdown from "@/components/shared/dropdown";

import { Collection } from "@/types";

const firestore = getFirestore(firebaseApp);
interface IAddCollectionProps {
  collection?: Collection;
  setEditMode?: Dispatch<SetStateAction<boolean>>;
}

export default function AddCollection({
  collection,
  setEditMode,
}: IAddCollectionProps) {
  const { account } = useMetaMask();
  const router = useRouter();

  const [names, setNames] = useState<string[]>([]);

  const _query = query(fire(firestore, "collections"));
  const [snapshots, loading] = useCollectionData(_query);

  useEffect(() => {
    if (loading) return;
    if (!snapshots) return;

    const data = snapshots.reduce((acc: string[], curr: DocumentData) => {
      acc.push((curr.name as string).toLowerCase());
      return acc;
    }, []);

    if (collection) {
      const index = data.indexOf(collection.name!.toLowerCase());
      data.splice(index, 1);
    }

    setNames(data);
  }, [loading, snapshots]);

  const [selectedProjectType, setSelectedProjectType] = useState<
    string | undefined
  >(collection?.projectType);
  const [whitelistAvailable, setWhitelistAvailable] = useState<
    string | undefined
  >(collection?.whitelistAvailable);
  const [selectedBlockchain, setSelectedBlockchain] = useState<
    string | undefined
  >(collection?.blockchain);
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    collection?.image
  );

  const [presaleMintDateTime, setPresaleMintDateTime] = useState<Date | null>(
    new Date(collection?.preMintDate ?? "2014-08-18T21:11:54")
  );

  const [publicMintDateTime, setPublicMintDateTime] = useState<Date | null>(
    new Date(collection?.publicMintDate ?? "2014-08-18T21:11:54")
  );

  const [collectionSubmitting, setCollectionSubmitting] = useState(false);

  const formValidationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .lowercase()
      .required("Name is required")
      .not(["add"], "Name cannot be 'Add'")
      .not(names, `Name already exists`),
    website: Yup.string().required("Website is required"),
    twitter: Yup.string().required("Twitter is required"),
    discord: Yup.string(),
    etherscan: Yup.string(),
    opensea: Yup.string(),
    description: Yup.string().required("Description is required"),

    preSaleMintCost: Yup.string().required("Presale Cost is required"),
    publicMintCost: Yup.string().required("Public Mint Cost is required"),
    supply: Yup.string().required("Supply is required"),

    whitelistRequirements: Yup.string().required(
      "Whitelist Requirements is required"
    ),
    teamInfo: Yup.string(),
  });

  const formInitialValues = {
    name: collection?.name,
    website: collection?.website,
    twitter: collection?.twitter,
    discord: collection?.discord,
    etherscan: collection?.etherscan,
    opensea: collection?.opensea,
    description: collection?.description,
    preSaleMintCost: collection?.preMintDate,
    publicMintDate: collection?.publicMintDate,
    preSaleCost: collection?.preSaleCost,
    publicMintCost: collection?.publicMintCost,
    supply: collection?.supply,
    whitelistAvailable: collection?.whitelistAvailable,
    whitelistRequirements: collection?.whitelistRequirements,
    teamInfo: collection?.teamInfo,
  };

  async function formSubmit(values: any) {
    setCollectionSubmitting(true);
    try {
      const timestamp = new Date().toISOString();
      const _collection: Collection = {
        id: collection?.id ?? v4(),
        owner: account!,
        name: values.name,
        slug: dashify(values.name),
        blockchain: selectedBlockchain,
        projectType: selectedProjectType,
        website: values.website,
        twitter: values.twitter,
        discord: values.discord,
        etherscan: values.etherscan,
        opensea: values.opensea,
        description: values.description,
        preMintDate: presaleMintDateTime?.toISOString(),
        publicMintDate: publicMintDateTime?.toISOString(),
        preSaleCost: values.preSaleCost,
        publicMintCost: values.publicMintCost,
        supply: values.supply,
        whitelistAvailable: whitelistAvailable,
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
        toast.success(collection ? "Updated" : "Added");
      } else {
        toast.error(data.message);
      }

      setCollectionSubmitting(false);
      if (collection) {
        router.replace(`/collection/${dashify(values.name)}`);
        router.reload();
      }
    } catch (error) {
      toast.error("Unable to add collection");
      setCollectionSubmitting(false);
    }
  }

  return names ? (
    <Layout>
      <>
        <UploadingPost show={collectionSubmitting} />
        <ConnectWalletFullScreen />
        <Formik
          initialValues={formInitialValues}
          validationSchema={formValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            formSubmit(values);
          }}
        >
          {({ errors, touched, handleSubmit, isSubmitting }: any) => {
            return (
              <Form className="contained mt-10 transition-all">
                <div className="flex justify-between">
                  <strong className="text-2xl ">
                    {collection ? "Update" : "Add New"} Collection
                  </strong>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="mr-6 rounded-md bg-gray-300 py-1 px-5 font-bold shadow-sm"
                  >
                    {collection ? "Update" : "Add New"}
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
                                initial={selectedBlockchain}
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
                                initial={selectedProjectType}
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
                              Twitter
                            </td>
                            <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                              <Field
                                name="twitter"
                                // type="text"
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
                                name="discord"
                                // type="text"
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
                              <Field
                                // type="text"
                                className="default-input w-full"
                                placeholder="Etherscan"
                                name="etherscan"
                              />
                              <div className="text-red-500">
                                <ErrorMessage
                                  name="etherscan"
                                  component="div"
                                />
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-white ">
                            <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                              Opensea
                            </td>
                            <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                              <Field
                                // type="text"
                                className="default-input w-full"
                                placeholder="Opensea"
                                name="opensea"
                              />
                              <div className="text-red-500">
                                <ErrorMessage name="opensea" component="div" />
                              </div>
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
                  <div className="mx-6 flex w-full flex-col">
                    <Field
                      as="textarea"
                      className=" min-h-[150px] w-full rounded-lg border-2"
                      placeholder="Collection Description"
                      name="description"
                    />
                    <div className="text-red-500">
                      <ErrorMessage name="description" component="div" />
                    </div>
                  </div>
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

                <div className="mt-10 flex items-start ">
                  <table className="w-full">
                    <tbody>
                      <tr className="bg-white ">
                        <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                          Pre-sale Mint cost
                        </td>
                        <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                          <Field
                            className="default-input w-full"
                            placeholder="Pre-sale mint cost"
                            name="preSaleMintCost"
                          />
                          <div className="text-red-500">
                            <ErrorMessage
                              name="preSaleMintCost"
                              component="div"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="bg-white ">
                        <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                          Whitelist Available
                        </td>
                        <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                          <Dropdown
                            initial={whitelistAvailable}
                            onItemSelected={setWhitelistAvailable}
                            options={["yes", "no"]}
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
                          <Field
                            className="default-input w-full"
                            placeholder="public mint cost"
                            name="publicMintCost"
                          />
                          <div className="text-red-500">
                            <ErrorMessage
                              name="publicMintCost"
                              component="div"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="bg-white ">
                        <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                          Whitelist requirements
                        </td>
                        <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                          <Field
                            className="default-input w-full"
                            placeholder="whitelist requirements"
                            name="whitelistRequirements"
                          />
                          <div className="text-red-500">
                            <ErrorMessage
                              name="whitelistRequirements"
                              component="div"
                            />
                          </div>
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
                          <Field
                            className="default-input w-full"
                            placeholder="supply"
                            name="supply"
                          />
                          <div className="text-red-500">
                            <ErrorMessage name="supply" component="div" />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-10 flex">
                  <div className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                    Team Info
                  </div>
                  <Field
                    as="textarea"
                    className="mx-6 min-h-[150px] w-full rounded-lg border-2"
                    placeholder="Team Info"
                    name="teamInfo"
                  />
                  <div className="text-red-500">
                    <ErrorMessage name="teamInfo" component="div" />
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </>
    </Layout>
  ) : (
    <></>
  );
}

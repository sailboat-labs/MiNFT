/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from "axios";
import dashify from "dashify";
import {
  collection as fire,
  DocumentData,
  getFirestore,
  query,
} from "firebase/firestore";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import { useMoralis } from "react-moralis";
import { v4 } from "uuid";
import { read, utils } from "xlsx";
import * as Yup from "yup";

import { firebaseApp } from "@/lib/firebase";

import Layout from "@/components/layout/Layout";
import CollectionDescription from "@/components/pages/collection/add/CollectionDescription";
import CollectionDetails from "@/components/pages/collection/add/CollectionDetails";
import CollectionStats from "@/components/pages/collection/add/CollectionStats";
import MintDates from "@/components/pages/collection/add/MintDates";
import TeamInfo from "@/components/pages/collection/add/TeamInfo";
import UploadingPost from "@/components/pages/collection/add/uploading_post_modal";
import WhitelistRequirements from "@/components/pages/collection/add/WhitelistRequirements";

import { Collection } from "@/types";
import Roadmap from "@/components/pages/collection/add/Roadmap";
import WhyILikeProject from "@/components/pages/collection/add/WhyILikeProject";

const firestore = getFirestore(firebaseApp);
interface IAddCollectionProps {
  collection?: Collection;
  setEditMode?: any;
}

export default function AddCollection({
  collection,
  setEditMode,
}: IAddCollectionProps) {
  const { account } = useMoralis();
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

  const [showPresaleDate, setShowPresaleDate] = useState(false);
  const [showPublicDate, setShowPublicDate] = useState(false);
  const [showWhitelistRequirementList, setShowWhitelistRequirementList] =
    useState(false);

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
    roadmap: Yup.string(),
    mintsPerPresale: Yup.number(),
    mintsPerTx: Yup.number(),
    whyILikeProject: Yup.string(),
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
    roadmap: collection?.roadmap,
    mintsPerPresale: collection?.mintsPerPresale,
    mintsPerTx: collection?.mintsPerTx,
    whyILikeProject: collection?.whyILikeProject,
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
        roadmap: values.roadmap,
        mintsPerPresale: values.mintsPerPresale,
        mintsPerTx: values.mintsPerTx,
        whyILikeProject: values.whyILikeProject,
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

      if (collection) {
        const url = `/collection/${dashify(values.name)}`;
        router.replace(url);
        setEditMode!(false);
      }
      setCollectionSubmitting(false);
    } catch (error) {
      console.error(error);
      toast.error("Unable to add collection");
      setCollectionSubmitting(false);
    }
    
  }

  const readUploadFile = (e: any) => {
    e.preventDefault();
    try {
      if (e.target.files) {
        console.log("files", e.target.files);

        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target!.result;

          const workbook = read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = utils.sheet_to_json(worksheet);
          console.log(json);
        };
        reader.readAsArrayBuffer(e.target.files[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return names ? (
    <Layout>
      <>
        <UploadingPost show={collectionSubmitting} />
        {/* <AuthenticationDialog
          showAuthDialog={false}
          setShowAuthDialog={undefined}
        /> */}
        {/* <form className="mt-20">
          <label htmlFor="upload">Upload File</label>
          <input
            type="file"
            name="upload"
            id="upload"
            onChange={readUploadFile}
          />
        </form> */}
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
                    className="gradient-button mr-6"
                  >
                    {collection ? "Update" : "Add New"}
                  </button>
                </div>

                <CollectionDetails
                  selectedProjectType={selectedProjectType}
                  setSelectedProjectType={setSelectedProjectType}
                  selectedBlockchain={selectedBlockchain}
                  setSelectedBlockchain={setSelectedBlockchain}
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                />
                <CollectionDescription />

                <MintDates
                  presaleMintDateTime={presaleMintDateTime}
                  setPresaleMintDateTime={setPresaleMintDateTime}
                  publicMintDateTime={publicMintDateTime}
                  setPublicMintDateTime={setPublicMintDateTime}
                  showPresaleDate={showPresaleDate}
                  setShowPresaleDate={setShowPresaleDate}
                  showPublicDate={showPublicDate}
                  setShowPublicDate={setShowPublicDate}
                />

                <CollectionStats
                  whitelistAvailable={whitelistAvailable}
                  setWhitelistAvailable={setWhitelistAvailable}
                />
                {whitelistAvailable == "yes" && <WhitelistRequirements />}
                <Roadmap />
                <WhyILikeProject/>

                <TeamInfo />
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

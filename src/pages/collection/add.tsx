/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from "axios";
import dashify from "dashify";
import {
  collection as col,
  DocumentData,
  getFirestore,
  query,
} from "firebase/firestore";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import { useMoralis } from "react-moralis";
import { v4 } from "uuid";
import * as Yup from "yup";

import { firebaseApp } from "@/lib/firebase";
import useAuthenticationDialog from "@/hooks/UseAuthDialog";
import useUserData from "@/hooks/useUserData";

import Layout from "@/components/layout/Layout";
import CollectionDescription from "@/components/pages/collection/add/CollectionDescription";
import CollectionDetails from "@/components/pages/collection/add/CollectionDetails";
import CollectionStats from "@/components/pages/collection/add/CollectionStats";
import MintDates from "@/components/pages/collection/add/MintDates";
import Roadmap from "@/components/pages/collection/add/Roadmap";
import TeamInfo from "@/components/pages/collection/add/TeamInfo";
import UploadingPost from "@/components/pages/collection/add/uploading_post_modal";
import WhitelistRequirements from "@/components/pages/collection/add/WhitelistRequirements";
import WhyILikeProject from "@/components/pages/collection/add/WhyILikeProject";

import { Collection } from "@/types";
import { usePageLoader } from "@/hooks/pageloader";

const firestore = getFirestore(firebaseApp);

export default function AddCollection({ collection }: any) {
  const { account, isAuthenticated } = useMoralis();
  const router = useRouter();
  const { Loader, setState, state } = usePageLoader();
  const [names, setNames] = useState<string[]>([]);
  const { user, setWalletId } = useUserData();
  const [collectionTimezone, setCollectionTimezone] = useState(
    collection?.timezone
  );

  const { AuthDialog, setShowAuthDialog } = useAuthenticationDialog();

  const _query = query(col(firestore, "collections"));
  const [snapshots, loading] = useCollectionData(_query);

  useEffect(() => {
    if (!account) return;
    setWalletId(account);
  }, [account]);

  useEffect(() => {
    if (loading) return;
    if (!snapshots) return;

    const data = snapshots.reduce((acc: string[], curr: DocumentData) => {
      acc.push((curr.name as string)?.toLowerCase());
      return acc;
    }, []);

    if (collection) {
      const index = data.indexOf(collection.name?.toLowerCase());
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
    new Date(collection?.preMintDate ?? new Date())
  );

  const [publicMintDateTime, setPublicMintDateTime] = useState<Date | null>(
    new Date(collection?.publicMintDate ?? new Date())
  );

  const [showPresaleDate, setShowPresaleDate] = useState(false);
  const [showPublicDate, setShowPublicDate] = useState(false);

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
    preSaleCost: Yup.string(),
    publicMintCost: Yup.string(),
    supply: Yup.string(),
    whitepaper: Yup.string(),
    whitelistRequirements: Yup.string(),
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
    whitepaper: collection?.whitepaper,
    timezone: collection?.timezone,
  };

  async function formSubmit(values: any) {
    setCollectionSubmitting(true);
    try {
      const timestamp = new Date().toISOString();
      let _collection: Collection = {
        id: collection?.id ?? v4(),
        owner: account!,
        name: values.name,
        slug: dashify(values.name),
        blockchain: selectedBlockchain ?? "ethereum",
        projectType: selectedProjectType ?? "collectible",
        website: values.website,
        twitter: values.twitter,
        discord: values.discord,
        etherscan: values.etherscan,
        opensea: values.opensea,
        whitepaper: values.whitepaper,
        roadmap: values.roadmap,
        mintsPerPresale: values.mintsPerPresale,
        mintsPerTx: values.mintsPerTx,
        whyILikeProject: values.whyILikeProject,
        description: values.description,
        preSaleCost: values.preSaleCost,
        publicMintCost: values.publicMintCost,
        supply: values.supply,
        whitelistAvailable: whitelistAvailable,
        whitelistRequirements: values.whitelistRequirements,
        teamInfo: values.teamInfo,
        image: imageUrl,
        dateCreated: collection?.dateCreated ?? timestamp,
        lastUpdated: timestamp,
        timezone: collectionTimezone ?? user?.timeZone ?? "Etc/GMT",
      };

      if (showPresaleDate)
        _collection = {
          ..._collection,
          preMintDate: presaleMintDateTime?.toISOString(),
        };
      if (showPublicDate)
        _collection = {
          ..._collection,
          publicMintDate: publicMintDateTime?.toISOString(),
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
        setState(true);
        setCollectionSubmitting(false);

        try {
          await axios.post(
            `https://us-central1-minft-production.cloudfunctions.net/twitter/post`,
            {
              tweet: `#${_collection.owner} added a new project, ${
                _collection.name
              }, on MiNFT. Check it out. https://minft.me/collection/${dashify(
                values.name
              )}`,
            }
          );
        } catch (error) {
          console.log("Could not post to twitter");
        }
      } else {
        toast.error(data.message);
      }

      const url = `/collection/${dashify(values.name)}`;
      router.replace(url);

      setCollectionSubmitting(false);
    } catch (error) {
      console.error(error);
      toast.error("Unable to add collection");
      setCollectionSubmitting(false);
      setState(false);
    }
  }

  // const readUploadFile = (e: any) => {
  //   e.preventDefault();
  //   try {
  //     if (e.target.files) {
  //       console.log("files", e.target.files);

  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         const data = e.target!.result;

  //         const workbook = read(data, { type: "array" });
  //         const sheetName = workbook.SheetNames[0];
  //         const worksheet = workbook.Sheets[sheetName];
  //         const json = utils.sheet_to_json(worksheet);
  //         console.log(json);
  //       };
  //       reader.readAsArrayBuffer(e.target.files[0]);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  if (!account || !isAuthenticated) {
    return (
      <Layout>
        <div className="mt-20 flex h-full w-full flex-col items-center justify-center gap-5 px-10 text-center">
          <AuthDialog />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            Connect your wallet to add a new collection
          </div>
          <div
            onClick={() => {
              setShowAuthDialog(true);
            }}
            className="gradient-button"
          >
            Connect your wallet
          </div>
        </div>
      </Layout>
    );
  }

  return names ? (
    <Layout>
      <>
        <UploadingPost show={collectionSubmitting} />
        {state && <Loader />}
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
                  collectionTimezone={
                    collectionTimezone ?? user?.timeZone ?? "Etc/GMT"
                  }
                  setShowPublicDate={setShowPublicDate}
                  setCollectionTimezone={setCollectionTimezone}
                />

                <CollectionStats
                  whitelistAvailable={whitelistAvailable}
                  setWhitelistAvailable={setWhitelistAvailable}
                />
                {whitelistAvailable == "yes" && <WhitelistRequirements />}
                <Roadmap />
                <WhyILikeProject />

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

export const getServerSideProps = async ({ query }: any) => {
  let collection = null;
  // if query object was received, return it as a router prop:
  if (query.collection) {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("collection", query.collection);
    }
    collection = JSON.parse(query.collection) as Collection;
  } else {
    if (typeof window !== "undefined") {
      const local = window.sessionStorage.getItem("collection");
      if (local) collection = JSON.parse(local) as Collection;
    }
  }

  return { props: { collection } };
};

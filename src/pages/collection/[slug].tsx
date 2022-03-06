/* eslint-disable @next/next/no-img-element */
import {
  collection as fire,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { firebaseApp } from "@/lib/firebase";

import Layout from "@/components/layout/Layout";
import Assets from "@/components/pages/collection/details/assets";
import CollectionSummary from "@/components/pages/collection/details/collection_summary";
import Comments from "@/components/pages/collection/details/comments";
import PageLoader from "@/components/shared/PageLoader";

import {
  getOpenSeaCollection,
  getOpenSeaCollectionAssets,
} from "@/helpers/opensea";

import { Collection, OpenSeaCollection } from "@/types";
import axios from "axios";

const firestore = getFirestore(firebaseApp);

const CollectionPage = ({ router }: any) => {
  const { slug } = router.query;

  const [id, setId] = useState<string>("b");

  const ref = doc(firestore, `collections/${id}`);
  const [collectionData, setCollectionData] = useState<Collection>();
  const [collection, loading, error] = useDocumentData(ref);

  const [openSeaData, setOpenSeaData] = useState<OpenSeaCollection>();

  async function getCollection() {
    if (!collection || !collection.opensea) return;
    const _slug = collection.opensea.toString().split("/collection/")[1];
    const _collection = await getOpenSeaCollection(_slug);
    setOpenSeaData(_collection);

    // const { data } = await axios.get("/api/opensea_assets", {
      
    // });
    // console.log(data);
  }

  useEffect(() => {
    if (!collection || loading) return;
    setCollectionData(collection as Collection);
  }, [loading, error, collection]);

  useEffect(() => {
    if (!collection || !collection.opensea) return;
    getCollection();
  }, [collection]);

  useEffect(() => {
    if (slug) {
      const _query = query(
        fire(firestore, "collections"),
        where("slug", "==", slug)
      );

      getDocs(_query).then((snap) => {
        setId(snap.docs[0].id);
      });
    }
  }, [slug]);

  return (
    <Layout>
      {!collectionData ? (
        <PageLoader />
      ) : (
        <div className="pb-20">
          <div className="h-20">
            <img
              className="absolute h-20 w-full object-cover"
              src="/images/collection_page_top_images.png"
              alt=""
            />
            <div className="absolute h-20 w-full bg-gradient-to-r from-black to-transparent"></div>

            <div className="absolute z-[2] flex h-20 items-center gap-3 px-20 font-bold text-white">
              <img
                className="h-10 w-10"
                src="/images/discord_logo.png"
                alt=""
              />
              “Crazy news! Announcement of a new Cool Cats collection”
            </div>
          </div>
          <div className="contained mt-10 flex gap-5">
            <span className="text-red-500 underline">Article</span>
            <span>News</span>
          </div>
          <CollectionSummary
            openSeaData={openSeaData}
            collection={collectionData as Collection}
          />
          <Assets />
          <Comments collectionId={collectionData.id} />
        </div>
      )}
    </Layout>
  );
};

export function getServerSideProps({ query }: any) {
  // if query object was received, return it as a router prop:
  if (query.slug) {
    return { props: { router: { query } } };
  }
  // obtain slug elsewhere, redirect or fallback to some default value:
  /* ... */
  return { props: { router: { query: { slug: "" } } } };
}

export default CollectionPage;

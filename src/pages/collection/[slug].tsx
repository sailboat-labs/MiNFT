/* eslint-disable @next/next/no-img-element */
import { doc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { firebaseApp } from "@/lib/firebase";

import Layout from "@/components/layout/Layout";
import Assets from "@/components/pages/collection/details/assets";
import CollectionSummary from "@/components/pages/collection/details/collection_summary";
import Comments from "@/components/pages/collection/details/comments";

import { Collection, OpenSeaCollection } from "@/types";

const firestore = getFirestore(firebaseApp);

const CollectionPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const ref = doc(firestore, `collections/${id}`);
  const [collectionData, setCollectionData] = useState<any>();
  const [collection, loading, error] = useDocumentData(ref);

  const [openSeaData, setOpenSeaData] = useState<OpenSeaCollection>();

  async function getCollection() {
    if (!collection || !collection.opensea) return;
    try {
      const _slug = collection.opensea.toString().split("/collection/")[1];
      const url = `https://api.opensea.io/api/v1/collection/${_slug}`;
      const response = await fetch(url);
      const body = await response.text();
      const parsedBody = await JSON.parse(body);
      console.log(parsedBody.collection);

      if (parsedBody.collection.slug != "undefined")
        setOpenSeaData(parsedBody.collection);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!collection || loading) return;
    setCollectionData(collection);
  }, [loading, error, collection]);

  useEffect(() => {
    if (!collection || !collection.opensea) return;
    getCollection();
  }, [collection]);

  return (
    <Layout>
      {!collectionData ? (
        <div className="mt-10">Loading</div>
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
            collection={collection as Collection}
          />
          <Assets />
          <Comments />
        </div>
      )}
    </Layout>
  );
};

export default CollectionPage;

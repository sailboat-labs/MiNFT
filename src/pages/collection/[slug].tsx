/* eslint-disable @next/next/no-img-element */
import {
  collection as fire,
  doc,
  getFirestore,
  query,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";

import { firebaseApp } from "@/lib/firebase";

import Layout from "@/components/layout/Layout";
import Assets from "@/components/pages/collection/details/assets";
import CollectionSummary from "@/components/pages/collection/details/collection_summary";
import Comments from "@/components/pages/collection/details/comments";

import AddCollection from "./add";

import { Collection } from "@/types";

const firestore = getFirestore(firebaseApp);

const CollectionPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [id, setId] = useState<string>("b");

  const [editMode, setEditMode] = useState<boolean>(false);

  const ref = doc(firestore, `collections/${id}`);
  const [collection, loading, error] = useDocumentData(ref);

  const _query = query(fire(firestore, "collections"));
  const [snapshots, _loading] = useCollectionData(_query);

  useEffect(() => {
    if (_loading) return;
    if (!snapshots) return;

    const data = snapshots[0].id;

    setId(data);
  }, [_loading, snapshots]);

  if (editMode)
    return collection ? (
      <AddCollection collection={collection as Collection} />
    ) : (
      <></>
    );

  return id && collection ? (
    <Layout>
      <div className="pb-20">
        <div className="h-20">
          <img
            className="absolute h-20 w-full object-cover"
            src="/images/collection_page_top_images.png"
            alt=""
          />
          <div className="absolute h-20 w-full bg-gradient-to-r from-black to-transparent"></div>

          <div className="absolute z-[2] flex h-20 items-center gap-3 px-20 font-bold text-white">
            <img className="h-10 w-10" src="/images/discord_logo.png" alt="" />
            “Crazy news! Announcement of a new Cool Cats collection”
          </div>
        </div>
        <div className="contained mt-10 flex gap-5">
          <span className="text-red-500 underline">Article</span>
          <span>News</span>
        </div>
        <CollectionSummary
          collection={collection as Collection}
          setEditMode={setEditMode}
        />
        <Assets />
        <Comments />
      </div>
    </Layout>
  ) : (
    <></>
  );
};

export default CollectionPage;

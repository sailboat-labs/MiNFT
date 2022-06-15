import axios from "axios";
import { collection, getFirestore, query } from "firebase/firestore";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useMoralis } from "react-moralis";
import { useSelector } from "react-redux";

import { firebaseApp } from "@/lib/firebase";

import FolderUploader from "@/components/nft/FolderUpload";
import ViewGeneratedTokens from "@/components/nft/GeneratedTokens";
import NewProperty from "@/components/nft/NewProperty";
import PropertyGroup from "@/components/nft/PropertyGroup";
import { UiFileInputButton } from "@/components/nft/UIUpload";

import { NFTLayer } from "@/types";

const firestore = getFirestore(firebaseApp);

const GetStartedPage = ({ router }: any) => {
  const { account, isAuthenticated } = useMoralis();

  const _query = query(
    collection(
      firestore,
      `art-engine/users/${account}/${router.query.name}/layers`
    )
  );

  const [snapshots, loading] = useCollectionData(_query);

  const [layers, setLayers] = useState<NFTLayer[]>([]);

  const store = useSelector((state) => state) as any;
  const layersState = store.layersReducer;

  useEffect(() => {
    if (!isAuthenticated) router.push("/nft");
  }, [isAuthenticated]);

  // React.useEffect(() => {
  //   const body = new FormData();
  //   fetch("/api/nft/files_upload", {
  //     body: JSON.stringify({ name: "Some body" }),
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err));
  // }, []);

  /**
   * handles change in a property group trait
   *
   * @param {Object.<string, string|number>} param0 - object of group name and traitIndex
   */
  function handleTraitChanged({
    groupName,
    traitIndex,
  }: {
    groupName: string;
    traitIndex: number;
  }): void {
    // setNFT({
    //   ...NFT,
    //   [groupName]: traitGroups[groupName]?.traits[traitIndex],
    // });
    // setTraitGroups({
    //   ...traitGroups,
    //   [groupName]: {
    //     ...traitGroups[groupName],
    //     activeIndex: traitIndex,
    //   },
    // });
  }

  const uploadToServer = async (event: any) => {
    const body = new FormData();
    body.append("file", event.target?.files);
    const response = await fetch("/api/nft/file", {
      method: "POST",
      body,
    });
  };

  const onChange = async (formData: any) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event: { loaded: number; total: number }) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };

    const response = await axios.post(
      "/api/nft/token_generator",
      formData,
      config
    );

    // console.log("response", response.data);
  };

  // async function loadFilesToArtEngine(formData: any) {
  //   const config = {
  //     headers: { "content-type": "multipart/form-data" },
  //     onUploadProgress: (event: { loaded: number; total: number }) => {
  //       console.log(
  //         `Current progress:`,
  //         Math.round((event.loaded * 100) / event.total)
  //       );
  //     },
  //   };

  //   const response = await axios.post(
  //     "/api/nft/files_upload",
  //     formData,
  //     config
  //   );

  //   console.log(response);
  // }

  // function generateTokens() {
  //   const data = JSON.stringify({
  //     address: account,
  //     collection: router.query?.name?.toString().toLowerCase(),
  //     layersOrder: [
  //       {
  //         name: "Background",
  //       },
  //       {
  //         name: "Skin",
  //       },
  //       {
  //         name: "Outfits",
  //       },
  //       {
  //         name: "Eyes",
  //       },
  //       {
  //         name: "Mouths",
  //       },
  //       {
  //         name: "Beard",
  //       },
  //     ],
  //   });

  //   const config: any = {
  //     method: "post",
  //     url: "https://art-engine-qb27e.ondigitalocean.app/generate",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       // console.log(JSON.stringify(response.data));
  //       toast.success(response.data.toString());
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  return (
    <>
      <Head>
        <title>Manage</title>
      </Head>
      <div className="flex">
        <div className="min-h-screen w-[20%] border-r">
          <UiFileInputButton
            label="Upload Single File"
            uploadFileName="theFiles"
            allowMultipleFiles
            onChange={uploadToServer}
          />
          <FolderUploader />

          <div className="mt-10 flex flex-col gap-10">
            {layersState && (
              <>
                {layersState.layers.map((item: NFTLayer, index: number) => (
                  <PropertyGroup
                    key={index}
                    onChange={handleTraitChanged}
                    name={item.name}
                    elements={
                      layersState.layers.find(
                        (layer: NFTLayer) => layer.name == item.name
                      )?.elements
                    }
                  />
                ))}
              </>
            )}
          </div>
        </div>
        <div className="min-h-screen w-[60%]">
          <section className="flex flex-1 justify-center">
            {/* <NFTPreview className="mt-10" layers={layers} /> */}
          </section>
        </div>
        <div className="min-h-screen w-[20%] border-l">
          <section className="box-border flex min-h-screen bg-white">
            <div className="container mx-auto flex max-w-7xl items-start justify-between gap-8 p-12 px-4">
              <section className="flex-1">
                <div className="flex flex-col items-center gap-5">
                  {layers && (
                    <div
                      onClick={() => {
                        // generateTokens();
                        axios.post("/api/nft/token_generator", {
                          layers: layersState.layers,
                        });
                      }}
                      className="gradient-button"
                    >
                      Generate Tokens
                    </div>
                  )}
                  {layers && (
                    <div className="">
                      <ViewGeneratedTokens />
                    </div>
                  )}
                </div>
                <NewProperty />
                {/* Group Previews */}
              </section>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export function getServerSideProps({ query }: any) {
  // if query object was received, return it as a router prop:
  if (query.name) {
    return { props: { router: { query } } };
  }
  // obtain slug elsewhere, redirect or fallback to some default value:
  /* ... */
  return { props: { router: { query: { name: "" } } } };
}

export default GetStartedPage;

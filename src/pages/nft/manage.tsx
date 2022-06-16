import axios from "axios";
import { collection, getFirestore, query } from "firebase/firestore";
import Head from "next/head";
import React, { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useMoralis } from "react-moralis";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { firebaseApp } from "@/lib/firebase";

import TraitGroupNavigator from "@/components/layout/TraitGroupNavigator";
import FolderUploader from "@/components/nft/FolderUpload";
import ViewGeneratedTokens from "@/components/nft/GeneratedTokens";
import GenerateToken from "@/components/nft/GenerateToken";
import PropertyGroup from "@/components/nft/PropertyGroup";

import { ILayer } from "@/interfaces/get-started";

import { NFTLayer } from "@/types";

const firestore = getFirestore(firebaseApp);

const GetStartedPage = ({ router }: any) => {
  const dispatch = useDispatch();
  const { account, isAuthenticated } = useMoralis();
  let _layers: ILayer[] = [];
  const _query = query(
    collection(
      firestore,
      `art-engine/users/${account}/${router.query.name}/layers`
    )
  );

  const [snapshots, loading] = useCollectionData(_query);

  // const [layers, setLayers] = useState<NFTLayer[]>([]);

  const store = useSelector((state) => state) as any;
  const layersState = store.layersReducer;
  const generatedImagesState = store.generatedImagesReducer;

  useEffect(() => {
    if (!isAuthenticated) router.push("/nft");
  }, [isAuthenticated]);
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
  }): void {}

  async function viewAllFiles() {
    const options = {
      types: [
        {
          description: "Images",
          accept: {
            "image/png": ".png",
          },
        },
      ],
      // excludeAcceptAllOption: true,
    };
    try {
      const directoryHandle = await window.showDirectoryPicker(options);

      const files = await listAllFilesAndDirs(directoryHandle);
      console.log("files", files);

      console.log(_layers);

      axios.post("/api/nft/token_generator", {
        layers: _layers,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function listAllFilesAndDirs(dirHandle: any) {
    const layers: NFTLayer[] = [];

    const files = [];
    for await (const [name, handle] of dirHandle) {
      const { kind } = handle;

      if (handle.kind === "directory") {
        files.push({ name, handle, kind });
        layers.push({
          name: handle.name,
          elements: [...(await listAllFilesAndDirs(handle))],
        });
        files.push(...(await listAllFilesAndDirs(handle)));
      } else {
        const file = await handle.getFile();
        // const content = await file.text();
        // console.log(file);

        files.push({ name, handle, kind });
      }
    }

    _layers = layers?.map((layer, layerIndex) => ({
      id: layerIndex,
      name: layer.name,
      blendmode: "source-over",
      opacity: 1,
      bypassDNA: false,
      elements: layer.elements.map((element, index) => ({
        id: index,
        sublayer: false,
        weight: index + 1,
        blendmode: "source-over",
        opacity: 1,
        name: layer.name,
        filename: `${layer.name}#${padLeft(index + 1)}.png`,
        path: element,
        zindex: "",
        trait: layer.name,
        traitValue: layer.name,
      })),
    }));

    // dispatch(setLayers(_layers));

    console.log({ files });

    return files;
  }

  function padLeft(n: number) {
    return (n < 10 ? "00" : n < 100 ? "0" : "") + n;
  }

  // const onChange = async (formData: any) => {
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
  //     "/api/nft/token_generator",
  //     formData,
  //     config
  //   );

  //   // console.log("response", response.data);
  // };

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
        <TraitGroupNavigator />
        <div className="min-h-screen w-[20%] border-r">
          <div className="mt-0 h-[length:calc(100vh-00px)] flex-col gap-10 overflow-y-auto">
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
            <div className="grid grid-cols-8">
              {generatedImagesState.images.map((image: any, index: number) => (
                <img className="h-32 w-32" key={index} src={image} alt="" />
              ))}
            </div>
          </section>
        </div>
        <div className="min-h-screen w-[20%] border-l">
          <section className="box-border flex min-h-screen bg-white">
            <div className="container mx-auto flex max-w-7xl items-start justify-between gap-8 p-12 px-4">
              <section className="flex-1">
                <div className="flex flex-col items-center gap-5">
                  <GenerateToken />
                  <div
                    className="gradient-button"
                    onClick={() => {
                      viewAllFiles();
                    }}
                  >
                    View all files
                  </div>
                  <FolderUploader />

                  <div
                    onClick={() => {
                      // generateTokens();
                      // axios.post("/api/nft/token_generator", {
                      //   dirHandle: layersState.dirHandle,
                      // });
                    }}
                    className="gradient-button"
                  >
                    Generate Tokens
                  </div>
                  <div className="">
                    <ViewGeneratedTokens />
                  </div>
                </div>
                {/* <NewProperty /> */}
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

/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { useDispatch } from "react-redux";

import NFTLayering from "../NFTLayering";

import { NFTLayer } from "@/types";

type props = {
  data: NFTLayer[];
  open: boolean;
  setShowLayerStructure: any;
  onConfirm: any;
};

export default function UploadFolderResultStructure({
  data,
  open,
  setShowLayerStructure,
  onConfirm,
}: props) {
  const router = useRouter();
  const dispatch = useDispatch();

  function closeModal() {
    setShowLayerStructure(false);
  }

  // function openModal() {
  //   setShowLayerStructure(true);
  // }

  // function fSetLayers() {
  //   const layers = data.map((layer) => {
  //     return {
  //       id: layer.id,
  //       name: layer.name,
  //       elements: layer.elements,
  //     };
  //   });

  //   dispatch(setLayers(layers));
  // }

  // function uploadLayers() {
  //   //Recursively upload layers and its elements

  //   if (!account || !router.query?.name?.toString().toLowerCase()) return;
  //   const layers = data.map((item) => item.name);
  //   const elements = data.map((item) => item.elements);

  //   // console.log({ layers, elements });
  //   // return

  //   layers.forEach(async (layer) => {
  //     try {
  //       const _layer = {
  //         name: layer,
  //         blendmode: "source-over",
  //         opacity: 1,
  //         bypassDNA: false,
  //       };

  //       const _doc = doc(
  //         firestore,
  //         `art-engine/users/${account}/${router.query?.name
  //           ?.toString()
  //           .toLowerCase()}/layers/${layer}`
  //       );
  //       await setDoc(_doc, _layer);
  //       toast.dismiss();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });

  //   uploadElements(data);
  // }

  // async function uploadElements(layersWithElements: NFTLayer[]) {
  //   layersWithElements.forEach((layer) => {
  //     const acceptedFiles = layer.elements;

  //     acceptedFiles.forEach((file: File) => {
  //       try {
  //         const _name = v4() + "." + file.type.split("/").pop();

  //         // setUploading(true);
  //         // setPercentageComplete(0);

  //         const storageRef = ref(
  //           storage,
  //           `art-engine/users/${account}/${router.query?.name
  //             ?.toString()
  //             .toLowerCase()}/elements/${_name}`
  //         );

  //         const uploadTask = uploadBytesResumable(storageRef, file);

  //         uploadTask.on(
  //           "state_changed",
  //           (snapshot: any) => {
  //             const progress =
  //               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //             // setPercentageComplete(progress);
  //           },
  //           (error: any) => {
  //             toast.error(error.code);
  //           },
  //           async () => {
  //             const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
  //             // setImageUrl(downloadUrl);
  //             console.log(downloadUrl);

  //             //Upload image to firebase

  //             const _element = {
  //               sublayer: false,
  //               weight: 1,
  //               blendmode: "source-over",
  //               opacity: 1,
  //               name: layer.name,
  //               filename: _name,
  //               path: downloadUrl,
  //               zindex: "",
  //               trait: layer.name,
  //               traitValue: layer.name,
  //             };

  //             const _doc = doc(
  //               firestore,
  //               `art-engine/users/${account}/${router.query?.name
  //                 ?.toString()
  //                 .toLowerCase()}/elements/${_name}`
  //             );
  //             await setDoc(_doc, _element);
  //             toast.dismiss();
  //             toast.success("Element uploaded");
  //           }
  //         );
  //         // setUploading(false);
  //       } catch (error) {
  //         // setUploading(false);
  //         // setPercentageComplete(0);

  //         toast.error("Upload failed");
  //       }
  //     });
  //   });
  // }

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white text-left  align-middle shadow-xl transition-all dark:bg-[color:var(--dark)]">
                  <Dialog.Title
                    as="h3"
                    className="flex items-center justify-between bg-gray-100 px-6 py-3 text-lg font-medium leading-6 text-gray-900"
                  >
                    Confirm Layer Structure
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-blue-900 transition-all hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 transition-all hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        // onClick={fSetLayers}
                        // onClick={onConfirm}
                      >
                        Confirm
                      </button>
                    </div>
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col gap-5 p-6">
                    <NFTLayering />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

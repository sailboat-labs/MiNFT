import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLayers } from "redux/reducers/slices/layers";

import { NFTLayer } from "@/types";

export default function SelectFolder() {
  const [isOpen, setIsOpen] = useState(true);
  let _layers: any[] = [];
  const layers: NFTLayer[] = [];
  const dispatch = useDispatch();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const store = useSelector((state) => state) as any;
  const layersState = store.layersReducer;

  useEffect(() => {
    if (layersState.layers.length > 1) return closeModal();
    return openModal();
  }, [layersState]);

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
      const directoryHandle = await (window as any).showDirectoryPicker(
        options
      );

      const files = await listAllFilesAndDirs(directoryHandle);
      console.log("files", files);

      _layers = layers?.map((layer, layerIndex) => ({
        id: layerIndex,
        name: layer.name,
        blendmode: "source-over",
        opacity: 1,
        bypassDNA: false,
        elements: layer.elements.map((element: any, index: number) => ({
          id: index,
          sublayer: false,
          weight: index + 1,
          blendmode: "source-over",
          opacity: 1,
          name: layer.name,
          filename: `${layer.name}#${padLeft(index + 1)}.png`,
          path: URL.createObjectURL(element.file),
          zindex: "",
          trait: layer.name,
          traitValue: layer.name,
        })),
      }));

      dispatch(setLayers(_layers));
      console.log(_layers);
    } catch (e) {
      console.log(e);
    }
  }

  function padLeft(n: number) {
    return (n < 10 ? "00" : n < 100 ? "0" : "") + n;
  }

  async function listAllFilesAndDirs(dirHandle: any): Promise<any> {
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

        files.push({ name, handle, kind, file });
      }
    }

    // dispatch(setLayers(_layers));

    return files;
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            //
          }}
        >
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>
                    Let&apos;s get started
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Select a folder to import. Selected folder should contain
                      a folder for each trait with a file for each trait
                      variation
                    </p>
                  </div>

                  <div className="mt-4 flex w-full justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        viewAllFiles();
                      }}
                    >
                      Select Folder
                    </button>
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

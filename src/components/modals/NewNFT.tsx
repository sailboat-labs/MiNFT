import { firebaseApp } from "@/lib/firebase";
import { Dialog, Transition } from "@headlessui/react";
import { getFirestore, setDoc,doc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { FC, Fragment, useState } from "react";
import toast from "react-hot-toast";
import { useMoralis } from "react-moralis";

interface AppProps {
  isOpen: boolean;
  closeModal: () => any;
}

const firestore = getFirestore(firebaseApp);

const NewNFT: FC<AppProps> = ({ isOpen, closeModal }) => {
  const router = useRouter()
  const [projectName, setProjectName] = useState<string>("");
  const [collectionCount, setCollectionCount] = useState<number>(1000);
    const { account, logout, isAuthenticated } = useMoralis();


    if(!isAuthenticated) router.push("/nft")


  function createProject(_evt: React.MouseEvent<HTMLButtonElement>) {
    // todo: code to create project goes here
    closeModal();
  }

  async function addProject() {
    // todo: save Property name and uploaded trait files
    toast("Creating");

    const _layer = {
      name: projectName.toString().toLowerCase(),
      owner: account,
      preview: 1,
    };

    const _doc = doc(
      firestore,
      `art-engine/users/${account}/${projectName.toString().toLowerCase()}`
    );
    await setDoc(_doc, _layer);
    toast.dismiss();
    toast.success("Saved");
    closeModal()
  }


  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog
            as="div"
            onClose={closeModal}
            className="fixed inset-0 z-30 bg-black bg-opacity-40 backdrop-blur"
          />
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
              <div className="w-full max-w-lg transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="mt-2">
                  <div className="flex flex-col gap-2">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Project Name
                    </Dialog.Title>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(evt) => setProjectName(evt.target.value)}
                      className="rounded-md border-gray-200"
                      placeholder="Project name"
                    />
                  </div>
                  <div className="mt-3 flex flex-col gap-2">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Count
                    </Dialog.Title>
                    <input
                      type="number"
                      value={collectionCount}
                      onChange={(evt) =>
                        setCollectionCount(parseInt(evt.target.value))
                      }
                      placeholder="collection count"
                      className="rounded-md border-gray-200"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all duration-150 hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={addProject}
                  >
                    Create Project
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NewNFT;

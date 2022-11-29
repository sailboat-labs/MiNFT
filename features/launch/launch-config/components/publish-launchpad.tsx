import { format } from "date-fns";
import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getAddress } from "redux/reducers/selectors/user";

import { firestore } from "@/lib/firebase";

import Button from "@/components/buttons/Button";
import PageLoader from "@/components/shared/PageLoader";

import { IProjectLaunch } from "@/interfaces";

import { publishLaunchpad } from "../launchpad-config.logic";

export default function PublishLaunchPad() {
  const router = useRouter();
  const address = useSelector(getAddress);
  const [isPublishingProject, setIsPublishingProject] = useState(false);
  const [launchInformation, setLaunchInformation] = useState<IProjectLaunch>();
  const [isLoadingPublishedData, setIsLoadingPublishedData] = useState(true);

  async function handlePublishLaunchpad() {
    setIsPublishingProject(true);
    toast.loading("Publishing launchpad");
    const result = await publishLaunchpad(
      router.query.project as string,
      address
    );
    setTimeout(() => {
      toast.dismiss();
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }

      setIsPublishingProject(false);
    }, 3000);
  }

  useEffect(() => {
    if (!router.query.project) return;
    setIsLoadingPublishedData(true);
    const _doc = doc(
      firestore,
      `Projects/${router.query.project}/Launchpad/published`
    );
    const unsubscribe = onSnapshot(_doc, (snapshot) => {
      setLaunchInformation(snapshot.data() as IProjectLaunch);
      setIsLoadingPublishedData(false);
      console.log({ data: snapshot.data() });
    });

    return () => {
      unsubscribe();
    };
  }, [router.query.project]);

  return (
    <>
      <div
        className={`pointer-events-none fixed scale-75 bg-white transition-all dark:bg-[color:var(--dark)] ${
          isLoadingPublishedData ? "opacity-100" : "opacity-0"
        }`}
      >
        <PageLoader className="h-[30px] w-[30px]" />
      </div>
      <div className="p-10">
        <div>Review your launchpad before publishing</div>
        <Button
          disabled={isLoadingPublishedData}
          onClick={() => {
            // router.push(`/launch/preview/${router.query.project}`);
            window.open(`/launch/preview/${router.query.project}`, "_blank");
          }}
          className="mt-5"
        >
          Preview Launchpad
        </Button>

        <div className="mt-10 mb-5 flex items-center gap-5">
          <div className="text-xl text-indigo-500">Publish</div>
          <div className=" flex-1 rounded-lg border "></div>
        </div>

        <div className="max-w-lg">
          Publish your launchpad for it to be available for viewing. Review your
          configuration once more to make sure every information is correct
        </div>

        {launchInformation && launchInformation.publishTimeStamp && (
          <div className="mt-10 flex items-center">
            Last Published:{" "}
            <span className="ml-1 font-bold">
              {format(
                new Date(launchInformation.publishTimeStamp! ?? "1999/01/01"),
                "yyyy-MM-dd"
              )}
            </span>
            <span
              onClick={() => {
                navigator.clipboard.writeText(
                  `${process.env.NEXT_PUBLIC_DOMAIN_URL}/launch/${router.query.project}`
                );
              }}
              className="ml-10 flex cursor-pointer rounded-lg border-2 border-indigo-200 bg-indigo-50 px-3 py-1 text-indigo-600 transition-all hover:scale-105"
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>{" "}
              Copy Link
            </span>
            <span
              onClick={() => {
                window.open(
                  `${process.env.NEXT_PUBLIC_DOMAIN_URL}/launch/${router.query.project}`,
                  "_blank"
                );
              }}
              className="ml-5 flex cursor-pointer rounded-lg border-2 border-indigo-200 bg-indigo-50 px-3 py-1 text-indigo-600 transition-all hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Visit Live Launchpad
            </span>
          </div>
        )}

        <Button
          isLoading={isPublishingProject}
          disabled={isPublishingProject || isLoadingPublishedData}
          onClick={() => {
            handlePublishLaunchpad();
          }}
          className="mt-5 flex items-center gap-3"
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
              d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
            />
          </svg>
          Publish Project
        </Button>
      </div>
    </>
  );
}

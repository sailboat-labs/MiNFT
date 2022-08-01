import { format } from "date-fns";
import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getAddress } from "redux/reducers/selectors/user";

import { firestore } from "@/lib/firebase";

import Button from "@/components/buttons/Button";

import { IProjectLaunch } from "@/interfaces";

import { publishLaunchpad } from "../launchpad-config.logic";

export default function PublishLaunchPad() {
  const router = useRouter();
  const address = useSelector(getAddress);
  const [isPublishingProject, setIsPublishingProject] = useState(false);
  const [launchInformation, setLaunchInformation] = useState<IProjectLaunch>();

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
    const _doc = doc(
      firestore,
      `Projects/${router.query.project}/Launchpad/published`
    );
    const unsubscribe = onSnapshot(_doc, (snapshot) => {
      setLaunchInformation(snapshot.data() as IProjectLaunch);
      console.log({ data: snapshot.data() });
    });

    return () => {
      unsubscribe();
    };
  }, [router.query.project]);

  if (!launchInformation) return <div></div>;

  return (
    <div className="p-10">
      <div>Review your launchpad before publishing</div>
      <Button
        onClick={() => {
          // router.push(`/launch/preview/${router.query.project}`);
          window.open(`/launch/preview/${router.query.project}`, "_blank");
        }}
        className="mt-5"
      >
        Preview Launchpad
      </Button>

      <div className="mt-10 mb-5 flex items-center gap-5">
        <div className="text-xl">Publish</div>
        <div className=" flex-1 rounded-lg border "></div>
      </div>

      <div className="max-w-lg">
        Publish your launchpad for it to be available for viewing. Review your
        configuration once more to make sure every information is correct
      </div>

      {launchInformation.publishTimeStamp && (
        <div className="mt-10">
          Last Published:{" "}
          <span className="font-bold">
            {format(
              new Date(launchInformation.publishTimeStamp! ?? "1999/01/01"),
              "yyyy-MM-dd"
            )}
          </span>
        </div>
      )}

      <Button
        isLoading={isPublishingProject}
        disabled={isPublishingProject}
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
  );
}

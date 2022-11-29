import ProjectLaunch from "features/launch/launch/components/launchpad/launchpad";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAddress } from "redux/reducers/selectors/user";

import { hasAccessToProject } from "@/utils/authentication";

const LaunchpadPreview: NextPage = () => {
  const router = useRouter();
  const address = useSelector(getAddress);
  const [hasAccessToPreview, setHasAccessToPreview] = useState(false);
  const [isLoadingPreview, setIsLoadingPreview] = useState(true);

  async function checkUserValidity() {
    // console.log({ address, "slug:": router.query.project });

    if (!router.query.project || address.length < 1) return;
    setIsLoadingPreview(true);

    try {
      const hasAccess = await hasAccessToProject(
        router.query.project as string,
        address
      );

      // console.log({ hasAccess });
      setIsLoadingPreview(false);

      toast(hasAccess);

      setHasAccessToPreview(hasAccess);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingPreview(false);
    }

    // if (hasAccess == false) router.push("/dashboard");
  }

  useEffect(() => {
    checkUserValidity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query?.project, address]);

  return (
    <div>
      <div className="flex w-screen items-center justify-center bg-indigo-400 py-2 px-10 text-sm text-white transition-all">
        Launchpad Preview
      </div>
      <ProjectLaunch session="draft" />
    </div>
  );

  // return (
  //   <AuthGuard>
  //     {isLoadingPreview ? (
  //       <div className="flex h-screen w-screen items-center justify-center">
  //         <PageLoader />
  //       </div>
  //     ) : (
  //       <div>
  //         <div className="flex w-screen items-center justify-center bg-indigo-400 py-2 px-10 text-sm text-white transition-all">
  //           Launchpad Preview
  //         </div>
  //         <ProjectLaunch />
  //       </div>
  //     )}
  //   </AuthGuard>
  // );
};

export default LaunchpadPreview;

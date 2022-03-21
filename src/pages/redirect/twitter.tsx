/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";

import Layout from "@/components/layout/Layout";

export default function TwitterRedirect() {
  const router = useRouter();

  const { state } = router.query;

  return (
    <Layout>
      <div className="contained mt-20 flex w-full flex-col">
        <div className="mt-10 flex w-full items-center justify-center">
          <img
            className="h-28 w-28 rounded-full transition-all hover:-rotate-12 hover:scale-110"
            src="/images/twitter_logo.png"
            alt=""
          />
        </div>
        <span className="w-full mt-10 text-center text-2xl font-bold">
          Twitter Authentication Successful
        </span>
      </div>
    </Layout>
  );
}

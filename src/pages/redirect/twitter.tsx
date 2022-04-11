/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

import Layout from "@/components/layout/Layout";

export default function TwitterRedirect() {
  const router = useRouter();

  const { code } = router.query;

  const [generatingCode, setGeneratingCode] = useState(false);

  const [token, setToken] = useState();

  async function generateCode() {
    //Generate
    if (generatingCode) return;
    setGeneratingCode(true);

    try {
      const { data } = await axios.post(
        `https://us-central1-minft-production.cloudfunctions.net/twitter/create-token?code=${code}`
      );

      if (data) {
        setToken(data.access_token);
      }
    } catch (error) {
      console.log(error);
      setGeneratingCode(false);
    }

    setGeneratingCode(false);
  }

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
        <span className="mt-10 w-full text-center text-2xl font-bold">
          Twitter Authentication Successful
        </span>

        <div className="mt-10 flex w-full flex-col items-center justify-center text-center text-2xl font-bold">
          {/* <span className="">Authentication Code</span>
          <span className="text-sm">{code}</span> */}
          {code && !token && (
            <div
              onClick={() => {
                generateCode();
              }}
              className="mt-10 w-fit cursor-pointer rounded-lg bg-red-400 px-5 py-2 text-lg font-normal transition-all hover:bg-red-700"
            >
              {generatingCode ? "Please wait..." : "Generate Token"}
            </div>
          )}

          {token && (
            <>
              <span className="mt-10">Authentication Code</span>
              <span className="text-sm">{token}</span>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

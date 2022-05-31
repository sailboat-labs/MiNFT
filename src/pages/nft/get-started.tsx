import Head from "next/head";
import React from "react";

import NewProperty from "@/components/nft/NewProperty";

const GetStartedPage = () => {
  return (
    <>
      <Head>
        <title>Get Started</title>
      </Head>
      <section className="min-h-screen w-screen bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <NewProperty />
        </div>
      </section>
    </>
  );
};

export default GetStartedPage;

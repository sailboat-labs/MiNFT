import * as React from "react";

import Layout from "@/components/layout/Layout";
import Seo from "@/components/Seo";

export default function NotFoundPage() {
  return (
    <Layout>
      <Seo templateTitle="Not Found" />

      <main>
        <section className="">
          <div className="layout flex min-h-screen flex-col items-center justify-center text-center text-black">
            <h1 className="mt-8 text-4xl md:text-6xl">Page Not Found</h1>
          </div>
        </section>
      </main>
    </Layout>
  );
}

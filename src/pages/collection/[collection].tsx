/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/layout/Layout";
import Assets from "@/components/pages/collection/details/assets";
import CollectionSummary from "@/components/pages/collection/details/collection_summary";
import Comments from "@/components/pages/collection/details/comments";

export default function CollectionPage() {
  return (
    <Layout>
      <div className="pb-20">
        <div className="h-20">
          <img
            className="absolute h-20 w-full object-cover"
            src="/images/collection_page_top_images.png"
            alt=""
          />
          <div className="absolute h-20 w-full bg-gradient-to-r from-black to-transparent"></div>

          <div className="absolute z-[2] flex h-20 items-center gap-3 px-20 font-bold text-white">
            <img className="h-10 w-10" src="/images/discord_logo.png" alt="" />
            “Crazy news! Announcement of a new Cool Cats collection”
          </div>
        </div>
        <div className="contained mt-10 flex gap-5">
          <span className="text-red-500 underline">Article</span>
          <span>News</span>
        </div>
        <CollectionSummary />
        <Assets />
        <Comments />
      </div>
    </Layout>
  );
}

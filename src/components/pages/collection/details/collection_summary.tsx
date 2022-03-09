/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

import EthAddress from "@/components/shared/EthAddress";

import Roadmap from "./roadmap";
import CollectionStats from "./stats";
import TeamInfo from "./team_information";
import WhyILikeThisProject from "./WhyILikeProject";
import WishlistRequirements from "./wishlist_requirements";

import { Collection, OpenSeaCollection } from "@/types";

interface SocialLInk {
  name: string;
  link: string;
  image: string;
}
interface ICollectionSummaryProps {
  collection: Collection;
  openSeaData?: OpenSeaCollection;
  className?: string;
  setLoadingPage: any;
}

export default function CollectionSummary({
  collection,
  openSeaData,
  className,
  setLoadingPage,
}: ICollectionSummaryProps) {
  const router = useRouter();
  const { account, isAuthenticated } = useMoralis();
  const [socialLinks, setSocialLinks] = useState<SocialLInk[]>([]);

  useEffect(() => {
    const links = [];
    if (collection.twitter) {
      links.push({
        name: "Twitter",
        link: collection.twitter,
        image: "/images/twitter_logo.png",
      });
    }
    if (collection.discord) {
      links.push({
        name: "Discord",
        link: collection.discord,
        image: "/images/discord_logo.png",
      });
    }

    if (collection.whitepaper) {
      links.push({
        name: "Whitepaper",
        link: collection.whitepaper,
        image: "/images/whitepaper.jpeg",
      });
    }
    if (collection.website) {
      links.push({
        name: "Website",
        link: collection.website,
        image: "/images/website_logo.jpeg",
      });
    }

    setSocialLinks(links);
  }, [collection]);

  return (
    <>
      <div
        className={`contained mt-20 flex w-full flex-col gap-20 lg:flex-row ${className}`}
      >
        <div
          className={` mt-10  w-full lg:w-[70%] ${
            !openSeaData && "-translate-y-20"
          }`}
        >
          <div className="flex justify-between ">
            <div className="mt-10 text-2xl font-bold">{collection.name}</div>

            {account && isAuthenticated && account == collection.owner ? (
              <button
                className="gradient-button mt-10 rounded-lg bg-gray-200 px-6 font-bold"
                onClick={() => {
                  setLoadingPage(true);
                  router.push(
                    {
                      pathname: `/collection/add`,
                      query: {
                        collection: JSON.stringify(collection),
                      },
                    },
                    "/collection/add"
                  );
                }}
              >
                Edit
              </button>
            ) : (
              <></>
            )}
          </div>

          <div className="mt-3 text-sm text-gray-500">
            {collection.description}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-5 border-2 border-black px-5 py-3 md:grid-cols-3 xl:grid-cols-4">
            <div className="flex flex-col gap-2">
              <span className="font-bold">Presale Mint Date and Time</span>
              <span>
                {collection.preMintDate
                  ? dayjs(new Date(collection.preMintDate!)).format(
                      "DD/MM/YYYY, HH : MM "
                    )
                  : "N/A"}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">Public Mint Date and Time</span>
              <span>
                {collection.publicMintDate
                  ? dayjs(new Date(collection.publicMintDate!)).format(
                      "DD/MM/YYYY, HH : MM "
                    )
                  : "N/A"}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">Whitelist Available</span>
              <span className="capitalize">
                {collection.whitelistAvailable}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">Team Info</span>
              <span>{collection.teamInfo ? "Yes" : "No"}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold ">Project Type</span>
              <span className="capitalize">{collection.projectType}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">Presale Mint Cost</span>
              <span className="capitalize">
                {collection.preSaleCost ?? "TBA"}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">Public Mint Cost</span>
              <span className="capitalize">
                {collection.publicMintCost ?? "TBA"}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">Mint Per Presale</span>
              <span className="capitalize">
                {collection.mintsPerPresale ?? "TBA"}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">Mint Per Transaction</span>
              <span className="capitalize">
                {collection.mintsPerTx ?? "TBA"}
              </span>
            </div>
          </div>
          <TeamInfo info={collection.teamInfo!} />
          {openSeaData && (
            <CollectionStats
              collectionStats={openSeaData.stats}
              className="mt-10 justify-center"
            />
          )}
          <WishlistRequirements
            requirements={collection.whitelistRequirements!}
          />
          <Roadmap roadmap={collection.roadmap} />
          <WhyILikeThisProject whyIlikeProject={collection.whyILikeProject} />
        </div>
        <div className=" w-full rounded lg:w-[20%]">
          <div className="flex h-fit flex-col justify-end rounded-lg ">
            <img
              className="rounded-t-2 h-72"
              src={
                collection.image
                  ? collection.image
                  : openSeaData
                  ? openSeaData?.image_url
                  : "http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon"
              }
              alt=""
            />

            <div className="flex w-full items-center gap-5 rounded-b-lg border-2 border-t-0 bg-white px-3 py-3">
              <img
                className="h-12 w-12 rounded-full "
                src={
                  collection.image
                    ? collection.image
                    : openSeaData
                    ? openSeaData?.image_url
                    : "http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon"
                }
                alt=""
              />

              <div className="whitespace-wrap">{collection.name}</div>
            </div>
          </div>
          <table className="mt-5">
            <tbody>
              {openSeaData && (
                <>
                  <tr className="bg-white ">
                    <td className="whitespace-nowrap py-2  text-sm font-medium text-gray-900 ">
                      Contract Address
                    </td>
                    <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                      <EthAddress
                        className="-translate-x-2 px-2 py-1"
                        account={openSeaData.primary_asset_contracts[0].address}
                      />
                    </td>
                  </tr>
                  <tr className="bg-white ">
                    <td className="whitespace-nowrap py-2  text-sm font-medium text-gray-900 ">
                      Tokens Standard
                    </td>
                    <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                      {openSeaData.primary_asset_contracts[0].schema_name ?? ""}
                    </td>
                  </tr>
                </>
              )}
              <tr className="bg-white ">
                <td className="whitespace-nowrap py-2  text-sm font-medium text-gray-900 ">
                  Blockchain
                </td>
                <td className="whitespace-nowrap py-2 px-6 text-sm capitalize text-gray-500 ">
                  {collection.blockchain}
                </td>
              </tr>
              {collection.opensea && (
                <tr className="bg-white ">
                  <td className="whitespace-nowrap py-2  text-sm font-medium text-gray-900 ">
                    Opensea
                  </td>
                  <td
                    onClick={() => {
                      window.open(collection.opensea, "_blank");
                    }}
                    className="flex cursor-pointer items-center gap-2 whitespace-nowrap py-2 px-6 text-sm text-blue-500 transition-all hover:text-blue-900 "
                  >
                    {collection.opensea?.toString().split("/collection/")[1]}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
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
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="mt-10 flex flex-col gap-5 border-t-2 pt-5">
            {socialLinks.map((link, index) => (
              <div key={index} className="flex items-center gap-3">
                <img
                  alt=""
                  className="h-8 w-8 rounded-[50%] border-2 bg-white"
                  src={link.image}
                />
                <div
                  onClick={() => {
                    window.open(link.link, "_blank");
                  }}
                  className="flex cursor-pointer items-center gap-2 whitespace-nowrap text-sm text-blue-500 transition-all hover:text-blue-900 "
                >
                  {link.name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

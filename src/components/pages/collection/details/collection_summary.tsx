/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
import dayjs from "dayjs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import CollectionStats from "./stats";
import TeamInfo from "./team_information";
import WishlistRequirements from "./wishlist_requirements";

import { Collection } from "@/types";

interface SocialLInk {
  name: string;
  link: string;
  image: string;
}
interface ICollectionSummaryProps {
  collection: Collection;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}

export default function CollectionSummary({
  collection,
  setEditMode,
}: ICollectionSummaryProps) {
  const [socialLinks, setSocialLinks] = useState<SocialLInk[]>([]);

  useEffect(() => {
    const links = [];
    if (collection.twitter) {
      links.push({
        name: "Twitter",
        link: collection.twitter,
        image: "/images/discord_logo.png",
      });
    }
    if (collection.discord) {
      links.push({
        name: "Discord",
        link: collection.discord,
        image: "/images/discord_logo.png",
      });
    }

    setSocialLinks(links);
  }, [collection]);

  return (
    <>
      <div className="contained flex w-full flex-col gap-20 lg:flex-row">
        <div className=" w-full lg:w-[70%]">
          <div className="flex justify-between">
            <div className="mt-10 text-2xl font-bold">{collection.name}</div>
            <button
              className="mt-10 rounded-lg bg-gray-200 px-6 font-bold"
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>
          </div>

          <div className="mt-3 text-sm text-gray-500">
            {collection.description}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-5 border-2 border-black px-5 py-3 md:grid-cols-3 xl:grid-cols-4">
            <div className="flex flex-col gap-2">
              <span className="font-bold">Presale Mint Date and Time</span>
              <span>
                {dayjs(new Date(collection.preMintDate!)).format(
                  "DD/MM/YYYY, HH : MM "
                )}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">Public Mint Date and Time</span>
              <span>
                {dayjs(new Date(collection.publicMintDate!)).format(
                  "DD/MM/YYYY, HH : MM "
                )}
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
          </div>
          <TeamInfo info={collection.teamInfo!} />
          <CollectionStats className="mt-10 justify-center" />
          <WishlistRequirements
            requirements={collection.whitelistRequirements!}
          />
        </div>
        <div className=" w-full rounded lg:w-[30%]">
          <div className="flex h-[400px] cursor-pointer flex-col justify-end rounded-lg bg-gray-200">
            <img src={collection.image} alt="" />

            <div className=" flex w-full items-center gap-5 rounded-b-lg border-2 border-t-0 bg-white px-3 py-3">
              <img
                className="h-12 w-12 rounded-full bg-gray-100"
                src={collection.image}
                alt=""
              />

              <div className="whitespace-wrap">{collection.name}</div>
            </div>
          </div>
          <table className="mt-5">
            <tbody>
              <tr className="bg-white ">
                <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                  Contract Address
                </td>
                <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                  0x4123423412342213423
                </td>
              </tr>
              <tr className="bg-white ">
                <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                  Tokens Standard
                </td>
                <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                  ERC 721
                </td>
              </tr>
              <tr className="bg-white ">
                <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 ">
                  Blockchain
                </td>
                <td className="whitespace-nowrap py-2 px-6 text-sm text-gray-500 ">
                  Ethereum
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-10 flex flex-col gap-5">
            {socialLinks.map((link, index) => (
              <div key={index} className="flex items-center gap-5">
                <img alt="" className="h-10 w-10" src={link.image} />
                <span className="font-bold">{link.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

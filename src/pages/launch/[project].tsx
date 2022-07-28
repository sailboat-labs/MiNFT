import { NextPage } from "next";
import Link from "next/link";
import React, { useState } from "react";

const ProjectLaunch: NextPage = () => {
  const [activeTab, setActiveTab] = useState<string>("roadmap");
  return (
    <div className="overflow-y-auto px-6">
      <div className="container mx-auto h-screen max-w-[1664px] divide-y">
        <section className="grid py-24 md:grid-cols-2">
          {/* left side */}
          <article className="md:pr-12 lg:pr-32">
            <h1 className="text-6xl font-extrabold">
              Tomorrowland: The Reflection of Love
            </h1>
            <div className="my-4 inline-flex items-center gap-3 text-sm">
              <div className="rounded border border-pink-500 py-1 px-2 text-pink-500 ">
                DOXXED
              </div>
              <div className="rounded border border-pink-500 py-1 px-2 text-pink-500 ">
                ESCROW 7d
              </div>
              <div className="flex items-center gap-2 rounded border border-gray-300 py-1 px-2 text-gray-400 ">
                <span>Total items:</span>
                <strong className=" font-semibold">1,578</strong>
              </div>
              <div className="flex items-center gap-2 rounded border border-gray-300 py-1 px-2 text-gray-400 ">
                <span>Price:</span>
                <strong className=" font-semibold">3◎</strong>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <p className="my-4">
              This collection grants exclusive giveaways, accesses secret shows,
              and helps complete your Medallion of Memoria, the ultimate
              Tomorrowland experience.
            </p>
            <p>
              Read our&nbsp;
              <Link href="/terms-and-conditions">
                <a className="relative font-medium text-pink-500 before:absolute before:top-full before:left-0 before:h-[2px] before:w-0 before:bg-pink-400 before:transition-all before:duration-150 before:hover:w-full">
                  terms & conditions
                </a>
              </Link>
            </p>
            <div className="mt-6 grid grid-rows-2 gap-5">
              <div className=" rounded-2xl  p-4 ring-1 ring-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-medium  rounded-full bg-gray-100 py-1 px-2 text-sm text-gray-700 ring-1 ring-gray-200">
                    Whitelist Mint
                  </span>
                  <span className="font-semibold text-pink-500">ENDED</span>
                </div>
                <p className="mt-6 text-sm">
                  <span>
                    WHITELIST <strong className="font-semibold">4463</strong>
                  </span>{" "}
                  •{" "}
                  <span>
                    MAX <strong className="font-semibold">5 TOKENS</strong>
                  </span>{" "}
                  • <span>Price 3◎</span>
                </p>
              </div>
              <div className=" rounded-2xl  p-4 ring-1 ring-pink-400">
                <div className="flex items-center justify-between">
                  <span className="text-medium  rounded-full bg-gray-100 py-1 px-2 text-sm text-gray-700 ring-1 ring-gray-200">
                    Public
                  </span>
                </div>
                <p className="mt-6 text-sm">
                  <span>UNLIMITED</span> • <span>Price 3◎</span>
                </p>
              </div>
            </div>
          </article>
          {/* right side */}
          <article>
            <figure className="overflow-hidden rounded-2xl">
              <img
                className="h-auto w-4/5"
                src="/images/launch-project.gif"
                alt=""
              />
            </figure>
          </article>
        </section>
        <section className="grid py-24 md:grid-cols-2">
          <article className="md:pr-12 lg:pr-32">
            <h1 className="text-6xl font-extrabold">
              Tomorrowland: The Reflection of Love
            </h1>
            <p className="my-5 text-gray-500">
              Tomorrowland Music Festival started in 2005 with 10,000 attendees,
              organized and still owned by two Belgian brothers. Now in its 16th
              year, Tomorrowland is one of the largest electronic music
              festivals in the world, with more than 400,000 attendees to its
              annual summer festival, topping 600,000 in 2022, and tickets
              always selling out in minutes. Tomorrowland has been voted the
              World&apos;s Best Music Event five times at the International
              Dance Music awards, and has been officially recognized by the UN
              as a symbol of global unity and community by Secretary General Ban
              Ki-Moon.
            </p>
            <p className="my-5 text-gray-500">
              The Tomorrowland Belgium 2022 collection, The Reflection of Love,
              offers holders unparalleled access to Tomorrowland for its biggest
              fans. Holders may participate in weekly exclusive giveaways of
              Tomorrowland fashion, events, experiences, backstage tours, and
              more, through holders-only community channels. These giveaways
              occur year-round. Holders attending Tomorrowland Belgium 2022 may
              also access an exclusive holder&apos;s only stage, with secret
              shows from massive artists.
            </p>
            <p className="my-5 text-gray-500">
              The Reflection of Love Collection is part of a series of three
              collections this year, along with a collection released at
              Tomorrowland Winter (A Letter from the Universe), and a collection
              dropping in the Fall. Own one NFT from each of these three
              collections to assemble the Medallion of Memoria; the ultimate
              Tomorrowland fan experience.
            </p>
            <p className="my-5 text-gray-500">
              The Medallion of Memoria grants perpetual access to exclusive
              giveaways and secret shows at Tomorrowland events. Furthermore,
              holders get guaranteed access to tickets for future Tomorrowland
              events, forever. Never worry about securing tickets, ever again.
              With events selling out in minutes, this utility has never been
              offered by Tomorrowland before. Finally, holders have the option
              to burn their Medallion in exchange for a full weekend ticket to
              the next Tomorrowland. A full breakdown of the NFT utility and art
              is available at <a href="https://minft.com"></a>
            </p>
            <p className="my-5 text-gray-500">
              From a completely custom made social media network made in 2015,
              to becoming the first cashless music festival, to developing
              online metaversal music festivals during covid with over one
              million concurrent viewers, Tomorrowland&apos;s focus has always
              been on crafting the greatest fan experiences and communities
              through new technologies. The NFT collections and Medallion of
              Memoria are the ultimate expression of this commitment and the
              first steps on a journey into web3 by one of the world&apos;s
              biggest music festivals.
            </p>
            <p className="my-5 text-gray-500">
              Gather the Collection. Assemble the Medallion. Unite Forever, at
              Tomorrowland.
            </p>
          </article>
          <article>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveTab("roadmap")}
                className={`py-2 pr-4 font-semibold ${
                  activeTab === "roadmap" && "border-b-2 border-pink-500"
                }`}
              >
                Roadmap
              </button>
              <button
                onClick={() => setActiveTab("team")}
                className={`px-4 py-2 font-semibold ${
                  activeTab === "team" && "border-b-2 border-pink-500"
                }`}
              >
                Team
              </button>
            </div>
            <div className="mt-6">
              {activeTab === "roadmap" ? (
                <>
                  <div>
                    <strong>Spring (finished)</strong>
                    <ul className="ml-6 mb-6 list-disc text-gray-600">
                      <li>
                        Drop of the 1st Tomorrowland NFT collection: A Letter
                        from the Universe
                      </li>
                      <li>
                        First secret shows for holders only at Tomorrowland
                        Winter
                      </li>
                      <li>
                        Start of the Tomorrowland holders community and
                        exclusive giveaways
                      </li>
                    </ul>
                  </div>
                  <div>
                    <strong>Summer</strong>
                    <ul className="ml-6 mb-6 list-disc text-gray-600">
                      <li>
                        Launch of NFT Ticketing Experiment for Tomorrowland
                        Belgium 2022
                      </li>
                      <li>Start of NFT partnerships and collaborations</li>
                      <li>
                        Drop of the 2nd Tomorrowland NFT collection: The
                        Reflection of Love
                      </li>
                      <li>New secret events & giveaways</li>
                      <li>
                        Expanding the team to work on enhanced community
                        engagement
                      </li>
                    </ul>
                  </div>
                  <div>
                    <strong>Fall</strong>
                    <ul className="ml-6 mb-6 list-disc text-gray-600">
                      <li>
                        Drop of the 3rd Tomorrowland NFT collection: Name TBD
                      </li>
                      <li>The Launch of the Medallion of Memoria</li>
                      <li>
                        New verification flows for buyers to join exclusive
                        moments
                      </li>
                      <li>
                        Tomorrowland 2023 ticket presale for Medallion holders
                      </li>
                      <li>Launching brand partnerships in web 3</li>
                    </ul>
                  </div>
                  <div>
                    <strong>2023</strong>
                    <ul className="ml-6 mb-6 list-disc text-gray-600">
                      <li>Tomorrowland IP entering the metaverse</li>
                      <li>Potential of Digital shows</li>
                      <li>Future of Music NFTs</li>
                      <li>Potential of tokenomics</li>
                      <li>Potential of NFT ticketing</li>
                      <li>
                        Helping other projects by leveraging the Tomorrowland
                        Brand.
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <p>
                  The Tomorrowland team consists of 140 people, based in
                  Antwerp, Belgium. This huge group of talented and ambitious
                  individuals push the Tomorrowland experience to the maximum,
                  day in and day out. Everything related to this NFT is created
                  by the in-house creative, narrative, and tech teams, with
                  support from the entire company.
                </p>
              )}
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default ProjectLaunch;

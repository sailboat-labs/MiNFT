import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import DownSVG from "~/svg/homeV2/down.svg";

export default function FAQ() {
  const FAQ: { title: string; details: JSX.Element }[] = [
    {
      title: "How it works?",
      details: (
        <div className="flex flex-col gap-5">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc luctus
            diam nunc. Duis blandit turpis enim, eu sollicitudin felis auctor
            vitae. Fusce egestas felis ac lectus egestas gravida. Morbi lacus
            erat, bibendum viverra mauris vitae, pretium ornare dolor. Phasellus
            libero metus, vehicula nec viverra non, fringilla id orci.
            Suspendisse placerat.
          </p>
        </div>
      ),
    },
    {
      title: "Magic Mynt Contract",
      details: (
        <div className="flex flex-col gap-5">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc luctus
            diam nunc. Duis blandit turpis enim, eu sollicitudin felis auctor
            vitae. Fusce egestas felis ac lectus egestas gravida. Morbi lacus
            erat, bibendum viverra mauris vitae, pretium ornare dolor. Phasellus
            libero metus, vehicula nec viverra non, fringilla id orci.
            Suspendisse placerat.
          </p>
        </div>
      ),
    },
    {
      title: "Magic Mynt List",
      details: (
        <div className="flex flex-col gap-5">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc luctus
            diam nunc. Duis blandit turpis enim, eu sollicitudin felis auctor
            vitae. Fusce egestas felis ac lectus egestas gravida. Morbi lacus
            erat, bibendum viverra mauris vitae, pretium ornare dolor. Phasellus
            libero metus, vehicula nec viverra non, fringilla id orci.
            Suspendisse placerat.
          </p>
        </div>
      ),
    },
    {
      title: "Magic Mynt",
      details: (
        <div className="flex flex-col gap-5">
          <p>
            We’ve seen countless Sheets and Docs flying in the NFT space - all
            trying to solve a crucial challenge: how and where do you find out
            about good projects - both before mint for the profitable flip and
            after mint for the long-term ride.
          </p>
          <p>
            Magic Mynt is like the product hunt, or amazon for NFT projects: - a
            decentralized, crowd-sourced and living knowledge hub for all
            projects that we as a community care about. The platform will
            combine quantitative project metrics with qualitative descriptions
            of the projects by those who know them the best - their holders.
          </p>
          <p>
            We aim to be the first port of call when you want to find out about
            that new trending project, introduce a friend to a new project or
            browse any upcoming mints
          </p>
        </div>
      ),
    },
  ];

  const [selectedItem, setSelectedItem] = useState(-1);

  const wrapperElement = useRef<any>(null);
  const q = gsap.utils.selector(wrapperElement);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const scrollButtonAnim = gsap.from("#faq-text", {
      // rotate:-15,
      y: 200,
      // opacity: 0,

      scrollTrigger: {
        trigger: "#faq-anim-trigger",
        start: "top 100%",
        end: "top start",
        toggleActions: "restart pause resume reverse",
        scrub: 0.8,
        // markers: true,
      },
    });

    return () => {
      scrollButtonAnim.kill();
    };
  }, []);

  return (
    <section id="faq" className="mx-auto w-4/5 pt-20 lg:w-3/5 2xl:w-3/5">
      <div className="relative z-[2]">
        <h1 className="font-yeseva text-4xl font-normal text-[#1D1D1D] xl:text-5xl 2xl:text-6xl">
          FAQ
        </h1>
        <p
          className="flex py-5 font-montserrat text-base font-medium text-[#222020] sm:w-96 2xl:w-[40rem] 2xl:text-3xl"
          id="faq-anim-trigger"
        >
          Browse and build your collection of the world’s most cutting-edge
          digital art
        </p>
        <div className="mt-5 flex flex-col border-t border-black">
          {FAQ.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                selectedItem == index
                  ? setSelectedItem(-1)
                  : setSelectedItem(index);
              }}
            >
              <h2 id="accordion-collapse-heading-1">
                <button
                  type="button"
                  className={`${
                    selectedItem == index ? "bg-black text-white" : ""
                  } flex w-full items-center justify-between border-b border-black bg-opacity-80 p-5 text-left font-normal text-black focus:ring-black 2xl:py-7`}
                  data-accordion-target="#accordion-collapse-body-1"
                  aria-expanded="true"
                  aria-controls="accordion-collapse-body-1"
                >
                  <span className="font-yeseva text-base xl:text-xl 2xl:text-3xl">
                    {item.title}
                  </span>
                  <DownSVG
                    data-accordion-icon=""
                    className={`h-6 w-6 shrink-0 transition-all  ${
                      selectedItem == index ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
              </h2>
              <div
                className={`rounded-b-xl ${
                  selectedItem == index
                    ? "h-auto opacity-100 "
                    : "pointer-events-none h-0 opacity-0"
                }`}
              >
                <div className="border-b border-black p-5 dark:border-gray-700 dark:bg-gray-900 2xl:text-2xl">
                  {item.details}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

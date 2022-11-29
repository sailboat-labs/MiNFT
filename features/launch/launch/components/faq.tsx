import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import { IProjectLaunch } from "@/interfaces";

interface AppProps {
  headingClass?: string;
  launchInformation?: IProjectLaunch;
}

export default function FAQ({ headingClass, launchInformation }: AppProps) {
  const [FAQ, setFaqs] = useState(launchInformation?.faq ?? []);

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

  useEffect(() => {
    if (launchInformation?.faq) setFaqs(launchInformation?.faq);
  }, [launchInformation]);

  return (
    <div
      id="faq"
      ref={wrapperElement}
      data-accordion="collapse"
      className="contained py-10 pb-20"
    >
      <div
        id="faq-text"
        className="absolute -translate-x-[11rem] -rotate-90 text-8xl text-gray-200 dark:text-gray-700 lg:text-[6rem]"
      >
        FAQs
      </div>
      <div className="relative z-[2]">
        <a href="#faq" className="flex" id="faq-anim-trigger">
          <strong className={` mb-5 text-xl ${headingClass}`}>
            Frequently Asked Questions
          </strong>
        </a>
        <span className="text-gray-700 dark:text-gray-300">
          Here are answers to some frequently asked questions
        </span>
        <div className="mt-5 flex flex-col gap-3 pb-10">
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
                    selectedItem == index ? "rounded-t-xl" : "rounded-xl"
                  } flex w-full items-center justify-between border border-b-0 border-gray-200 bg-gray-100 bg-opacity-80 p-5 text-left font-medium text-gray-900 hover:bg-gray-100 focus:ring-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:bg-opacity-80 dark:text-white dark:text-gray-200 dark:hover:bg-gray-800`}
                  data-accordion-target="#accordion-collapse-body-1"
                  aria-expanded="true"
                  aria-controls="accordion-collapse-body-1"
                >
                  <span className="text-sm">{item.question}</span>
                  <svg
                    data-accordion-icon=""
                    className={`h-6 w-6 shrink-0 transition-all  ${
                      selectedItem == index ? "rotate-180" : "rotate-0"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </h2>
              <div
                className={`rounded-b-xl ${
                  selectedItem == index
                    ? "h-auto opacity-100 "
                    : "pointer-events-none h-0 opacity-0"
                }`}
              >
                <div className="rounded-b-xl border border-gray-200 p-5  dark:border-gray-700 dark:bg-gray-900">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

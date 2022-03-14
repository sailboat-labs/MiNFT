import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

export default function FAQ() {
  const FAQ: { title: string; details: JSX.Element }[] = [
    {
      title: "What is MiNFT",
      details: (
        <div className="flex flex-col gap-5">
          <p>
            We’ve seen countless Sheets and Docs flying in the NFT space - all
            trying to solve a crucial challenge: how and where do you find out
            about good projects - both before mint for the profitable flip and
            after mint for the long-term ride.
          </p>
          <p>
            MiNFT is like the product hunt, or amazon for NFT projects: - a
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
    {
      title: "What projects can I add to MiNFT?",
      details: (
        <div className="flex flex-col gap-5">
          <p>
            Any! MiNFT is a place to learn about NFT projects - from ones that
            are still in stealth and only have a mysterious twitter account or
            closed discord server to long established OG projects.
          </p>

          <p>
            We want MiNFT to be your number one place to find out about upcoming
            mints the community is excited about as well as a trusted resource
            to learn more about existing projects.
          </p>
        </div>
      ),
    },
    {
      title: "How can I add a project",
      details: (
        <div>
          Adding a project is as easy as connecting your wallet, signing a
          gasless transaction to confirm you’re the owner and then adding a
          project you know a lot about. Once submitted, you can edit it when
          logged into the same wallet.
        </div>
      ),
    },
    {
      title: "How can I contribute to existing projects",
      details: (
        <div>
          Under every project is a Comment feature where anyone logged into
          their wallet can share their alpha on the project. Comments can be
          upvoted to help bring useful content to the top.
        </div>
      ),
    },
    {
      title: "Why should I contribute",
      details: (
        <div className="flex flex-col gap-5">
          <div>
            Alpha shared is alpha doubled. We believe that good projects should
            get the attention they deserve and want MiNFT to become the place
            for the space to look for high quality projects backed by the
            community.
          </div>
          <div>
            In the long run, we’re also working on tokenomics that reward
            contributors according to the quality and quantity of their work.
            Wen airdrop?
          </div>
        </div>
      ),
    },
    {
      title: "What if a project has mistakes? ",
      details: (
        <div className="flex flex-col gap-5">
          Click the comment/get in touch button and leave your feedback. We are
          still working on a way to crowdsource accurate knowledge about each
          project. In the future we plan to introduce edit functionality for
          verified holders of the project and OG contributors similar to
          Wikipedia but powered by our token. If you have ideas please reach
          out!
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
    <div
      id="faq"
      ref={wrapperElement}
      data-accordion="collapse"
      className="contained mt-10"
    >
      <div
        id="faq-text"
        className="absolute -translate-x-[11rem] translate-y-5 -rotate-90 text-8xl text-gray-200 dark:text-gray-700 lg:text-[6rem]"
      >
        FAQs
      </div>
      <div className="relative z-[2]">
        <a href="#faq" className="flex" id="faq-anim-trigger">
          <strong className="text-xl dark:text-white">
            Frequently Asked Questions
          </strong>
        </a>
        <span className="text-gray-700 dark:text-gray-300">
          Here are answers to some frequently asked questions
        </span>
        <div className="mt-5 flex flex-col gap-3">
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
                  } flex w-full items-center justify-between border border-b-0 border-gray-200 bg-gray-100 bg-opacity-80 p-5 text-left font-medium text-gray-900 hover:bg-gray-100 focus:ring-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:bg-opacity-80 dark:text-white dark:hover:bg-gray-800`}
                  data-accordion-target="#accordion-collapse-body-1"
                  aria-expanded="true"
                  aria-controls="accordion-collapse-body-1"
                >
                  <span className="text-sm">{item.title}</span>
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
                  {item.details}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

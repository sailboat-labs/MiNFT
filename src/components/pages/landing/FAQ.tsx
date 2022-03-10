import { useState } from "react";

export default function FAQ() {
  const FAQ: { title: string; details: any }[] = [
    { title: "What is NFT", details: "NFT is a non fungible token" },
    { title: "What is NFT", details: "NFT is a non fungible token" },
    { title: "What is NFT", details: "NFT is a non fungible token" },
  ];

  const [selectedItem, setSelectedItem] = useState(-1);

  return (
    <div id="faq" data-accordion="collapse" className="contained mt-10">
      <a href="#faq" className="flex">
        <strong className="text-xl dark:text-white">
          Frequently Asked Questions
        </strong>
      </a>
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
                } flex w-full items-center justify-between border border-b-0 border-gray-200 bg-gray-100 p-5 text-left font-medium text-gray-900 hover:bg-gray-100 focus:ring-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-800`}
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
  );
}

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";

type props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSelectedCategory: any;
  selectedCategory: string;
};

export const categories: { label: string; image: string }[] = [
  { label: "art", image: "/images/art_category.png" },
  { label: "photography", image: "/images/photography_category.png" },
  { label: "collectibles", image: "/images/collectibles_category.png" },
  { label: "utility", image: "/images/utility_category.png" },
  { label: "domain names", image: "/images/domain_names_category.png" },
  { label: "music", image: "/images/music_category.png" },
  { label: "gaming", image: "/images/music_category.png" },
  { label: "pfp", image: "/images/music_category.png" },
];

export default function ExploreCategories({
  selectedCategory,
  setSelectedCategory,
}: props) {
  const [hoveredCategory, setHoveredCategory] = useState(-1);

  return (
    <div className="mt-10">
      <strong className="text-xl">Explore by Categories</strong>
      <div className="mt-5 grid grid-cols-1 gap-8 md:grid-cols-3 xl:grid-cols-4 ">
        {categories.map((category, index) => (
          <div
            onClick={() => {
              if (selectedCategory == category.label) {
                setSelectedCategory("all");
              } else {
                setSelectedCategory(category.label);
              }
            }}
            onMouseOver={() => {
              setHoveredCategory(index);
            }}
            onMouseLeave={() => {
              setHoveredCategory(-1);
            }}
            className={`flex cursor-pointer rounded-lg  transition-all hover:scale-105 
            ${
              hoveredCategory == index || hoveredCategory == -1
                ? "opacity-100"
                : "opacity-90"
            }
            ${
              selectedCategory == category.label
                ? "scale-105 bg-primaryblue bg-opacity-70 opacity-100 hover:bg-opacity-80 "
                : selectedCategory == "all"
                ? "scale-100 bg-gray-100 opacity-100 dark:border-2 dark:border-gray-500 dark:bg-black"
                : "scale-100 opacity-50"
            }
            
            `}
            key={index}
          >
            <div className="flex h-20 w-2/5 items-center rounded-l-lg bg-red-200">
              <img
                alt=""
                src={category.image}
                className="h-full w-full rounded-l-lg object-cover"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`absolute top-1 right-1 h-6 w-6 transition-all ${
                  selectedCategory == category.label
                    ? "scale-100 opacity-100"
                    : "scale-50 opacity-0"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>{" "}
            </div>
            <span className="flex items-center justify-center px-5 py-4 font-bold capitalize">
              {category.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

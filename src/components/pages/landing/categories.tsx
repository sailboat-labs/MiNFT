/* eslint-disable @next/next/no-img-element */
export default function ExploreCategories() {
  const categories: { label: string; image: string }[] = [
    { label: "Art", image: "/images/art_category.png" },
    { label: "Photography", image: "/images/photography_category.png" },
    { label: "Collectibles", image: "/images/collectibles_category.png" },
    { label: "Utility", image: "/images/utility_category.png" },
    { label: "Domain Names", image: "/images/domain_names_category.png" },
    { label: "Music", image: "/images/music_category.png" },
  ];

  return (
    <div className="contained mt-10">
      <strong className="text-xl">Explore by Categories</strong>
      <div className="mt-5 grid grid-cols-1 gap-8 md:grid-cols-3 xl:grid-cols-4 ">
        {categories.map((category, index) => (
          <div
            className="flex cursor-pointer rounded-lg bg-gray-100 transition-all hover:scale-105 hover:bg-gray-200"
            key={index}
          >
            <div className="h-full w-2/5 rounded-l-lg bg-red-200">
              <img
                alt=""
                src={category.image}
                className="h-full w-full rounded-l-lg object-cover"
              />
              {/* <div className='h-full w-full rounded-l-lg bg-gradient-to-r from-black to-transparent opacity-80'></div> */}
            </div>
            <span className="px-5 py-4 font-bold">{category.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */

export default function DeployContract() {
  const contracts: { label: string; description: string }[] = [
    { label: "Classic Mint", description: "Normal Mint" },
    { label: "Dutch Auction", description: "Normal Mint" },
    { label: "Fair Dutch Auction ", description: "Normal Mint" },
    { label: "Pure Whitelist", description: "Normal Mint" },
  ];

  return (
    <div className="pb-20">
      <div className="px-20 pb-5 font-dmsans text-6xl font-extrabold text-[#675C4C]">
        Deploy your contract
      </div>
      <div className="px-20 font-dmsans text-lg font-extrabold text-[#675C4C]">
        Everything contract you need, in one place.
      </div>

      <div className="flex gap-5 px-20 pt-20">
        {contracts.map((item, index) => (
          <a
            key={index}
            href=""
            className="group relative block h-72 w-96 text-white"
          >
            <span className="absolute inset-0 border-2 border-dashed border-white"></span>

            <div className="relative flex h-full transform items-end border-2 border-black  bg-[#675C4C] transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
              <div className="px-8 pb-8 transition-opacity group-hover:absolute group-hover:opacity-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <h2 className="mt-4 text-2xl font-medium">{item.label}</h2>
              </div>

              <div className="absolute p-8 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100">
                <h2 className="mt-4 text-2xl font-medium">{item.label}</h2>

                <p className="mt-4">{item.description}</p>

                <p className="mt-8 font-bold">Read more</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

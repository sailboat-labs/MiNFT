// ! BANNER WITH CAROUSEL / SLIDE SHOW OF INFORMATION

 import "tw-elements";

import ButtonLink from "@/components/links/ButtonLink";

export default function Test_Banner() {
  return (
    <div className="mb-8 h-[60vh]">
      <div className="flex items-center justify-end gap-5 p-5">
        <ButtonLink href="">Contact Us</ButtonLink>
      </div>
      <div
        id="carouselExampleIndicators"
        className="slide carousel relative mx-auto mt-14 w-3/5 "
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators absolute right-0 bottom-0 left-0 mb-4 flex justify-center p-0">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
        </div>
        <div className="carousel-inner h-[43vh] overflow-hidden font-montserrat">
          <div className="active carousel-item mx-auto h-[40vh] w-2/3 text-white">
            <h3 className="py-7 text-7xl">MiNFT</h3>
            <p className="w-4/5 text-2xl font-medium">
              No code tool for creating, launching and managing your NFTs.
            </p>
            <div className="my-4 md:mt-8">
              <div className="group relative inline-block cursor-pointer focus:outline-none">
                <span className="relative z-10 block rounded border px-12 py-3 font-dmsans  text-sm font-extrabold uppercase  text-white transition group-hover:scale-105">
                  Join Waitlist
                </span>
                <span className="absolute inset-0 -rotate-3 scale-105 rounded bg-[#675C4C] transition group-hover:rotate-0"></span>
              </div>
            </div>
          </div>
          <div className="carousel-item mx-auto h-[40vh] w-2/3 text-white">
            <h3 className="py-7 text-7xl">Why MiNFT?</h3>
            <p className="w-4/5 text-2xl font-medium">
              You, the creator, have total control in one easy-to-use tool.
            </p>
            <div className="mt-4 md:mt-8">
              <div className="group relative inline-block cursor-pointer focus:outline-none">
                <span className="relative z-10 block rounded border px-12 py-3 font-dmsans  text-sm font-extrabold uppercase  text-white transition group-hover:scale-105">
                  Start Now
                </span>
                <span className="absolute inset-0 -rotate-3 scale-105 rounded bg-[#675C4C] transition group-hover:rotate-0"></span>
              </div>
            </div>
          </div>
          <div className="carousel-item mx-auto h-[40vh] w-2/3 text-white">
            <h3 className="py-7 text-7xl">How it works</h3>
            <p className="w-4/5 text-2xl font-medium">
              Create your layers, import your assets, click “Generate” and you
              are done!
            </p>
            <div className="mt-4 md:mt-8">
              <div className="group relative inline-block cursor-pointer focus:outline-none">
                <span className="relative z-10 block rounded border px-12 py-3 font-dmsans  text-sm font-extrabold uppercase  text-white transition group-hover:scale-105">
                  Register interest
                </span>
                <span className="absolute inset-0 -rotate-3 scale-105 rounded bg-[#675C4C] transition group-hover:rotate-0"></span>
              </div>
            </div>
          </div>
          <div className="carousel-item mx-auto h-[40vh] w-2/3 text-white">
            <h3 className="py-7 text-7xl">MiNFT Contract</h3>
            <p className="w-4/5 text-2xl font-medium">
              Use our templates to create your very own smart contract without
              code.
            </p>
            <div className="mt-4 md:mt-8">
              <div className="group relative inline-block cursor-pointer focus:outline-none">
                <span className="relative z-10 block rounded border px-12 py-3 font-dmsans  text-sm font-extrabold uppercase  text-white transition group-hover:scale-105">
                  Check it out
                </span>
                <span className="absolute inset-0 -rotate-3 scale-105 rounded bg-[#675C4C] transition group-hover:rotate-0"></span>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev absolute top-0 bottom-0 left-0 flex items-center justify-center border-0 p-0 text-center hover:no-underline hover:outline-none focus:no-underline focus:outline-none"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon inline-block bg-no-repeat"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next absolute top-0 bottom-0 right-0 flex items-center justify-center border-0 p-0 text-center hover:no-underline hover:outline-none focus:no-underline focus:outline-none"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon inline-block bg-no-repeat"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

{
  /*
const slides: { heading: string; description: string; action: string }[] = [
  {
    heading: "MiNFT",
    description:
      "No code tool for creating, launching, and managing your NFTs.",
    action: "Join Waitlist",
  },
  {
    heading: "Why MiNFT?",
    description:
      "You, the creator, have total control in one easy-to-use tool.",
    action: "Start Now!",
  },
  {
    heading: "How it works",
    description:
      "Create your layers, import your assets, click “Generate” and you are done!",
    action: "Register interest",
  },
  {
    heading: "MiNFT Contract",
    description:
      "Use our templates to create your very own smart contract without code.",
    action: "Check it out",
  },
];
*/
}

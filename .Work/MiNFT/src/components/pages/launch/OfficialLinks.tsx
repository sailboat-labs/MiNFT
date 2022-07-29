import React from "react";

const OfficialLinks = () => {
  return (
    <section className="bg-black py-32">
      <div className="contained">
        <h3 className="relative mx-auto w-fit text-center text-4xl font-semibold text-white before:absolute before:top-[length:calc(100%+1rem)] before:left-1/2 before:h-1 before:w-1/3 before:-translate-x-1/2 before:transform before:bg-pink-500">
          Official Links
        </h3>
        <div className="mt-24 flex flex-wrap justify-center gap-12">
          <div className="align-center before:-z-1 relative flex min-w-[250px] flex-col justify-center bg-white p-8 before:absolute before:-right-0 before:top-0 before:h-full before:w-full before:border-2 before:border-dashed before:border-pink-500 before:transition-all before:duration-200 after:absolute after:inset-0 after:z-10 after:bg-white hover:cursor-pointer before:hover:-top-2 before:hover:-right-2">
            <img
              className="min-h-10 relative z-20 mx-auto h-auto w-20"
              src="/images/etherscan-logo.webp"
              alt=""
            />
            <strong className="relative z-20 mt-4 text-center">
              Etherscan
            </strong>
          </div>
          <div className="align-center before:-z-1 relative flex min-w-[250px] flex-col justify-center bg-white p-8 before:absolute before:-right-0 before:top-0 before:h-full before:w-full before:border-2 before:border-dashed before:border-pink-500 before:transition-all before:duration-200 after:absolute after:inset-0 after:z-10 after:bg-white hover:cursor-pointer before:hover:-top-2 before:hover:-right-2">
            <img
              className="min-h-10 relative z-20 mx-auto h-auto w-20"
              src="/images/opensea.webp"
              alt=""
            />
            <strong className="relative z-20 mt-4 text-center">OpenSea</strong>
          </div>
          <div className="align-center before:-z-1 relative flex min-w-[250px] flex-col justify-center bg-white p-8 before:absolute before:-right-0 before:top-0 before:h-full before:w-full before:border-2 before:border-dashed before:border-pink-500 before:transition-all before:duration-200 after:absolute after:inset-0 after:z-10 after:bg-white hover:cursor-pointer before:hover:-top-2 before:hover:-right-2">
            <img
              className="min-h-10 relative z-20 mx-auto h-auto w-20"
              src="/images/looksrare_300.webp"
              alt=""
            />
            <strong className="relative z-20 mt-3 text-center">
              LooksRare
            </strong>
          </div>
          <div className="align-center before:-z-1 relative flex min-w-[250px] flex-col justify-center bg-white p-8 before:absolute before:-right-0 before:top-0 before:h-full before:w-full before:border-2 before:border-dashed before:border-pink-500 before:transition-all before:duration-200 after:absolute after:inset-0 after:z-10 after:bg-white hover:cursor-pointer before:hover:-top-2 before:hover:-right-2">
            <img
              className="min-h-10 relative z-20 mx-auto h-auto w-20"
              src="/images/x2y2.webp"
              alt=""
            />

            <strong className="relative z-20 mt-3 text-center">X2Y2</strong>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfficialLinks;

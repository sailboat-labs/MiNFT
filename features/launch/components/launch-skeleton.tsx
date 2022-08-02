import React from "react";

import Skeleton from ".";

const LaunchPadSkeleton = () => {
  return (
    <section className="h-screen">
      <div className="container mx-auto mt-8 max-w-[1664px]  px-6 py-24 lg:grid lg:grid-cols-2 ">
        {/* left side */}
        <article className="md:pr-12 lg:pr-32">
          <Skeleton type="heading" className="!h-12" />
          <div className="mt-6 mb-5 ml-0.5 flex gap-3">
            <Skeleton type="rect" className="h-5 !max-w-[130px]" />
            <Skeleton type="rect" className="h-5 !max-w-[130px]" />
            <Skeleton type="rect" className="h-5 !max-w-[130px]" />
            <Skeleton type="rect" className="h-5 !max-w-[130px]" />
          </div>
          <div className="my-5 ml-0.5 flex gap-3">
            <Skeleton
              type="rect"
              className="h-5 !max-w-[150px] !rounded-full"
            />
            <Skeleton
              type="rect"
              className="h-5 !max-w-[150px] !rounded-full"
            />
            <Skeleton
              type="rect"
              className="h-5 !max-w-[150px] !rounded-full"
            />
            <Skeleton
              type="rect"
              className="h-5 !max-w-[150px] !rounded-full"
            />
          </div>
          <Skeleton
            textConfig={{ display: "inline" }}
            className=" mt-12 mb-8 h-7 !w-2/3"
          />

          <div className="mt-6 grid grid-rows-2 gap-5">
            <div className=" rounded-2xl  p-4 ring-1 ring-gray-200">
              <div className="flex items-center justify-between">
                <Skeleton textConfig={{ display: "inline" }} className="h-5" />
                <Skeleton textConfig={{ display: "inline" }} className="h-5" />
              </div>
              <p className="mt-16 flex w-4/5 justify-between gap-3 ">
                <Skeleton
                  textConfig={{ display: "inline" }}
                  className="h-4 w-1/3"
                />{" "}
                <Skeleton type="circle" className="h-2 w-2 self-center" />{" "}
                <Skeleton
                  textConfig={{ display: "inline" }}
                  className="h-4 w-1/3"
                />{" "}
                <Skeleton type="circle" className="h-2 w-2 self-center" />{" "}
                <Skeleton
                  textConfig={{ display: "inline" }}
                  className="h-4 w-1/3"
                />
              </p>
            </div>
            <div className=" rounded-2xl  p-4 ring-1 ring-gray-200">
              <div className="flex items-center justify-between">
                <Skeleton textConfig={{ display: "inline" }} className="h-5" />
              </div>
              <p className="mt-12 flex w-4/5 justify-between gap-3 ">
                <Skeleton
                  textConfig={{ display: "inline" }}
                  className="h-4 w-1/3"
                />{" "}
                <Skeleton type="circle" className="h-2 w-2 self-center" />{" "}
                <Skeleton
                  textConfig={{ display: "inline" }}
                  className="h-4 w-1/3"
                />{" "}
                <Skeleton type="circle" className="h-2 w-2 self-center" />{" "}
                <Skeleton
                  textConfig={{ display: "inline" }}
                  className="h-4 w-1/3"
                />
              </p>
            </div>
          </div>
        </article>

        {/* right side */}
        <article className="mt-20 mb-20 ml-20 lg:mt-0">
          <Skeleton type="rect" className="h-full w-full bg-gray-100" />
        </article>
      </div>
    </section>
  );
};

export default LaunchPadSkeleton;

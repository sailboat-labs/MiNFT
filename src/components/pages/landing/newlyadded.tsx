/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import {
  collection,
  DocumentData,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { firebaseApp } from "@/lib/firebase";

import PageLoader from "@/components/shared/PageLoader";

import { Collection } from "@/types";
const firestore = getFirestore(firebaseApp);

export default function NewlyAdded() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loadingCollection, setLoadingCollection] = useState(false);
  const [animateIntoView, setAnimateIntoView] = useState(false);

  const _query = query(
    collection(firestore, "collections"),
    orderBy("dateCreated", "desc"),
    limit(10)
  );
  const [snapshots, loading] = useCollectionData(_query);

  useEffect(() => {
    if (loading) return;
    if (!snapshots) return;

    const data = snapshots.reduce((acc: Collection[], curr: DocumentData) => {
      acc.push(curr as Collection);
      return acc;
    }, []);

    setCollections(data);
    setTimeout(() => {
      setAnimateIntoView(true);
    }, 500);
  }, [loading, snapshots]);

  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          background: "black",
          borderRadius: "50%",
          height: "50px",
          width: "50px",
          justifyContent: "center",
          alignItems: "center",
          // position:"relative",
          zIndex: 2,
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          background: "black",
          borderRadius: "50%",
          height: "50px",
          width: "50px",
          justifyContent: "center",
          alignItems: "center",
          // position:"relative",
          zIndex: 2,
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    centerPadding: "20px",
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          infinite: true,
          speed: 1000,
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 5000,
          pauseOnHover: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          dots: true,
          infinite: true,
          speed: 1000,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 5000,
          pauseOnHover: true,
          nextArrow: <></>,
          prevArrow: <></>,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          infinite: true,
          speed: 1000,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 5000,
          pauseOnHover: true,
          nextArrow: <></>,
          prevArrow: <></>,
        },
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-black relative z-[2]">
      <div id="newly_added" className="contained mt-10 overflow-hidden">
        {loadingCollection && <PageLoader />}
        <a href="#newly_added" className="flex w-full justify-center">
          <strong className="text-2xl dark:text-white">Newly Added</strong>
        </a>

        <div
          className={`mt-0 flex  justify-center transition-all ${
            animateIntoView
              ? "h-0 scale-95 opacity-0 "
              : "scale-100 animate-pulse opacity-100"
          }`}
        >
          <div className="mt-10 flex gap-5 overflow-x-hidden">
            {[...Array(3)].map((item, index) => (
              <div
                key={index}
                className="mr-10 h-[400px] w-[300px] cursor-pointer"
              >
                <div className="flex flex-col items-center">
                  <div className="h-[400px] w-[300px] rounded-lg border-2  object-cover"></div>

                  <div className="absolute h-[400px] w-[300px]  rounded-lg bg-gradient-to-b from-transparent via-transparent to-gray-500 opacity-80"></div>

                  <div className="absolute bottom-0 my-5 flex -translate-y-10 flex-col items-center gap-3">
                    <p className="rounded-lg  py-2 px-28"></p>
                    <p className="w-fit rounded-lg  py-2 px-20"></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`mt-10 transition-all ${
            !animateIntoView
              ? "h-0 scale-95 opacity-0"
              : "scale-100 opacity-100"
          }`}
        >
          <Slider {...settings}>
            {collections
              .filter((item) => item.image != null)
              .map((item, index) => (
                <Link
                  href={{
                    pathname: `/collection/[slug]`,
                    query: {
                      slug: item.slug!,
                    },
                  }}
                  passHref
                  key={index}
                >
                  <div
                    onClick={() => {
                      setLoadingCollection(true);
                    }}
                    className="mx-5 h-[400px] w-auto  cursor-pointer "
                  >
                    <div className="flex flex-col items-center">
                      <img
                        className="h-[400px] w-full rounded-lg border-2  object-cover"
                        src={item.image}
                        alt=""
                      />

                      <div className="absolute  h-[400px] rounded-lg bg-gradient-to-b from-transparent via-transparent to-black opacity-80"></div>

                      <div className="absolute bottom-0 my-5 flex flex-col items-center px-5">
                        <img
                          className="h-20 w-20 rounded-full border-2  object-cover"
                          src={item.image}
                          alt=""
                        />
                        <p className=" text-center text-2xl text-white">
                          {item.name}
                        </p>
                        <p className="text-center text-sm uppercase text-white">
                          {item.projectType}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

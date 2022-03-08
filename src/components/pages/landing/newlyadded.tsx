/* eslint-disable @next/next/no-img-element */

import {
  collection,
  DocumentData,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { firebaseApp } from "@/lib/firebase";

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
    // centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          infinite: true,
          speed: 1000,
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 5000,
          pauseOnHover: true,
          centerMode: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          dots: true,
          infinite: true,
          speed: 1000,
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 5000,
          pauseOnHover: true,
          centerMode: true,
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
          // centerMode: true,
        },
      },
    ],
  };

  return (
    <div id="newly_added" className="contained mt-10">
      <a href="#newly_added" className="flex w-full justify-center">
        <strong className="text-2xl">Newly Added</strong>
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
                <div className="h-[400px] w-[300px] rounded-lg border-2 bg-white object-cover"></div>

                <div className="absolute h-[400px] w-[300px]  rounded-lg bg-gradient-to-b from-transparent via-transparent to-gray-500 opacity-80"></div>

                <div className="absolute bottom-0 my-5 flex -translate-y-10 flex-col items-center gap-3">
                  <p className="rounded-lg bg-white py-2 px-28"></p>
                  <p className="w-fit rounded-lg bg-white py-2 px-20"></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`mt-10 transition-all ${
          !animateIntoView ? "h-0 scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <Slider {...settings}>
          {collections
            .filter((item) => item.image != null)
            .map((item, index) => (
              <div
                key={index}
                className="mr-10 h-[400px] w-[300px] cursor-pointer"
              >
                <div className="flex flex-col items-center">
                  <img
                    className="h-[400px] w-[300px] rounded-lg border-2 bg-white object-cover"
                    src={item.image}
                    alt=""
                  />

                  <div className="absolute h-[400px] w-[300px]  rounded-lg bg-gradient-to-b from-transparent via-transparent to-black opacity-80"></div>

                  <div className="absolute bottom-0 my-5">
                    <p className=" text-center text-2xl text-white">
                      {item.name}
                    </p>
                    <p className="text-center text-sm uppercase text-white">
                      {item.projectType}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
}

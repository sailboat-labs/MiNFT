/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

import ButtonLink from "@/components/links/ButtonLink";

export default function Banner() {
  const [hovered, setHovered] = useState(false);
  return (
    <div>
      <div className="flex h-[40rem] xl:h-[70vh] flex-col items-center justify-center  font-dmsans text-white">
        <div className="absolute top-12 hidden w-3/5 justify-between lg:flex">
          <img
            className="ml-5 h-[6vw] w-[10vw] rounded-b-lg"
            alt=""
            src="/images/left_top_top.png"
          />
          <img
            className="mr-5 h-[6vw] w-[10vw] rounded-b-lg"
            alt=""
            src="/images/right_top_top.png"
          />
        </div>
        <div className="absolute left-0 top-20 hidden h-[40rem] lg:flex ">
          <img
            className="left-[5rem] z-[1] h-[12vw] w-[6vw] translate-y-[9rem] rounded-r-lg bg-green-400"
            alt=""
            src="/images/left_left.png"
          />
          <div className="-ml-10">
            <img
              className="h-[15vw] w-[15vw] rounded-lg "
              alt=""
              src="/images/left_top.png"
            />

            <img
              className="relative z-[2] mt-10 h-[12vw] w-[12vw] rounded-lg  "
              alt=""
              src="/images/left_bottom.png"
            />
          </div>
          <img
            className="mt-72 h-[10vw] w-[10vw] rounded-lg "
            alt=""
            src="/images/left_bottom_right.png"
          />
        </div>

        <div className="absolute right-0 top-20 hidden h-[40rem] lg:flex ">
          <img
            className="mt-72 h-[10vw] w-[10vw] rounded-lg "
            alt=""
            src="/images/right_bottom_left.png"
          />
          <div className="-mr-20 flex flex-col items-end">
            <img
              className="h-[15vw] w-[15vw] rounded-lg"
              alt=""
              src="/images/right_top.png"
            />

            <img
              className=" relative z-[2] mt-10 h-[12vw] w-[12vw] rounded-lg"
              alt=""
              src="/images/right_bottom.png"
            />
          </div>
          <img
            className="-left-[5rem] z-[1] h-[18vw] w-[8vw] translate-y-[9rem] rounded-l-lg "
            alt=""
            src="/images/right_right.png"
          />
        </div>
        {/* <div className=" h-72 w-96 -translate-y-32 "></div> */}
        <div className=" text-center text-4xl">
          Become an <strong>NFT creator</strong> without code
        </div>
        <div className="mt-3 text-2xl">
          You do the art, we&apos;ll do the rest
        </div>
        <div className="mt-5">
          <div
            className={`absolute translate-x-12 translate-y-[3rem] transition-all ${
              hovered ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <div
              className={`absolute translate-x-3 opacity-80 transition-all ${
                hovered ? "-translate-y-12 " : "translate-y-0 "
              }`}
            >
              <ETHSVG />
            </div>
            <div
              className={`absolute opacity-80 transition-all ${
                hovered
                  ? "-translate-x-20 -translate-y-5 -rotate-45"
                  : " translate-x-0 translate-y-0 rotate-0"
              }`}
            >
              <CONTRACTSVG />
            </div>
            <div
              className={`absolute opacity-80 transition-all ${
                hovered
                  ? "translate-x-24 -translate-y-5 rotate-0"
                  : " translate-x-0 translate-y-0 -rotate-90"
              }`}
            >
              <WRENCHSVG />
            </div>
          </div>
          <ButtonLink
            href="/dashboard"
            onMouseEnter={() => {
              setHovered(true);
            }}
            onMouseLeave={() => {
              setHovered(false);
            }}
            className={`relative z-[2] mt-16 cursor-pointer rounded-xl border bg-white px-10 py-4 text-xl font-bold text-indigo-800 shadow-3xl transition-all hover:scale-110 hover:bg-white hover:text-indigo-800 ${
              hovered ? "bg-opacity-90" : "bg-opacity-100"
            }`}
          >
            Start Creating
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

function ETHSVG() {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      className="h-14  w-14"
      viewBox="0 0 226.777 226.777"
      enableBackground="new 0 0 226.777 226.777"
      xmlSpace="preserve"
    >
      <g>
        <polygon
          fill="white"
          points="112.553,157 112.553,86.977 44.158,116.937 	"
        />
        <polygon
          fill="white"
          points="112.553,82.163 112.553,-0.056 46.362,111.156 	"
        />
        <polygon
          fill="white"
          points="116.962,-0.09 116.962,82.163 184.083,111.566 	"
        />
        <polygon
          fill="white"
          points="116.962,86.977 116.962,157.002 185.405,116.957 	"
        />
        <polygon
          fill="white"
          points="112.553,227.406 112.553,171.085 44.618,131.31 	"
        />
        <polygon
          fill="white"
          points="116.962,227.406 184.897,131.31 116.962,171.085 	"
        />
      </g>
    </svg>
  );
}

function CONTRACTSVG() {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      className="h-14 w-14 fill-white"
      viewBox="0 0 490 490"
      xmlSpace="preserve"
    >
      <g>
        <g>
          <g>
            <path
              d="M413.437,367.5h-22.969V7.656c0-4.228-3.428-7.656-7.656-7.656H76.562c-4.228,0-7.657,3.428-7.657,7.656v459.375
				C68.906,479.696,79.21,490,91.874,490h306.251c12.664,0,22.969-10.304,22.969-22.969v-91.875
				C421.094,370.928,417.666,367.5,413.437,367.5z M91.874,474.688c-4.221,0-7.656-3.435-7.656-7.657V15.312h290.937v451.719
				c0,2.683,0.462,5.261,1.313,7.657H91.874z M405.781,467.031c0,4.221-3.434,7.657-7.656,7.657c-4.222,0-7.656-3.435-7.656-7.657
				v-84.219h15.312V467.031z"
            />
            <path
              d="M329.219,421.094h-91.875c-4.228,0-7.656,3.428-7.656,7.656c0,4.228,3.428,7.656,7.656,7.656h91.875
				c4.228,0,7.656-3.428,7.656-7.656C336.875,424.522,333.447,421.094,329.219,421.094z"
            />
            <path
              d="M160.781,306.25c-21.108,0-38.281,17.173-38.281,38.281c0,8.6,2.852,16.545,7.657,22.943
				c0,0.009-0.001,0.017-0.001,0.026v76.562c0,3.097,1.865,5.888,4.726,7.073c0.947,0.393,1.942,0.583,2.928,0.583
				c1.992,0,3.951-0.778,5.415-2.243l17.555-17.555l17.555,17.555c2.19,2.189,5.482,2.844,8.344,1.66
				c2.861-1.185,4.726-3.977,4.726-7.073V367.5c0-0.008-0.001-0.017-0.001-0.025c4.806-6.398,7.658-14.344,7.658-22.944
				C199.062,323.423,181.889,306.25,160.781,306.25z M176.095,425.578l-9.9-9.898c-2.99-2.99-7.838-2.99-10.827,0l-9.899,9.899
				v-45.973c4.693,2.057,9.87,3.206,15.313,3.206c5.443,0,10.62-1.149,15.313-3.206V425.578z M160.781,367.5
				c-12.665,0-22.969-10.304-22.969-22.969c0-12.665,10.304-22.969,22.969-22.969s22.969,10.304,22.969,22.969
				C183.749,357.196,173.445,367.5,160.781,367.5z"
            />
            <path
              d="M130.156,68.906h99.531c4.228,0,7.656-3.428,7.656-7.656c0-4.228-3.428-7.656-7.656-7.656h-99.531
				c-4.228,0-7.657,3.428-7.657,7.656C122.499,65.478,125.927,68.906,130.156,68.906z"
            />
            <path
              d="M122.499,107.187c0,4.228,3.428,7.656,7.656,7.656h199.062c4.228,0,7.656-3.428,7.656-7.656
				c0.001-4.228-3.427-7.656-7.655-7.656H130.156C125.928,99.531,122.499,102.959,122.499,107.187z"
            />
            <path
              d="M329.219,145.469H130.156c-4.228,0-7.656,3.428-7.656,7.656s3.428,7.656,7.656,7.656h199.062
				c4.228,0,7.656-3.428,7.656-7.656S333.447,145.469,329.219,145.469z"
            />
            <path
              d="M329.219,191.406H130.156c-4.228,0-7.656,3.428-7.656,7.656c0,4.228,3.428,7.656,7.656,7.656h199.062
				c4.228,0,7.656-3.428,7.656-7.656C336.875,194.834,333.447,191.406,329.219,191.406z"
            />
            <path
              d="M130.156,237.344c-4.228,0-7.656,3.428-7.656,7.656s3.428,7.656,7.656,7.656h199.062c4.228,0,7.656-3.428,7.656-7.656
				s-3.427-7.656-7.655-7.656H130.156z"
            />
            <path
              d="M336.874,290.937c0-4.228-3.427-7.656-7.655-7.656H222.031c-4.228,0-7.656,3.428-7.656,7.656
				c0,4.228,3.428,7.656,7.656,7.656h107.187C333.446,298.593,336.874,295.165,336.874,290.937z"
            />
          </g>
        </g>
      </g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
    </svg>
  );
}

function WRENCHSVG() {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      className="h-14 w-14 fill-white"
      y="0px"
      viewBox="0 0 495 495"
      xmlSpace="preserve"
    >
      <g>
        <path
          d="M338.196,146.196l-7.999,8c-2.929,2.929-2.929,7.678,0,10.606c1.464,1.465,3.384,2.197,5.303,2.197
		s3.839-0.732,5.303-2.197l8-8c2.929-2.929,2.928-7.678,0-10.606C345.875,143.267,341.126,143.268,338.196,146.196z"
        />
        <path
          d="M314.197,170.196l-168,168c-2.929,2.929-2.929,7.678,0,10.606c1.464,1.464,3.384,2.197,5.303,2.197
		s3.839-0.732,5.303-2.197l168-168c2.929-2.929,2.929-7.678,0-10.606C321.875,167.268,317.126,167.268,314.197,170.196z"
        />
        <path
          d="M485.286,72.095c-5.79-2.346-12.382-1.01-16.797,3.406l-32.876,32.876l-38.08-10.203l-10.203-38.08l33.552-33.552
		c4.431-4.431,5.758-10.799,3.465-16.621c-2.276-5.779-7.768-9.654-13.99-9.872c-15.153-0.53-30.085,3.23-44.376,11.177
		c-16.95,9.427-30.566,24.162-38.34,41.493c-7.68,17.122-9.568,34.962-5.63,53.095L75.692,352.132
		C74.263,352.044,72.874,352,71.5,352C32.075,352,0,384.074,0,423.5S32.075,495,71.5,495s71.5-32.075,71.5-71.5
		c0-1.374-0.044-2.764-0.133-4.192l246.318-246.318c18.161,3.945,36.031,2.043,53.183-5.669
		c17.329-7.792,32.034-21.367,41.406-38.223c7.662-13.78,11.436-28.188,11.217-42.823C494.897,80.013,491.088,74.448,485.286,72.095
		z M470.665,121.808c-7.813,14.051-20.046,25.355-34.448,31.832c-15.477,6.959-30.991,8.211-47.426,3.825
		c-2.585-0.689-5.344,0.051-7.237,1.943L129.792,411.169c-1.608,1.607-2.399,3.858-2.152,6.118c0.242,2.216,0.36,4.248,0.36,6.212
		c0,31.154-25.346,56.5-56.5,56.5S15,454.654,15,423.5S40.346,367,71.5,367c1.964,0,3.996,0.118,6.212,0.36
		c2.259,0.245,4.51-0.544,6.118-2.152l251.761-251.761c1.893-1.893,2.633-4.65,1.943-7.237c-4.379-16.411-3.139-31.9,3.792-47.352
		c6.458-14.397,17.802-26.658,31.943-34.522c12.039-6.695,23.992-9.74,36.562-9.295c0.166,0.005,0.416,0.014,0.558,0.377
		c0.114,0.289,0.013,0.39-0.115,0.518L373.66,52.549c-1.895,1.895-2.635,4.656-1.941,7.244l12.445,46.445
		c0.694,2.588,2.715,4.61,5.304,5.304l46.445,12.445c2.588,0.693,5.35-0.047,7.244-1.941l35.938-35.938h0
		c0.123-0.123,0.239-0.24,0.554-0.111c0.337,0.137,0.34,0.332,0.343,0.503C480.174,98.643,477.123,110.192,470.665,121.808z"
        />
        <path
          d="M71.5,376C45.309,376,24,397.308,24,423.5S45.309,471,71.5,471s47.5-21.309,47.5-47.5S97.691,376,71.5,376z M71.5,456
		C53.58,456,39,441.42,39,423.5S53.58,391,71.5,391s32.5,14.58,32.5,32.5S89.42,456,71.5,456z"
        />
      </g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
    </svg>
  );
}

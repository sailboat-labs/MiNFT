/* eslint-disable @next/next/no-img-element */
import { useSelector } from "react-redux";
import { getGeneratedGIF } from "redux/reducers/selectors/layers";

export default function ShareTraits() {
  const generatedGIF = useSelector(getGeneratedGIF);

  return (
    <div className="mt-20 flex h-full w-full flex-col items-center justify-center">
      <div className="text-3xl text-gray-500 dark:text-white">
        Show off your art!
      </div>
      <div className="mt-5 text-center dark:text-gray-400">
        Share your new creation with the world!
        <br /> Don&apos;t forget to tag @magicmynt to get featured!
      </div>
      <img
        className="dark:bg-[rgba(255,255,255,0.0.5)] mb-10 mt-20 h-96 w-96 rounded-lg dark:backdrop-blur"
        alt=""
        src={generatedGIF}
      />
    </div>
  );
}

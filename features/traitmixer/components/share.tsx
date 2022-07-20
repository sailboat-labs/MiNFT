/* eslint-disable @next/next/no-img-element */
import { useSelector } from "react-redux";
import { getGeneratedGIF } from "redux/reducers/selectors/layers";

export default function ShareTraits() {
  const generatedGIF = useSelector(getGeneratedGIF);

  return (
    <div className="mt-20 flex h-full w-full flex-col items-center justify-center">
      <div className="text-3xl text-gray-500">Show off your art!</div>
      <div className="mt-5 text-center">
        Share your new creation with the world!
        <br /> Don&apos;t forget to tag @magicmynt to get featured!
      </div>
      <img
        className="mb-10 mt-20 h-96 w-96 rounded-lg"
        alt=""
        src={generatedGIF}
      />
    </div>
  );
}

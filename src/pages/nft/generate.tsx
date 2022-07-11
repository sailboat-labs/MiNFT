/* eslint-disable @next/next/no-img-element */
import { useSelector } from "react-redux";
import { getGeneratedImages } from "redux/reducers/selectors/layers";

export default function Generate() {
  const images = useSelector(getGeneratedImages);

  console.log(images);

  return (
    <>
      <div className="mt-5 grid w-fit grid-cols-2 gap-2 md:grid-cols-6 lg:grid-cols-8">
        {images.map((image: any, index: number) => (
          <img
            key={index}
            src={image}
            alt=""
            className="h-20 w-20 rounded-lg object-cover"
          />
        ))}
      </div>
    </>
  );
}

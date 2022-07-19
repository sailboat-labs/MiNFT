import { createCanvas } from "canvas";

import { Giffer } from "./gif-encoder";

const preview_gif = {
  numberOfImages: 2,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 1,
  quality: 200,
  delay: 100,
  imageName: "preview.gif",
};

const format = {
  width: 1024,
  height: 1024,
  smoothing: true, // set to false when up-scaling pixel art.
};

const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");

export const createProjectPreviewGIF = async (imageList: File[]) => {
  console.log({ imageList });

  // Extract from preview config
  const { numberOfImages, order, repeat, quality, delay, imageName } =
    preview_gif;
  // Extract from format config
  const { width, height } = format;
  // Prepare canvas
  const previewCanvasWidth = width;
  const previewCanvasHeight = height;

  if (imageList.length < numberOfImages) {
    console.log(
      `You do not have enough images to create a gif with ${numberOfImages} images.`
    );
  } else {
    // Shout from the mountain tops
    console.log(
      `Preparing a ${previewCanvasWidth}x${previewCanvasHeight} project preview with ${imageList.length} images.`
    );

    ctx.clearRect(0, 0, width, height);

    const hashlipsGiffer = new Giffer(
      canvas,
      ctx,
      `fileName`,
      repeat,
      quality,
      delay
    );
    hashlipsGiffer.start();
    console.log({ imageList });

    // await Promise.all(imageList).then((renderObjectArray) => {
    //   // Determine the order of the Images before creating the gif
    //   if (order == "ASC") {
    //     // Do nothing
    //   } else if (order == "DESC") {
    //     renderObjectArray.reverse();
    //   } else if (order == "MIXED") {
    //     renderObjectArray = renderObjectArray.sort(() => Math.random() - 0.5);
    //   }

    //   // Reduce the size of the array of Images to the desired amount
    //   if (parseInt(numberOfImages.toString()) > 0) {
    //     renderObjectArray = renderObjectArray.slice(0, numberOfImages);
    //   }

    //   renderObjectArray.forEach((renderObject, index) => {
    //     ctx.globalAlpha = 1;
    //     ctx.globalCompositeOperation = "source-over";
    //     ctx.drawImage(
    //       renderObject,
    //       0,
    //       0,
    //       previewCanvasWidth,
    //       previewCanvasHeight
    //     );
    //     hashlipsGiffer.add();
    //   });
    // });

    if (order == "ASC") {
      // Do nothing
    } else if (order == "DESC") {
      imageList.reverse();
    } else if (order == "MIXED") {
      imageList = imageList.sort(() => Math.random() - 0.5);
    }

    // Reduce the size of the array of Images to the desired amount
    if (parseInt(numberOfImages.toString()) > 0) {
      imageList = imageList.slice(0, numberOfImages);
    }

    imageList.forEach((renderObject, index) => {
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(
        renderObject,
        0,
        0,
        previewCanvasWidth,
        previewCanvasHeight
      );
      hashlipsGiffer.add();
    });

    const gif = hashlipsGiffer.stop();
    return gif;
    console.log({ gif });
  }
};

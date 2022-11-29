import { ILayer } from "@/interfaces";
export function uploadLayers(account: string, slug: string, layers: ILayer[]) {
  //Recursively upload layers and its elements

  if (!account || !slug || layers?.length < 1) return;
  const _layers = layers.map((item) => item.name);
  const _elements = layers.map((item) => item.elements);

  console.log({ _layers, _elements });
  return;

  // layers.forEach(async (layer) => {
  //   try {
  //     const _layer = {
  //       name: layer,
  //       blendmode: "source-over",
  //       opacity: 1,
  //       bypassDNA: false,
  //     };

  //     const _doc = doc(
  //       firestore,
  //       `art-engine/users/${account}/${router.query?.name
  //         ?.toString()
  //         .toLowerCase()}/layers/${layer}`
  //     );
  //     await setDoc(_doc, _layer);
  //     toast.dismiss();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

  // uploadElements(data);
}

// async function uploadElements(layersWithElements: NFTLayer[]) {
//   layersWithElements.forEach((layer) => {
//     const acceptedFiles = layer.elements;

//     acceptedFiles.forEach((file: File) => {
//       try {
//         const _name = v4() + "." + file.type.split("/").pop();

//         // setUploading(true);
//         // setPercentageComplete(0);

//         const storageRef = ref(
//           storage,
//           `art-engine/users/${account}/${router.query?.name
//             ?.toString()
//             .toLowerCase()}/elements/${_name}`
//         );

//         const uploadTask = uploadBytesResumable(storageRef, file);

//         uploadTask.on(
//           "state_changed",
//           (snapshot: any) => {
//             const progress =
//               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             // setPercentageComplete(progress);
//           },
//           (error: any) => {
//             toast.error(error.code);
//           },
//           async () => {
//             const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
//             // setImageUrl(downloadUrl);
//             console.log(downloadUrl);

//             //Upload image to firebase

//             const _element = {
//               sublayer: false,
//               weight: 1,
//               blendmode: "source-over",
//               opacity: 1,
//               name: layer.name,
//               filename: _name,
//               path: downloadUrl,
//               zindex: "",
//               trait: layer.name,
//               traitValue: layer.name,
//             };

//             const _doc = doc(
//               firestore,
//               `art-engine/users/${account}/${router.query?.name
//                 ?.toString()
//                 .toLowerCase()}/elements/${_name}`
//             );
//             await setDoc(_doc, _element);
//             toast.dismiss();
//             toast.success("Element uploaded");
//           }
//         );
//         // setUploading(false);
//       } catch (error) {
//         // setUploading(false);
//         // setPercentageComplete(0);

//         toast.error("Upload failed");
//       }
//     });
//   });
// }

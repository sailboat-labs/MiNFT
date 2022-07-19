// /* eslint-disable @next/next/no-img-element */

// import { useState } from "react";

// export default function Test() {

//   const elements = [
//     "https://static.wixstatic.com/media/44ce5c_420889c385cc46a18fd0098058e2090b~mv2.png/v1/fill/w_250,h_250,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Saudi-2.png",
//     "https://static.wixstatic.com/media/44ce5c_cd04ae1698f648d2ace2f3e7af273988~mv2.png/v1/fill/w_250,h_250,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Saudi-1.png",
//     "https://static.wixstatic.com/media/44ce5c_aa40cb95cd7a42668519c739cb1bb25a~mv2.png/v1/fill/w_250,h_250,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Saudi-4.png",
//     "https://static.wixstatic.com/media/44ce5c_b6404a4892094709b3baf066ede75ea5~mv2.png/v1/fill/w_250,h_250,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Saudi-5.png",
//     "https://static.wixstatic.com/media/44ce5c_6fc39b33c4994c58bfc1600bf37c0272~mv2.png/v1/fill/w_250,h_250,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Saudi-6.png",
//     "https://static.wixstatic.com/media/44ce5c_80c5c9653ea04dd6b1691a909b004061~mv2.png/v1/fill/w_250,h_250,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Saudi-8.png",
//     "https://static.wixstatic.com/media/44ce5c_50f1c3c033824d9c9a5f2aca4a9d0672~mv2.png/v1/fill/w_250,h_250,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Saudi-7.png",
//     "https://static.wixstatic.com/media/44ce5c_adaff183088547b7bee922b6689ba055~mv2.png/v1/fill/w_250,h_250,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Saudi-9.png",
//     "https://static.wixstatic.com/media/44ce5c_39999b1a322a480fa6beabc8558eed6e~mv2.png/v1/fill/w_250,h_250,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Saudi-10.png",
//   ];

//   // Convert uploaded image(s) to base 64
//   const toBase64 = (uploadedFiles) => {
//     const files = Array.from(uploadedFiles);

//     if (files.length == 1) {
//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => {
//           const src = reader.result;
//           resolve(src);
//         };
//         reader.onerror = reject;
//       });
//     }

//     else if (files.)

//     return new Promise((resolve, reject) => {
//       const urls = [];
//       files.forEach((file) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => {
//           const src = reader.result;
//           urls.push(src);
//           if (urls.length === files.length) {
//             resolve(urls);
//           }
//         };
//         reader.onerror = reject;
//       });
//     });
//   };

//   // For changing background image of whole element
//   // default is dotted background
//   const [src, setSrc] = useState("/images/homepage/background.png");

//   const changeImage = async (e) => {
//     console.clear();
//     console.log("Changing Background Images");
//     e.preventDefault();
//     if (e.target.files) {
//       const src = await toBase64(e.target.files)
//       setSrc(src);
//     };
//   };

//   const [divImages, setDivImages] = useState(elements);

//   const changeMultipleImages = async (e) => {
//     console.clear();
//     console.log("Changing Multiple Images");
//     e.preventDefault();
//     if (e.target.files) {
//       const urls = await toBase64(e.target.files);
//       setDivImages(urls);
//     }
//   };

//   return (
//     <div>
//       <div
//         className="bg-po relative z-0 flex w-full flex-col items-center justify-center overflow-scroll bg-cover bg-repeat mix-blend-difference"
//         style={{
//           backgroundImage: `url('${src}')`,
//         }}
//       >
//         <div className="relative flex w-full items-center justify-center bg-transparent mix-blend-difference">
//           <input
//             type="file"
//             className="w-96"
//             placeholder="Upload image"
//             accept="image/png, image/jpg, image/jpeg"
//             //onChange={changeImage} // Use for changing background image of element

//             onChange={changeMultipleImages}
//             multiple={true}
//           />
//           {/* <img src={`${src}`} alt='' /> */}
//         </div>
//       </div>
//       <div className="relative z-30 mt-20 flex w-full flex-row justify-evenly lg:mt-0 lg:w-7/12">
//         {divImages.map((file, index) => (
//           <div key={index} className="relative z-30 m-2 bg-[#7f9dc3] md:m-4">
//             <img src={file} alt=" " />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

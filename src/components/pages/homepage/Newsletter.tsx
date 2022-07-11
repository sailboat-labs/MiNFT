// import { ErrorMessage, Form, Formik } from "formik";
// import * as Yup from "yup";

import { useState } from "react";

// export default function Newsletter() {
//   const validate = Yup.object({
//     email: Yup.string().email("Email is invalid").required("Email is required"),
//   });

//   const handleSignUp = () => alert("You have signed up for our newsletter!");

//   return (
//     <div className="mx-auto mb-20 flex w-4/5 flex-col font-montserrat">
//       <div className="flex flex-row items-center justify-between rounded-2xl bg-indigo-800 px-10 py-8 text-white lg:px-16 lg:py-10  ">
//         <div className="flex flex-row sm:flex-col">
//           <span className="text-2xl font-bold">
//             Want product news and updates?
//           </span>
//           <span className="pt-3 text-lg text-indigo-200">
//             Sign up to our newsletter to stay up to date
//           </span>
//         </div>
//         <div className="">
//           <Formik
//             initialValues={{ email: "" }}
//             validationSchema={validate}
//             onSubmit={handleSignUp}
//           >
//             {(formik) => (
//               <div>
//                 <Form onSubmit={handleSignUp}>
//                   <div>
//                     <input
//                       placeholder="Enter your email"
//                       type="text"
//                       name="email"
//                       className="mr-5 w-80 rounded-lg border-none px-5 py-3 text-indigo-800"
//                     />
//                     <button
//                       type="submit"
//                       className="rounded-lg bg-indigo-400 px-5 py-3"
//                     >
//                       Notify Me
//                     </button>
//                     <ErrorMessage name="email" />
//                   </div>
//                 </Form>
//                 <div className="pt-3 text-indigo-200">
//                   No spam, we promise. Read our &#32;{" "}
//                   <a
//                     href="#"
//                     target="_blank"
//                     className="font-bold text-white underline"
//                   >
//                     Privacy Policy.
//                   </a>
//                 </div>
//               </div>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </div>
//   );

// }

export default function Newsletter() {
  const [inputStyles, setInputStyles] = useState(
    "mr-5 w-80 rounded-lg px-5 py-3 text-indigo-800 border-none focus:outline-none"
  );

  const handleSignUp = (e: {
    preventDefault: () => void;
    target: { value: string };
  }) => {
    e.preventDefault();
    const userEmail = e.target.value;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(userEmail)) {
      setInputStyles(
        "mr-5 w-80 rounded-lg px-5 py-3 text-indigo-800 border-none"
      );
      alert("done");
    } else {
      setInputStyles(
        "mr-5 w-80 rounded-lg px-5 py-3 text-indigo-800 border-red-500 border-4 ring ring-red-300"
      );
      alert("done");
    }
  };

  return (
    <div className="mx-auto mb-20 flex w-2/3 flex-col font-montserrat">
      <div className="flex flex-row items-center justify-between rounded-2xl bg-indigo-800 px-10 py-8 text-white lg:px-10 lg:py-10  ">
        <div className="flex flex-row sm:flex-col">
          <span className="text-2xl font-bold">
            Want product news and updates?
          </span>
          <span className="pt-3 text-lg text-indigo-200">
            Sign up to our newsletter to stay up to date
          </span>
        </div>
        <div className="">
          <div>
            <div>
              <input
                placeholder="Enter your email"
                type="text"
                name="email"
                className={inputStyles}
                onChange={handleSignUp}
                required
              />
              <button
                type="submit"
                className="rounded-lg bg-indigo-400 px-5 py-3"
              >
                Notify Me
              </button>
            </div>
            <div className="pt-3 text-indigo-200">
              No spam, we promise. Read our &#32;{" "}
              <a
                href="#"
                target="_blank"
                className="font-bold text-white underline"
              >
                Privacy Policy.
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

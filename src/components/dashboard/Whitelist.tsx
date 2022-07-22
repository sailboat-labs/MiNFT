/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import * as Yup from "yup";

import { updateAccounts } from "@/firestore/project";
import { checkTwitterExists } from "@/firestore/project";
import { addWhitelist } from "@/firestore/whitelist";

import WhitelistTable from "./Whitelist/WhitelistTable";
import Button from "../buttons/Button";

export default function Whitelist() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const slug = router.query.project as string;
  // const projectAccount = "TheIndianNFTs";

  const newUserForm = useFormik({
    initialValues: {
      address: "",
      twitter: "",
    },
    validationSchema: Yup.object().shape({
      address: Yup.string().required("Required"),
      twitter: Yup.string().required("Required"),
    }),
    onSubmit: async (values, formik) => {
      setLoading(true);

      // const checkFollows = httpsCallable(functions, "checkFollows");

      const twitterExists = await checkTwitterExists(slug, values.twitter);
      if (twitterExists) return toast.error("Twitter account is in use");

      // await checkFollows({
      //   user_account: values.twitter,
      //   project_account: projectAccount,
      // })
      //   .then(async (result: any) => {
      //     console.log({ result });
      //     const { data } = result;
      //     if (data.success && data.isFollowing) {
      await updateAccounts(slug, values.twitter);

      await addWhitelist({
        id: v4(),
        projectSlug: slug,
        wallet: values.address,
        twitterUsername: values.twitter,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      toast.success("User added");
      // } else if (data.success && !data.isFollowing) {
      //   toast.error("This account is not following us");
      // } else if (!data.success) {
      //   toast.error("An error occured");
      //   console.log(data.error);
      // }
      // })
      // .catch((error) => {
      //   console.log(error);
      //   toast.error("Error");
      // });

      formik.resetForm();
      setLoading(false);
    },
  });

  return (
    <div className="h-[length:calc(100vh-80px)] overflow-auto font-dmsans opacity-100">
      <div>{/* <WhitelistDates /> */}</div>

      <div className=" pl-10 pt-24 ">
        <div>
          <div className="-mt-16 text-2xl font-bold text-gray-700">
            Whitelist accounts
          </div>
          <div className="mt-2 w-3/4 text-lg font-normal text-gray-500">
            A list of people or things considered to be acceptable or
            trustworthy.
          </div>
        </div>

        <div className="mt-5">
          <span className="font-dmsans text-base font-semibold text-gray-600 opacity-100">
            Add a new person to the list
          </span>
          <div className="mt-3 flex h-12 w-3/5 flex-col justify-between">
            <div className="flex h-12 flex-row">
              <div className="flex flex-col gap-2">
                <div className="flex w-72 flex-row items-center rounded-lg border border-gray-300 focus-within:border-2 focus-within:border-indigo-500 focus-within:ring focus-within:ring-indigo-300">
                  <input
                    id="walletNumber"
                    className="h-full w-11/12 rounded-lg border-0"
                    type="text"
                    placeholder="Wallet number"
                    {...newUserForm.getFieldProps("address")}
                  />

                  <button
                    onClick={() => newUserForm.setFieldValue("address", "")}
                  >
                    <svg
                      className="mx-3"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 12C0 5.37258 5.37258 0 12 0V0C18.6274 0 24 5.37258 24 12V12C24 18.6274 18.6274 24 12 24V24C5.37258 24 0 18.6274 0 12V12Z"
                        fill="#F1F2F3"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.4142 12L17.7072 7.707C18.0982 7.316 18.0982 6.684 17.7072 6.293C17.3162 5.902 16.6843 5.902 16.2933 6.293L12.0002 10.586L7.70725 6.293C7.31625 5.902 6.68425 5.902 6.29325 6.293C5.90225 6.684 5.90225 7.316 6.29325 7.707L10.5862 12L6.29325 16.293C5.90225 16.684 5.90225 17.316 6.29325 17.707C6.48825 17.902 6.74425 18 7.00025 18C7.25625 18 7.51225 17.902 7.70725 17.707L12.0002 13.414L16.2933 17.707C16.4883 17.902 16.7442 18 17.0002 18C17.2562 18 17.5122 17.902 17.7072 17.707C18.0982 17.316 18.0982 16.684 17.7072 16.293L13.4142 12Z"
                        fill="#757D8A"
                      />
                    </svg>
                  </button>
                </div>

                {newUserForm.errors.address && (
                  <p className="text-sm text-red-500">
                    {newUserForm.errors.address}
                  </p>
                )}
              </div>
              <div className="ml-10 flex flex-col gap-2">
                <div className="flex w-72 flex-row items-center rounded-lg border border-gray-300 focus-within:border-2 focus-within:border-indigo-500 focus-within:ring focus-within:ring-indigo-300">
                  <input
                    id="twitterAccount"
                    className="h-full w-11/12 rounded-lg border-0"
                    type="text"
                    placeholder="Twitter account (optional)"
                    {...newUserForm.getFieldProps("twitter")}
                  />
                  <button
                    onClick={() => newUserForm.setFieldValue("twitter", "")}
                  >
                    <svg
                      className="mx-3"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 12C0 5.37258 5.37258 0 12 0V0C18.6274 0 24 5.37258 24 12V12C24 18.6274 18.6274 24 12 24V24C5.37258 24 0 18.6274 0 12V12Z"
                        fill="#F1F2F3"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.4142 12L17.7072 7.707C18.0982 7.316 18.0982 6.684 17.7072 6.293C17.3162 5.902 16.6843 5.902 16.2933 6.293L12.0002 10.586L7.70725 6.293C7.31625 5.902 6.68425 5.902 6.29325 6.293C5.90225 6.684 5.90225 7.316 6.29325 7.707L10.5862 12L6.29325 16.293C5.90225 16.684 5.90225 17.316 6.29325 17.707C6.48825 17.902 6.74425 18 7.00025 18C7.25625 18 7.51225 17.902 7.70725 17.707L12.0002 13.414L16.2933 17.707C16.4883 17.902 16.7442 18 17.0002 18C17.2562 18 17.5122 17.902 17.7072 17.707C18.0982 17.316 18.0982 16.684 17.7072 16.293L13.4142 12Z"
                        fill="#757D8A"
                      />
                    </svg>
                  </button>
                </div>
                {newUserForm.errors.twitter && (
                  <p className="text-sm text-red-500">
                    {newUserForm.errors.twitter}
                  </p>
                )}
              </div>
            </div>
            {/* SUBMIT FORM */}
            <div className="mt-5 block font-montserrat">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  newUserForm.handleSubmit();
                }}
                isLoading={loading}
                className="gradient-button mt-5 transition-all"
              >
                Add person
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-28 border-t">
        <div className="pl-10 pt-5">
          <span className="font-dmsans text-lg font-semibold text-gray-600 opacity-100">
            Main list
          </span>
          <div className="mt-3 flex w-fit flex-col pr-10">
            <WhitelistTable />
          </div>
        </div>
      </div>
    </div>
  );
}

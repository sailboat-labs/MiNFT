import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMoralis } from "react-moralis";
import * as Yup from "yup";

import { User } from "@/types";
import Web3 from "web3";

type props = {
  name?: string;
};

export default function ProfileName({ name }: props) {
  const { account } = useMoralis();

  const [editMode, setEditMode] = useState<boolean>(!name);

  async function onNameSave(name: string) {
    toast('Checking validity')
    const web3 = new Web3(Web3.givenProvider);

    const address = await web3.eth.ens.getOwner(name);

    if (address != "0xC3f1c82bF8c048e42a743E8C328f2705d2aa5151")
      return toast.error("ENS doesn't belong to your address");

    const user: User = {
      walletId: account!,
      name: name,
      lastUpdated: new Date().toISOString(),
    };

    const { data } = await axios.put("/api/user", { user });

    if (data.success) {
      toast.success(`Updated`);
      if (editMode) setEditMode(false);
    } else {
      toast.error(`Unable to update`);
    }
  }

  const formInitialValues = {
    name: name,
  };

  const formValidationSchema = Yup.object().shape({
    name: Yup.string().trim().lowercase(),
  });

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={formValidationSchema}
      onSubmit={(values, { setSubmitting }) => onNameSave(values.name ?? "")}
    >
      <Form className="mt-5 flex items-center gap-2">
        <Field
          name="name"
          disabled={!editMode}
          placeholder="Verify ENS"
          className=" rounded-md  border-2 bg-gray-50 text-center text-2xl font-bold disabled:border-0 disabled:bg-white"
        />
        {!editMode && (
          <svg
            onClick={() => {
              setEditMode(true);
            }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        )}

        {editMode && (
          <div className="flex gap-5">
            <button type="submit">
              <svg
                type="submit"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer transition-all hover:scale-105"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>

            <svg
              onClick={() => {
                setEditMode(false);
              }}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer transition-all hover:scale-105"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        )}
      </Form>
    </Formik>
  );
}

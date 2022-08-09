import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { setContract } from "redux/reducers/slices/contract";

interface AppProps {
  checked?: boolean;
  whitelist?: boolean;
  type: string;
  description?: string;
}

const ContractTypeRadio: FC<AppProps> = ({
  checked,
  description,
  whitelist,
  type,
}) => {
  const dispatch = useDispatch();

  return (
    <button
      className={`relative flex min-h-[150px] flex-col rounded-lg bg-white p-8 text-left ring-2 ring-gray-200 transition-shadow duration-75 hover:shadow-lg dark:bg-[color:var(--dark)] ${
        checked && " ring-indigo-400"
      }`}
      onClick={() => {
        dispatch(setContract({ key: "type", value: type }));
      }}
    >
      <h2 className={`text-xl font-semibold ${checked && "text-indigo-800"}`}>
        {type}
      </h2>
      <div
        className={`${
          type === "Pure Whitelist" ? "hidden " : "block "
        } mt-3 flex flex-row items-center justify-center`}
      >
        <input
          name="whitelist"
          type="checkbox"
          value="Whitelist"
          className="mr-2"
          checked={checked && whitelist}
          onChange={(e) => {
            dispatch(
              setContract({ key: "whitelisted", value: e.target.checked })
            );
          }}
        />
        <label htmlFor="whitelist">Whitelist</label>
      </div>
      <p className="mt-3">{description}</p>
      {checked && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-4 right-4 h-6 w-6 fill-indigo-800"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  );

  // return (
  //   <button
  //     className={`relative flex min-h-[150px] flex-col rounded-lg bg-white p-8 text-left ring-2 ring-gray-200 transition-shadow duration-75 hover:shadow-lg dark:bg-[color:var(--dark)] ${
  //       checked && " ring-indigo-400"
  //     }`}
  //     onClick={() => {
  //       dispatch(setContract({ key: "type", value: type }));
  //       dispatch(setContract({ key: "whitelisted", value: whitelist }));
  //     }}
  //   >
  //     <h2 className={`text-xl font-semibold ${checked && "text-indigo-800"}`}>
  //       {type}
  //     </h2>
  //     {whitelist && (
  //       <>
  //         <div className="mt-3 flex w-fit items-center gap-1 rounded-lg py-1 font-semibold">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             className="h-4 w-4 rounded bg-orange-400 fill-white"
  //             viewBox="0 0 20 20"
  //           >
  //             <path
  //               fillRule="evenodd"
  //               d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
  //               clipRule="evenodd"
  //             />
  //           </svg>
  //           <span>whitelist</span>
  //         </div>
  //         <p>{description}</p>
  //       </>
  //     )}
  //     {checked && (
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         className="absolute top-4 right-4 h-6 w-6 fill-indigo-800"
  //         viewBox="0 0 20 20"
  //       >
  //         <path
  //           fillRule="evenodd"
  //           d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
  //           clipRule="evenodd"
  //         />
  //       </svg>
  //     )}
  //   </button>
  // );
};

export default ContractTypeRadio;

import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import BaseInput from "@/components/controls/BaseInput";
import BaseSelect from "@/components/controls/BaseSelect";
import DateTimeRangePicker from "@/components/controls/DateTimeRangePicker";

const DutchAuction = () => {
  const dispatch = useDispatch();

  const dutchAuctionForm = useFormik({
    initialValues: {
      quantity: 0,
      startingPrice: 0,
      endingPrice: 0,
      decrementAmount: 0,
    },
    validationSchema: Yup.object({
      quantity: Yup.number()
        .required("enter collection quantity")
        .positive("expected positive value"),
      startingPrice: Yup.number()
        .required("enter starting price")
        .min(0, "starting price is required"),
      endingPrice: Yup.number()
        .required("ending price is required")
        .min(0, "expected positive value"),
      decrementAmount: Yup.number()
        .required("enter collection quantity")
        .positive("expected positive value"),
    }),
    onSubmit: (values, formik) => {
      console.log(values);
    },
  });

  // function handleOnChange(key: string, value: string, float = false) {
  //   value = value.trim();

  //   dispatch(
  //     updateDutchAuction({
  //       key,
  //       value:
  //         value.length === 0
  //           ? undefined
  //           : float
  //           ? parseFloat(value)
  //           : parseInt(value),
  //     })
  //   );
  // }
  return (
    <div className="pt-8 pb-10">
      {/* <h2 className="text-xl text-indigo-800">Dutch auction</h2> */}
      <section className="mt-6 grid grid-cols-4 gap-x-10">
        <div className="flex flex-col">
          <strong>Quantity of collection</strong>
          <BaseInput
            type="number"
            {...dutchAuctionForm.getFieldProps("quantity")}
            error={
              dutchAuctionForm.touched.quantity &&
              dutchAuctionForm.errors.quantity ? (
                <p className="text-base text-red-500">
                  {dutchAuctionForm.errors.quantity}
                </p>
              ) : null
            }
            wrapperClass="mt-2"
          />
        </div>

        <div className="flex flex-col">
          <strong>Starting Price</strong>
          <BaseInput
            type="number"
            {...dutchAuctionForm.getFieldProps("startingPrice")}
            error={
              dutchAuctionForm.touched.startingPrice &&
              dutchAuctionForm.errors.startingPrice ? (
                <p className="text-base text-red-500">
                  {dutchAuctionForm.errors.startingPrice}
                </p>
              ) : null
            }
            wrapperClass="mt-2"
            placeholder="starting price"
            postfix={<span className="font-semibold text-indigo-800">ETH</span>}
          />
        </div>
        <div className="flex flex-col">
          <strong>Ending Price</strong>
          <BaseInput
            {...dutchAuctionForm.getFieldProps("endingPrice")}
            error={
              dutchAuctionForm.touched.endingPrice &&
              dutchAuctionForm.errors.endingPrice ? (
                <p className="text-base text-red-500">
                  {dutchAuctionForm.errors.endingPrice}
                </p>
              ) : null
            }
            wrapperClass="mt-2"
            placeholder="ending price"
            postfix={<span className="font-semibold text-indigo-800">ETH</span>}
          />
        </div>
        <div className="flex flex-col">
          <strong>Amount Decrement</strong>
          <BaseInput
            type="number"
            {...dutchAuctionForm.getFieldProps("decrementAmount")}
            error={
              dutchAuctionForm.touched.decrementAmount &&
              dutchAuctionForm.errors.decrementAmount ? (
                <p className="text-base text-red-500">
                  {dutchAuctionForm.errors.decrementAmount}
                </p>
              ) : null
            }
            wrapperClass="mt-2"
            placeholder="amount"
            postfix={<span className="font-semibold text-indigo-800">ETH</span>}
          />
        </div>
      </section>
      <section className="mt-10 flex items-start  gap-10">
        <DateTimeRangePicker />
        <div className=" max-w-[300px] flex-1 rounded-md bg-white p-5 ring-1 ring-gray-200">
          <strong>Minutes</strong>
          <BaseSelect
            options={[]}
            buttonClass="!bg-white ring-1 ring-gray-200 !text-gray-800 mt-2"
            selectorIconColor="black"
          />
        </div>
      </section>
    </div>
  );
};

export default DutchAuction;

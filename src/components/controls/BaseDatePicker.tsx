import React, { FC, useEffect, useState } from "react";

import { getDateCount, getYearsBackDated } from "@/utils/date";

import BaseSelect from "./BaseSelect";

interface AppProps {
  label: string;
}

const BaseDatePicker: FC<AppProps> = ({ label }) => {
  const [dates, setDates] = useState<{ name: number }[]>([]);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [day, setDay] = useState<number>(new Date().getDay());

  const MONTHS: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const YEARS: number[] = getYearsBackDated(15);

  useEffect(() => {
    setDates(
      Array(getDateCount(year, month))
        .fill(null)
        .map((_, index) => ({ name: index + 1 }))
    );
  }, [month]);

  return (
    <div className="my-3">
      <strong>{label}</strong>
      <div className="grid grid-cols-3 gap-3">
        <div className="mt-2">
          <strong className="font-semibold text-gray-500">Year</strong>
          <BaseSelect
            onChange={(value) => setYear(value.name as number)}
            showCheck={false}
            buttonClass="!bg-white ring-1 ring-gray-200 !text-gray-800"
            options={YEARS.map((year) => ({
              name: year,
            }))}
          />
        </div>
        <div className="mt-2">
          <strong className="font-semibold text-gray-500">Month</strong>
          <BaseSelect
            onChange={(value) => setMonth(value.name as number)}
            showCheck={false}
            buttonClass="!bg-white ring-1 ring-gray-200 !text-gray-800"
            options={MONTHS.map((month) => ({ name: month }))}
          />
        </div>
        <div className="mt-2">
          <strong className="font-semibold text-gray-500">Day</strong>
          <BaseSelect
            onChange={(value) => setDay(value.name as number)}
            showCheck={false}
            buttonClass="!bg-white ring-1 ring-gray-200 !text-gray-800"
            options={dates}
          />
        </div>
      </div>
      <div className="mt-3">
        <strong className="font-semibold text-gray-500">Time</strong>
        <div className="grid grid-cols-3 gap-3">
          <BaseSelect
            showCheck={false}
            buttonClass="!bg-white ring-1 ring-gray-200 !text-gray-800"
            options={Array(12)
              .fill(null)
              .map((_, index: number) => ({
                name: index + 1,
              }))}
          />
          <BaseSelect
            showCheck={false}
            buttonClass="!bg-white ring-1 ring-gray-200 !text-gray-800"
            options={Array(60)
              .fill(null)
              .map((_, index: number) => ({
                name: index < 10 ? "0" + index : index,
              }))}
          />
          <BaseSelect
            showCheck={false}
            buttonClass="!bg-white ring-1 ring-gray-200 !text-gray-800"
            options={[{ name: "AM" }, { name: "PM" }]}
          />
        </div>
      </div>
    </div>
  );
};

export default BaseDatePicker;

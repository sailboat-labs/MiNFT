import React, { FC, useEffect, useState } from "react";

import { SelectOption } from "@/interfaces";
import { getDateCount, getYearsBackDated } from "@/utils/date";

import BaseSelect from "./BaseSelect";

interface AppProps {
  label: string;
  onChange?: (date: Date) => void;
}
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

const BaseDatePicker: FC<AppProps> = ({ label, onChange }) => {
  const today = new Date();
  const [dates, setDates] = useState<{ name: number }[]>([]);
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<SelectOption>({
    name: MONTHS[today.getMonth()],
    index: today.getMonth(),
  });
  const [day, setDay] = useState<number>(today.getDate());
  const [hours, setHours] = useState<number>(today.getHours());
  const [minutes, setMinutes] = useState<number>(today.getMinutes());
  const [meridiem, setMeridiem] = useState<string>(hours >= 12 ? "PM" : "AM");

  const YEARS: number[] = getYearsBackDated(-15);

  useEffect(() => {
    if (year && month && (month.index as number) > -1) {
      setDates(
        Array(getDateCount(year, month.index as number))
          .fill(null)
          .map((_, index) => ({ name: index + 1 }))
      );
    }
  }, [month, year]);

  useEffect(() => {
    // todo: complete setting of date

    // console.log(
    //   day,
    //   MONTHS.indexOf(month.name as string), // 0 - 11
    //   year,
    //   hours, // 1-12
    //   minutes,
    //   meridiem
    // );
    const monthVal = MONTHS.indexOf(month.name as string);
    const hoursVal = meridiem === "PM" ? hours + 12 : hours;
    const date = new Date(
      `${year}-${monthVal + 1 < 10 ? "0" : ""}${monthVal + 1}-${
        day < 10 ? "0" : ""
      }${day}T${hoursVal}:${minutes}`
    );

    if (onChange) {
      onChange(date);
    }
  }, [day, month, year, hours, minutes, meridiem]);

  return (
    <div className="my-3">
      <strong>{label}</strong>
      <div className="grid grid-cols-3 gap-3">
        <div className="mt-2">
          <strong className="font-semibold text-gray-500">Year</strong>
          <BaseSelect
            onChange={(value) => setYear(value.name as number)}
            showCheck={false}
            defaultValue={{ name: year }}
            buttonClass="!bg-white ring-1 ring-gray-200 !text-gray-800"
            options={YEARS.map((year) => ({
              name: year,
            }))}
          />
        </div>
        <div className="mt-2">
          <strong className="font-semibold text-gray-500">Month</strong>
          <BaseSelect
            onChange={setMonth}
            showCheck={false}
            defaultValue={{ name: MONTHS[month.index as number] }}
            buttonClass="!bg-white ring-1 ring-gray-200 !text-gray-800"
            options={MONTHS.map((month, value) => ({
              name: month,
              index: value,
            }))}
          />
        </div>
        <div className="mt-2">
          <strong className="font-semibold text-gray-500">Day</strong>
          <BaseSelect
            defaultValue={{ name: day }}
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
            defaultValue={{ name: hours % 12 ? hours % 12 : 12 }}
            buttonClass="!bg-white ring-1 ring-gray-200 !text-gray-800"
            onChange={(value) => setHours(value.name as number)}
            options={Array(12)
              .fill(null)
              .map((_, index: number) => ({
                name: index + 1,
              }))}
          />
          <BaseSelect
            defaultValue={{ name: minutes }}
            showCheck={false}
            onChange={(value) => setMinutes(value.name as number)}
            buttonClass="!bg-white ring-1 ring-gray-200 !text-gray-800"
            options={Array(60)
              .fill(null)
              .map((_, index: number) => ({
                name: index < 10 ? "0" + index : index,
              }))}
          />
          <BaseSelect
            showCheck={false}
            onChange={(value) => setMeridiem(value.name as string)}
            defaultValue={{ name: hours >= 12 ? "PM" : "AM" }}
            buttonClass="!bg-white ring-1 ring-gray-200 !text-gray-800"
            options={[{ name: "AM" }, { name: "PM" }]}
          />
        </div>
      </div>
    </div>
  );
};

export default BaseDatePicker;

/* eslint-disable @next/next/no-img-element */

import useLinkExtractor from "@/hooks/UseLinkExtractor";
import { useEffect } from "react";

interface ITeamInfoProps {
  info: string;
}

export default function TeamInfo({ info }: ITeamInfoProps) {
  const { setText, LinkItems } = useLinkExtractor();


  useEffect(()=>{
    setText(info ?? "");
  },[info])

  return (
    <div className="">
      <div className="mt-10 text-2xl font-bold ">Team Information</div>
      <div className="mt-3 text-sm text-gray-500 dark:text-gray-200">
        {info}
      </div>
      <LinkItems />
    </div>
  );
}

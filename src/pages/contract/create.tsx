import { ChangeEvent, useState } from "react";

import { ENGLISH_AUCTION_TEMPLATE } from "@/data/AuctionTemplates/English";

export default function Create() {
  const [contract, setContract] = useState<string>(ENGLISH_AUCTION_TEMPLATE);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log({ name: e.target.name, value: e.target.value });
    let _contract = contract;
    _contract = _contract
      .toString()
      .replace(`%${e.target.name}%`, e.target.value);

    setContract(_contract);
  };

  return (
    <div className="flex w-full">
      <div className="fixed z-20 grid h-screen w-1/2 grid-cols-2 gap-5 bg-gray-900 px-20 py-20">
        <input
          onChange={(e) => {
            handleInputChange(e);
          }}
          name="name"
          className="h-fit rounded-lg border-b-2 bg-black py-3 px-5 text-white"
          placeholder="Name"
        />
        <input
          onChange={(e) => {
            handleInputChange(e);
          }}
          name="symbol"
          className="h-fit rounded-lg border-b-2 bg-black py-3 px-5 text-white"
          placeholder="Symbol"
        />
      </div>
      <div className="min-h-52 absolute right-0 w-1/2 px-20 py-20 text-white">
        <pre>{contract}</pre>
      </div>
    </div>
  );
}

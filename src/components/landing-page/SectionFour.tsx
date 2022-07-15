import { useState } from "react";

export default function SectionFour() {
  const [heading, setHeading] = useState("The Saudis are buying");

  const changeHeading = (e: any) => {
    e.preventDefault();
    setHeading(e.target.value);
  };

  const [collections, setCollections] = useState("CryptoPunks");

  const changeCollections = (e: any) => {
    e.preventDefault();
    setCollections(e.target.value);
  };

  const [bitcoins, setBitcoins] = useState("541,903");

  const changeBitcoins = (e: any) => {
    e.preventDefault();
    setBitcoins(e.target.value);
  };

  const [oilBarrels, setOilBarrells] = useState("266,578,000,000");

  const changeOilBarrells = (e: any) => {
    e.preventDefault();
    setOilBarrells(e.target.value);
  };

  const [labelOne, setLabelOne] = useState("NFT Collections");

  const changeLabelOne = (e: any) => {
    e.preventDefault();
    setLabelOne(e.target.value);
  };

  const [labelTwo, setLabelTwo] = useState("Bitcoins");

  const changeLabelTwo = (e: any) => {
    e.preventDefault();
    setLabelTwo(e.target.value);
  };

  const [labelThree, setLabelThree] = useState("Oil Barrels");

  const changeLabelThree = (e: any) => {
    e.preventDefault();
    setLabelThree(e.target.value);
  };

  return (
    <div className="pt-40 pb-28">
      <div className="text-white">
        <div className="mx-auto w-4/5">
          <input
            type="text"
            id="sectionfour-heading"
            value={heading}
            onChange={changeHeading}
            onBlur={changeHeading}
            className="w-full border-0 bg-transparent text-center font-serif text-8xl italic"
          />
        </div>
        <div className="mx-auto flex w-2/3 flex-row justify-between pt-10 font-dmsans">
          <div className="flex flex-col">
            <input
              type="text"
              id="cryptoPunks"
              value={collections}
              onChange={changeCollections}
              onBlur={changeCollections}
              className="border-0 bg-transparent text-center text-3xl"
            />
            <input
              type="text"
              id="label1"
              value={labelOne}
              onChange={changeLabelOne}
              onBlur={changeLabelOne}
              className="border-0 bg-transparent text-center text-base font-bold text-[#A0A09F]"
            />
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              id="bitcoins"
              value={bitcoins}
              onChange={changeBitcoins}
              onBlur={changeBitcoins}
              className="border-0 bg-transparent text-center text-3xl"
            />
            <input
              type="text"
              id="label2"
              value={labelTwo}
              onChange={changeLabelTwo}
              onBlur={changeLabelTwo}
              className="border-0 bg-transparent text-center text-base font-bold text-[#A0A09F]"
            />
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              id="oilbarrels"
              value={oilBarrels}
              onChange={changeOilBarrells}
              onBlur={changeOilBarrells}
              className="border-0 bg-transparent text-center text-3xl"
            />
            <input
              type="text"
              id="label3"
              value={labelThree}
              onChange={changeLabelThree}
              onBlur={changeLabelThree}
              className="border-0 bg-transparent text-center text-base font-bold text-[#A0A09F]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

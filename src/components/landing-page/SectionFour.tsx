import { useState } from "react";

export default function SectionFour() {
  const [heading, setHeading] = useState("Legendary Indians Collection");

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

  const [info1, setInfo1] = useState("5 Whitelist Spots with each mint");

  const changeInfo1 = (e: any) => {
    e.preventDefault();
    setInfo1(e.target.value);
  };

  const [info2, setInfo2] = useState("40 Legendary Indians");

  const changeInfo2 = (e: any) => {
    e.preventDefault();
    setInfo2(e.target.value);
  };

  const [info3, setInfo3] = useState("Random gift of a Belan or Chappal");

  const changeInfo3 = (e: any) => {
    e.preventDefault();
    setInfo3(e.target.value);
  };

  return (
    <div className="pt-32 pb-20 sm:pb-28 lg:pt-40">
      <div className="text-white">
        <div className="mx-auto w-11/12">
          <textarea
            disabled
            id="sectionfour-heading"
            value={heading}
            onChange={changeHeading}
            onBlur={changeHeading}
            className="h-[12rem] w-full resize-none overflow-hidden border-0 bg-transparent text-center font-serif text-6xl italic sm:text-8xl md:h-80 lg:h-40 lg:text-8xl"
          />
        </div>
        <div className="mx-auto flex w-full flex-col justify-between pt-10 font-dmsans lg:w-3/4 lg:flex-row lg:pt-0">
          <div className="mx-auto flex flex-col space-y-10 lg:w-full lg:flex-row lg:justify-between lg:space-y-0 lg:mt-0 lg:mb-0">
            <textarea
              disabled
              id="sectionfour-info"
              value={info1}
              onChange={changeInfo1}
              onBlur={changeInfo1}
              className="resize-none overflow-hidden border-0 bg-transparent text-center text-3xl lg:text-2xl"
            />
            <textarea
              disabled
              id="sectionfour-info"
              value={info2}
              onChange={changeInfo2}
              onBlur={changeInfo2}
              className="resize-none overflow-hidden border-0 bg-transparent text-center text-3xl font-bold lg:text-2xl"
            />
            <textarea
              disabled
              id="sectionfour-info"
              value={info3}
              onChange={changeInfo3}
              onBlur={changeInfo3}
              className="resize-none overflow-hidden border-0 bg-transparent text-center text-3xl lg:text-2xl"
            />
          </div>
        </div>
        {/* <div className="mt-6 mb-5 flex flex-col">
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
          <div className="mt-6 mb-5 flex flex-col">
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
          <div className="mt-6 mb-5 flex flex-col">
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
        </div> */}
      </div>
    </div>
  );
}

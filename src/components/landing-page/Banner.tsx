/* eslint-disable @next/next/no-img-element */
import { ethers } from "ethers";
import { getContractForMinting } from "features/minting-page/utils/get-contract-for-minting";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Banner() {
  let contract: ethers.Contract | undefined = undefined;
  const [price, setPrice] = useState("0");
  const [totalQuantity, setTotalQuantity] = useState<number>();
  const [totalSupply, setTotalSupply] = useState<number>(0);

  const contractAddress = "0x5452c07C47dfD2Dc3bA7A6bbd422f2b689b36037";
  let account: string;

  async function prepareContract() {
    contract = await getContractForMinting(contractAddress);
  }

  useEffect(() => {
    prepareContract();
  }, []);

  const [heading, setHeading] = useState(
    "We're here to puja the Crypto Winter away. You better mint Bloody Bastards"
  );

  const changeHeading = (e: any) => {
    e.preventDefault();
    const value = e.target.value;
    setHeading(value);
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode == 13) {
      changeHeading(e);
    }
  };

  //   style attribute {
  //     font-family: wfont_531ace_58938f917a1b4e66a2181c66dc63faa1,wf_58938f917a1b4e66a2181c66d,orig_century_schoolbook_std;
  // }

  return (
    <div>
      <div className="text-white">
        <div className="mx-auto mt-28 w-2/3 text-center sm:mt-32 sm:w-4/5 lg:mt-36 lg:w-3/4">
          <textarea
            disabled
            id="banner-heading"
            className="h-[26rem] w-full resize-none overflow-hidden whitespace-normal border-0 bg-transparent p-0 text-center font-heading text-5xl italic leading-tight text-white hover:resize focus:resize sm:h-auto md:h-[24rem] md:text-7xl lg:h-[18rem] lg:text-8xl"
            value={heading}
            onChange={changeHeading}
            onKeyDown={handleKeyDown}
            onBlur={changeHeading}
          />
        </div>
        <div className="mt-8 mb-8 flex w-full flex-col items-center justify-center">
          <div
            onClick={async () => {
              try {
                // const contract = await prepareContract();

                // const price = await contract.mintPrice();

                // const setname = await contract.setName("Francis Eshun");
                // setname.wait(2).then(async () => {
                //   // read the contract again, similar to above
                //   const read = await contract.name();
                //   console.log("Updated name of contract is " + read.toString());
                // });

                const mint = await contract?.mint(1, {
                  value: "1",
                });

                mint.wait(2).then(async () => {
                  // read the contract again, similar to above
                  const read = await contract?.name();
                  console.log("Mint complete ");
                });

                // await contract.mint(1);

                // console.log({ mint });
              } catch (error: any) {
                toast.error(error?.data?.message);
                console.log(error);
              }
            }}
            className="w-fit cursor-pointer rounded-xl border-0 bg-black py-6 px-16 uppercase transition-all hover:scale-105 hover:bg-black"
          >
            MINT NOW
          </div>
        </div>
        <div className="box-border flex w-full flex-row justify-center lg:hidden ">
          <img
            src="/images/landing/indiansnfts/1.png"
            alt="Indian Nft Example"
            className="h-32 w-32 object-cover md:h-36 md:w-36"
          />
          <img
            src="/images/landing/indiansnfts/2.png"
            alt="Indian Nft Example"
            className="h-32 w-32 object-cover md:h-36 md:w-36"
          />
          <img
            src="/images/landing/indiansnfts/3.png"
            alt="Indian Nft Example"
            className="h-32 w-32 object-cover md:h-36 md:w-36"
          />
          <img
            src="/images/landing/indiansnfts/4.png"
            alt="Indian Nft Example"
            className="hidden object-cover md:inline-block md:h-36 md:w-36"
          />
          <img
            src="/images/landing/indiansnfts/5.png"
            alt="Indian Nft Example"
            className="hidden object-cover md:inline-block md:h-36 md:w-36"
          />
        </div>
        <div className="hidden flex-row justify-center overflow-hidden lg:flex">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="box-border ">
              <img
                src={`/images/landing/indiansnfts/${index + 1}.png`}
                alt="Indian NFT Example"
                className="object-cover lg:h-52 lg:w-52"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

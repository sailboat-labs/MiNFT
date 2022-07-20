/* eslint-disable @next/next/no-img-element */
import { ethers } from "ethers";
import { getContract } from "features/dashboard/components/DeployedContracts/index.logic";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import images from "./Images";

export default function Banner() {
  let contract: ethers.Contract;
  const [price, setPrice] = useState("0");
  const [totalQuantity, setTotalQuantity] = useState("0");
  const [totalMinted, setTotalMinted] = useState<any>();

  const contractAddress = "0x2D3947F68b6dd987e3061C31eF3D37391772842b";
  let account: string;

  async function prepareContract() {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    account = signerAddress;
    const registry = getContract("Registry", signer);

    if (!registry) {
      toast.error("Registry not found");
      return;
    }

    const contractType = ethers.utils.parseBytes32String(
      await registry.contract.proxyType(contractAddress)
    );

    const abi = getContract(contractType, signer)?.abi;

    const _contract = new ethers.Contract(contractAddress, abi, signer);
    contract = _contract;

    const name = await contract.name();
    const symbol = await contract.symbol();
    const totalSupply = await contract.totalSupply();
    setPrice(ethers.utils.formatEther(await contract.mintPrice()));
    const tokensMinted = (
      await contract.tokensMinted(signerAddress)
    )._hex.toString();
    const totalQuantity = (await contract.totalQuantity())._hex.toString();

    console.log({ format: ethers.utils.formatEther(98) });

    console.log({
      name,
      symbol,
      price: contract.mintPrice()._hex,
      tokensMinted,
      totalQuantity,
      totalSupply,
    });
    console.log({ contract });
    return contract;
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
        <div className="mt-8 mb-8 flex justify-center">
          <div
            onClick={async () => {
              try {
                const contract = await prepareContract();

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
            className="cursor-pointer rounded-xl border-0 bg-black py-6 px-16 uppercase transition-all hover:scale-105 hover:bg-black"
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
                src={`/images/landing/indiansnfts/${index+1}.png`}
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

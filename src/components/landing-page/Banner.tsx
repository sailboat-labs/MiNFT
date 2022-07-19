/* eslint-disable @next/next/no-img-element */
import { ethers } from "ethers";
import { getContract } from "features/dashboard/components/DeployedContracts/index.logic";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import images from "./Images";

export default function Banner() {
  let contract: ethers.Contract = undefined;
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
    "We're here to Puja the Crypto Winter away and save the day….you better mint Bloody Bastards"
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

  return (
    <div>
      <div className="text-white">
        <div className="mx-auto mt-28 w-2/3 text-center sm:mt-32 sm:w-4/5 lg:mt-48 lg:w-3/4">
          <textarea
            disabled
            id="banner-heading"
            className="h-[37rem] w-full resize-none overflow-hidden whitespace-normal border-0 bg-transparent p-0 text-center font-serif text-5xl italic leading-tight text-white hover:resize focus:resize sm:h-auto md:h-[28rem] md:text-7xl lg:h-[18rem] lg:text-7xl"
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

          <div>{contract}</div>
        </div>
        <div className="box-border flex w-full flex-row justify-center lg:hidden ">
          <img
            src={images.elements[0].src}
            alt={images.elements[0].alt}
            className="h-32 w-32 object-cover md:h-36 md:w-36"
          />
          <img
            src={images.elements[1].src}
            alt={images.elements[1].alt}
            className="h-32 w-32 object-cover md:h-36 md:w-36"
          />
          <img
            src={images.elements[2].src}
            alt={images.elements[2].alt}
            className="h-32 w-32 object-cover md:h-36 md:w-36"
          />
          <img
            src={images.elements[3].src}
            alt={images.elements[3].alt}
            className="hidden object-cover md:inline-block md:h-36 md:w-36"
          />
          <img
            src={images.elements[4].src}
            alt={images.elements[4].alt}
            className="hidden object-cover md:inline-block md:h-36 md:w-36"
          />
        </div>
        <div className="hidden flex-row justify-center overflow-hidden lg:flex">
          {images.elements.map((image, index) => (
            <div key={index} className="box-border ">
              <img
                src={image.src}
                alt={image.alt}
                className="object-cover lg:h-52 lg:w-52"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

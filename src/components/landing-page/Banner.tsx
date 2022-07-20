/* eslint-disable @next/next/no-img-element */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type props = {
  contract: ethers.Contract | undefined;
};

export default function Banner({ contract }: props) {
  console.log("contract sent", contract);

  contract?.on("*", (from, to, value, event) => {
    console.log({
      from: from,
      to: to,
      value: value?.toString(),
      data: event,
    });
  });

  const [price, setPrice] = useState("0");
  const [totalQuantity, setTotalQuantity] = useState<number>();
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [userMinted, setUserMinted] = useState(true);

  const [mintButtonText, setMintButtonText] = useState("Mint Now");

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

  async function preparePage() {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    const totalQuantity = await contract?.totalQuantity();
    const totalSupply = await contract?.totalSupply();
    const tokensMinted = await contract?.tokensMinted(signerAddress);
    setTotalQuantity(parseInt(totalQuantity?._hex));
    setTotalSupply(parseInt(totalSupply?._hex));
    if (tokensMinted > 0) {
      setMintButtonText("Already Minted Bloody Bastard! Come on...");
    }
  }

  async function handleMint() {
    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();

      const tokensMinted = await contract?.tokensMinted(signerAddress);

      if (tokensMinted > 0) return;
      toast.dismiss();
      toast.loading("Initializing Mint");
      let mint: any;

      try {
        mint = await contract?.mint(1, {
          value: "1",
        });
      } catch (error: any) {
        if (!error) return console.log("An Error Occurred");

        toast.dismiss();
        toast.error(error!.message);
      }

      if (!mint) return;

      toast.dismiss();
      toast.loading(
        `Minting... Check your transaction on etherscan: ${mint.hash}`
      );

      const res = await mint.wait();

      if (res.blockNumber) {
        toast.dismiss();
        toast.success("Minting successful");
        preparePage();
      } else {
        toast.error("Minting failed");
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  }

  useEffect(() => {
    preparePage();
  }, [contract]);

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
              handleMint();
            }}
            className="w-fit cursor-pointer rounded-xl border-0 bg-black py-6 px-16 uppercase transition-all hover:scale-105 hover:bg-black"
          >
            {mintButtonText}
          </div>

          <div className="mt-10 w-[500px]">
            <div className="mb-1 flex justify-between">
              <span className="text-base font-medium text-white dark:text-white">
                Total Minted
              </span>
              <span className="text-sm font-medium text-white dark:text-white">
                {(totalSupply / (totalQuantity ?? 0)) * 100}% ({totalSupply}/
                {totalQuantity})
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-2.5 rounded-full bg-[#FF9933]"
                style={{
                  width: `${(totalSupply / (totalQuantity ?? 0)) * 100}%`,
                }}
              ></div>
            </div>
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

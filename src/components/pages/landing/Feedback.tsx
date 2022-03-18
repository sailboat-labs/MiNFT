/* eslint-disable @next/next/no-img-element */
import { TwitterMentionButton } from "react-twitter-embed";

export default function Feedback() {
  return (
    <section className="contained py-20">
      <div className=" border-solid">
        <div className="flex flex-col items-start border-0 border-gray-200 leading-7  lg:flex-row lg:items-center">
          <div className="box-border flex-1 border-solid text-center sm:text-left">
            <h1 className="bg-gradient-to-r from-red-900 md:via-[#1B9CF0] to-[#1B9CF0] bg-clip-text text-4xl font-extrabold text-transparent dark:from-red-400 md:dark:via-[#1B9CF0]">
              Community built platform
            </h1>
            <p className="mg:text-2xl mt-5 border-0 border-gray-200 text-center text-lg md:text-left lg:text-2xl">
              Help us shape the <strong>MiNFT</strong> platform, send us a
              tweet!
            </p>
            <div className="mt-10 flex justify-center md:justify-start">
              <TwitterMentionButton
                options={{
                  size: "large",
                }}
                placeholder={
                  <div className={` h-3 w-48 rounded-lg bg-gray-200 `}></div>
                }
                screenName="EthMinft"
              />
            </div>
          </div>

          <div className="mt-10 flex w-full items-center justify-center md:w-fit">
            <img
              className="h-28 w-28 rounded-full lg:h-48 lg:w-48 transition-all hover:-rotate-12 hover:scale-110"
              src="/images/twitter_logo.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}

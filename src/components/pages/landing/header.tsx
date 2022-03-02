/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

// import DarkModeMenu from "../navbar/darkmode-toggle";

export default function Header() {
  const [headerVisible, setHeaderVisible] = useState(true);

  return (
    <div className='bg-primaryblue bg-opacity-20'>
      <section className={`fixed transition-all z-[999] w-full  px-8 text-gray-700 ${headerVisible ? "bg-transparent" : "bg-white text-white shadow"}`}>
        <div className='contained flex  flex-col items-center justify-between py-3 md:flex-row'>
          <div className='relative flex flex-col md:flex-row'>
            <div className='relative z-[2] flex'>
              {/* <img
              className="mx-auto w-10 h-10"
              src="/logo.webp"
              alt="feature image"
            /> */}
              <a
                href='#'
                className={`flex items-center  font-medium text-gray-900 transition-all md:mb-0 lg:w-auto lg:items-center lg:justify-center 
                ${
                  headerVisible
                    ? 'translate-y-12 scale-[2] md:translate-x-8'
                    : 'translate-y-0 scale-100'
                }
                `}
              >
                <span className='mx-auto select-none text-xl font-black leading-none text-gray-900'>
                  MiNFT<span className='text-indigo-600'>.</span>
                </span>
              </a>
              <div
                className={`ml-10 transition-all 
              ${
                headerVisible
                  ? 'translate-x-5 opacity-0'
                  : 'translate-x-0 opacity-100'
              }
              `}
              >
                <input
                  className='rounded-lg bg-gray-100 px-8 py-2 transition-all focus:border-0 focus:px-10'
                  placeholder='Search...'
                />
              </div>
            </div>
            {/* <nav className=" relative z-[2] hidden md:flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
            <Link passHref href="/">
              <div className="mr-5 cursor-pointer font-medium leading-6 text-gray-500 hover:text-gray-900">
                Home
              </div>
            </Link>
            <Link passHref href="/nft">
              <div className="mr-5 cursor-pointer font-medium leading-6 text-gray-500 hover:text-gray-900">
                NFT
              </div>
            </Link>
            <Link passHref href="/nft/entries">
              <div className="mr-5 cursor-pointer font-medium leading-6 text-gray-500 hover:text-gray-900">
                NFT Entries
              </div>
            </Link>
            <a
              href="#_"
              className="mr-5 font-medium leading-6 text-gray-500 hover:text-gray-900"
            >
              About Us
            </a>
          </nav> */}
          </div>

          <div className='ml-5 hidden items-center space-x-6 md:inline-flex lg:justify-end'>
            {/* <DarkModeMenu className="md:mr-5" /> */}
            <Link passHref href='/nft/entries'>
              <div className='mr-5 cursor-pointer rounded bg-gray-200 px-3 py-1 font-medium leading-6  hover:text-gray-900'>
                Add Project
              </div>
            </Link>
            <div className='rounded-[50%] p-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Header */}
      <div className='contained pt-20 pb-10 '>
        <VisibilitySensor
          // partialVisibility
          onChange={(isVisible) => {
            setHeaderVisible(isVisible);
          }}
        >
          <div className='p-10 -mt-5 '></div>
        </VisibilitySensor>
        <div className='text-4xl font-bold mt-10'>Discover, collect, and sell</div>
        <div className='text-4xl font-bold'>extraordinary NFTs</div>
        <div className='flex gap-3 py-5 transition-all hover:scale-105 hover:translate-x-1 cursor-pointer w-fit'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <span>Learn More About NFT</span>
        </div>
      </div>
    </div>
  );
}

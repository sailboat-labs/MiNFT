import { useState } from 'react';
import CollectionStats from './stats';
import TeamInfo from './team_information';
import WishlistRequirements from './wishlist_requirements';

export default function CollectionSummary() {
  const [ratings, setRatings] = useState(4);

  return (
    <>
      <div className='contained flex w-full flex-col gap-20 lg:flex-row'>
        <div className=' w-full lg:w-[70%]'>
          <div className='mt-10 text-2xl font-bold'>Cool Cats Collection</div>
          <div className='mt-3 text-sm text-gray-500'>
            Cool Cats is a collection of 9,999 randomly generated and
            stylistically curated NFTs that exist on the Ethereum Blockchain.
            Cool Cat holders can participate in exclusive events such as NFT
            claims, raffles, community giveaways, and more. Remember, all cats
            are cool, but some are cooler than others.
          </div>
          <div className='mt-5 grid grid-cols-2 gap-5 border-2 border-black px-5 py-3 md:grid-cols-3 xl:grid-cols-4'>
            <div className='flex flex-col gap-2'>
              <span className='font-bold'>Presale Mint Date and Time</span>
              <span>08/12/2022 - 8pm GMT</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='font-bold'>Public Mint Date and Time</span>
              <span>08/12/2022 - 8pm GMT</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='font-bold'>Whitelist Available</span>
              <span>No</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='font-bold'>Team Info</span>
              <span>Yes</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='font-bold'>Project Type</span>
              <span>Art</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='font-bold'>Presale Mint Cost</span>
              <span>TBA</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='font-bold'>Public Mint Cost</span>
              <span>TBA</span>
            </div>
          </div>
          <TeamInfo />
          <CollectionStats className='mt-10 justify-center' />
          <WishlistRequirements />
        </div>
        <div className=' w-full rounded lg:w-[30%]'>
          <div className='flex h-[400px] cursor-pointer flex-col justify-end rounded-lg bg-gray-200'>
            <div className=' flex w-full items-center gap-5 rounded-b-lg border-2 border-t-0 bg-white px-3 py-3'>
              <div className='rounded-[50%] border-2 bg-gray-100 p-5'></div>
              <div className='whitespace-wrap'>Cool Cats</div>
            </div>
          </div>
          <table className='mt-5'>
            <tbody>
              <tr className='bg-white '>
                <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                  Contract Address
                </td>
                <td className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
                  0x4123423412342213423
                </td>
              </tr>
              <tr className='bg-white '>
                <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                  Tokens Standard
                </td>
                <td className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
                  ERC 721
                </td>
              </tr>
              <tr className='bg-white '>
                <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                  Blockchain
                </td>
                <td className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
                  Ethereum
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

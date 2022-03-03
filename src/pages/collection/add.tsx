import { useState } from 'react';

import { blockchains } from '@/data/blockchains';
import { categories } from '@/data/categories';

import Layout from '@/components/layout/Layout';
import Dropdown from '@/components/shared/dropdown';

export default function AddCollection() {
  const [selectedProjectType, setSelectedProjectType] = useState<string>();

  return (
    <Layout>
      <form className='contained mt-10'>
        <strong className='text-2xl '>Add New Collection</strong>

        <div className='mt-10 flex flex-col md:flex-row'>
          <div className='h-72 flex-1 '>
            <div className='overflow-hidden sm:rounded-lg'>
              <table className='w-full'>
                <tbody>
                  <tr className='bg-white '>
                    <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                      Collection Name
                    </td>
                    <td className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
                      <input
                        className='default-input w-full'
                        placeholder='collection'
                      />
                    </td>
                  </tr>
                  <tr className='bg-white '>
                    <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                      Blockchain
                    </td>
                    <td className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
                      <Dropdown
                        onItemSelected={setSelectedProjectType}
                        options={blockchains}
                        className='w-full '
                      />
                    </td>
                  </tr>
                  <tr className='bg-white '>
                    <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                      Collection Image
                    </td>
                    <td className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
                      <div className='w-flex-1 h-36 rounded-lg bg-gray-100'></div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className=' flex-1 '>
            <div className='overflow-hidden sm:rounded-lg'>
              <table className='w-full'>
                <tbody>
                  <tr className='w-full bg-white'>
                    <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                      Project Type
                    </td>
                    <td className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
                      <Dropdown
                        onItemSelected={setSelectedProjectType}
                        options={categories}
                        className='w-full'
                      />
                    </td>
                  </tr>
                  <tr className='bg-white '>
                    <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                      Website
                    </td>
                    <td className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
                      <input
                        className='default-input w-full'
                        placeholder='Website'
                      />
                    </td>
                  </tr>
                  <tr className='bg-white '>
                    <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                      Twitter
                    </td>
                    <td className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
                      <input
                        className='default-input w-full'
                        placeholder='Twitter'
                      />
                    </td>
                  </tr>
                  <tr className='bg-white '>
                    <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                      Discord
                    </td>
                    <td className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
                      <input
                        className='default-input w-full'
                        placeholder='Discord'
                      />
                    </td>
                  </tr>
                  <tr className='bg-white '>
                    <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                      Etherscan
                    </td>
                    <td className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
                      <input
                        className='default-input w-full'
                        placeholder='Etherscan'
                      />
                    </td>
                  </tr>
                  <tr className='bg-white '>
                    <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                      Opensea
                    </td>
                    <td className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
                      <input
                        className='default-input w-full'
                        placeholder='Opensea'
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='mt-5 flex'>
          <div className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
            Description
          </div>
          <textarea
            className='mx-6 min-h-[150px] w-full rounded-lg border-2'
            placeholder='Collection Description'
          />
        </div>

        <div className='mt-10 flex flex-col gap-5 md:flex-row'>
          <div className='flex items-center bg-white'>
            <span className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
              Presale Mint date and time
            </span>
            <span className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
              <div className='h-36 w-36 rounded-lg bg-gray-100'></div>
            </span>
          </div>
          <div className='flex items-center bg-white'>
            <span className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
              Public Mint date and time
            </span>
            <span className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
              <div className='h-36 w-36 rounded-lg bg-gray-100'></div>
            </span>
          </div>
        </div>

        <div className='flex overflow-hidden sm:rounded-lg mt-10 items-start'>
          <table className='w-full'>
            <tbody>
              <tr className='bg-white '>
                <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                  Presale Mint cost
                </td>
                <td className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
                  <input
                    className='default-input w-full'
                    placeholder='presale mint cost'
                  />
                </td>
              </tr>
              <tr className='bg-white '>
                <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                  Whitelist Available
                </td>
                <td className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
                  <Dropdown
                    onItemSelected={setSelectedProjectType}
                    options={['yes','no']}
                    className='w-full '
                  />
                </td>
              </tr>
              
            </tbody>
          </table>
          <table className='w-full'>
            <tbody>
              <tr className='bg-white '>
                <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                  Public Mint cost
                </td>
                <td className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
                  <input
                    className='default-input w-full'
                    placeholder='public mint cost'
                  />
                </td>
              </tr>
              <tr className='bg-white '>
                <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                  Whitelist requirements
                </td>
                <td className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
                <input
                    className='default-input w-full'
                    placeholder='whitelist requirements'
                  />
                </td>
              </tr>
              
            </tbody>
          </table>
          <table className='w-full'>
            <tbody>
              <tr className='bg-white '>
                <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                  Supply
                </td>
                <td className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
                  <input
                    className='default-input w-full'
                    placeholder='supply'
                  />
                </td>
              </tr>
              
              
            </tbody>
          </table>
        </div>

        <div className='mt-10 flex'>
          <div className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
            Team Info
          </div>
          <textarea
            className='mx-6 min-h-[150px] w-full rounded-lg border-2'
            placeholder='Team Info'
          />
        </div>
      </form>
    </Layout>
  );
}

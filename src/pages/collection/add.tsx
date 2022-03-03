import Layout from '@/components/layout/Layout';
import Dropdown from '@/components/shared/dropdown';
import { blockchains } from '@/data/blockchains';
import { categories } from '@/data/categories';
import { useState } from 'react';

export default function AddCollection() {
  const [selectedProjectType, setSelectedProjectType] = useState<string>();

  return (
    <Layout>
      <form className='contained mt-10'>
        <div className='flex flex-col md:flex-row'>
          <div className='h-72 flex-1 '>
            <div className='overflow-hidden sm:rounded-lg'>
              <table className='w-full'>
                <tbody>
                  <tr className='bg-white '>
                    <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                      Collection
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
                      Blockchain
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
                  <tr className='bg-white w-full'>
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
                      <input className='default-input w-full' placeholder='Website' />
                    </td>
                  </tr>
                  <tr className='bg-white '>
                    <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                      Twitter
                    </td>
                    <td className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
                      <input className='default-input w-full' placeholder='Twitter' />
                    </td>
                  </tr>
                  <tr className='bg-white '>
                    <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                      Discord
                    </td>
                    <td className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
                      <input className='default-input w-full' placeholder='Discord' />
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
                      <input className='default-input w-full' placeholder='Opensea' />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='flex mt-5'>
          <div className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
            Description
          </div>
          <textarea className='border-2 w-full rounded-lg min-h-[150px] mx-6' placeholder='Collection Description'/>
        </div>
      </form>
    </Layout>
  );
}

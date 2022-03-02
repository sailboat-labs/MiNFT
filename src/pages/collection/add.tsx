import Layout from '@/components/layout/Layout';

export default function AddCollection() {
  return (
    <Layout>
      <form className='contained mt-10'>
        <div className='flex flex-col md:flex-row'>
          <div className='h-72 flex-1 '>
            <div className='overflow-hidden sm:rounded-lg'>
              <table className=''>
                <tbody>
                  <tr className='bg-white '>
                    <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                      Collection
                    </td>
                    <td className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
                      <input
                        className='default-input'
                        placeholder='collection'
                      />
                    </td>
                  </tr>
                  <tr className='bg-white '>
                    <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                      Blockchain
                    </td>
                    <td className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
                      <input
                        className='default-input'
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
          <div className='h-72 flex-1 '>
            <div className='overflow-hidden sm:rounded-lg'>
              <table className=''>
                <tbody>
                  <tr className='bg-white '>
                    <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                      Project Type
                    </td>
                    <td className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
                      <input
                        className='default-input'
                        placeholder='collection'
                      />
                    </td>
                  </tr>
                  <tr className='bg-white '>
                    <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                      Website
                    </td>
                    <td className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
                      <input
                        className='default-input'
                        placeholder='collection'
                      />
                    </td>
                  </tr>
                  <tr className='bg-white '>
                    <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                      Twitter
                    </td>
                    <td className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
                      <input
                        className='default-input'
                        placeholder='collection'
                      />
                    </td>
                  </tr>
                  <tr className='bg-white '>
                    <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                      Discord
                    </td>
                    <td className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
                      <input
                        className='default-input'
                        placeholder='collection'
                      />
                    </td>
                  </tr>
                  <tr className='bg-white '>
                    <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                      Etherscan
                    </td>
                    <td className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
                      <input
                        className='default-input'
                        placeholder='collection'
                      />
                    </td>
                  </tr>
                  <tr className='bg-white '>
                    <td className='whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900 '>
                      Opensea
                    </td>
                    <td className='whitespace-nowrap py-2 px-6 text-sm text-gray-500 '>
                      <input
                        className='default-input'
                        placeholder='collection'
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
}

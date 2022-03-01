import Layout from '@/components/layout/Layout';
import WatchListTable from '@/components/pages/watchlist/watchlist_table';

export default function WatchList() {
  return (
    <Layout>
      <div>
        <div
          className={`flex items-center font-medium text-gray-900 transition-all md:mb-0 lg:w-auto lg:items-center lg:justify-center `}
        >
          <span className='mx-auto select-none text-4xl font-black leading-none text-gray-900'>
            WatchList
          </span>
        </div>
        <div className='contained'>
          <div className='mx-auto w-fit mt-5 text-xl text-gray-500 text-center'>
            Stay in the loop. Keep an eye on all of your favorite collections
          </div>

          <WatchListTable />
        </div>
      </div>
    </Layout>
  );
}

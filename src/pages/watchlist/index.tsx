import Layout from '@/components/layout/Layout';
import WatchListTable from '@/components/pages/watchlist/watchlist_table';

export default function WatchList() {
  const collections: {
    name: string;
    image: string;
    mintDate: string;
    supply: string;
    whitelist: boolean;
    teamInfo: boolean;
    projectType: string;
  }[] = [
    {
      name: 'Azuki',
      image: '',
      supply: '10000',
      mintDate: 'Tomorrow',
      whitelist: true,
      teamInfo: false,
      projectType: 'ART',
    },
    {
      name: 'Azuki',
      image: '',
      supply: '10000',
      mintDate: 'Tomorrow',
      whitelist: true,
      teamInfo: false,
      projectType: 'ART',
    },
    {
      name: 'Azuki',
      image: '',
      supply: '10000',
      mintDate: 'Tomorrow',
      whitelist: true,
      teamInfo: false,
      projectType: 'ART',
    },
    {
      name: 'Azuki',
      image: '',
      supply: '10000',
      mintDate: 'Tomorrow',
      whitelist: true,
      teamInfo: false,
      projectType: 'ART',
    },
    {
      name: 'Azuki',
      image: '',
      supply: '10000',
      mintDate: 'Tomorrow',
      whitelist: true,
      teamInfo: false,
      projectType: 'ART',
    },
    {
      name: 'Azuki',
      image: '',
      supply: '10000',
      mintDate: 'Tomorrow',
      whitelist: true,
      teamInfo: false,
      projectType: 'ART',
    },
    {
      name: 'Azuki',
      image: '',
      supply: '10000',
      mintDate: 'Tomorrow',
      whitelist: true,
      teamInfo: false,
      projectType: 'ART',
    },
    {
      name: 'Azuki',
      image: '',
      supply: '10000',
      mintDate: 'Tomorrow',
      whitelist: true,
      teamInfo: false,
      projectType: 'ART',
    },
  ];

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
        <div className='contained '>
          <div className='mx-auto mt-5 w-fit text-center text-xl text-gray-500'>
            Stay in the loop. Keep an eye on all of your favorite collections
          </div>

          <div className='mt-10 rounded bg-gray-100 px-5 py-5'>
            <div className='text-2xl font-semibold'>Launching Soon</div>

            <div className='flex gap-5 mt-5 overflow-auto'>
              {collections.map((item, index) => (
                <div key={index} className='flex flex-col items-center'>
                  <div className='p-8 flex-shrink-0 rounded-[50%] bg-gray-200'>
                    {/* <img
                className='h-full w-full rounded-[50%] object-cover'
                src={
                  limitedPartner.profileImage ??
                  'https://www.google.com/s2/favicons?sz=64&domain_url=https://nzvc.co.nz'
                }
                alt=''
              /> */}
                  </div>
                  <div>{item.mintDate}</div>
                </div>
              ))}
            </div>
          </div>

          <div className='mt-10 flex gap-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 cursor-pointer transition-all hover:scale-105'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                stroke-Width='2'
                d='M4 6h16M4 10h16M4 14h16M4 18h16'
              />
            </svg>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 cursor-pointer transition-all hover:scale-105'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
              />
            </svg>
          </div>
          <WatchListTable />
        </div>
      </div>
    </Layout>
  );
}

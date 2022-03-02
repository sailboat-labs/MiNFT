export default function WatchListTable() {
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
    <div id="launching_soon" className=''>
      <a href="#launching_soon">

      </a>
      <div className='mt-3 flex flex-col'>
        <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
            <div className='overflow-hidden shadow sm:rounded-lg'>
              <table className='min-w-full'>
                <thead className='bg-gray-50 '>
                  <tr>
                    <th
                      scope='col'
                      className='py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 '
                    >
                      Collection Name
                    </th>
                    <th
                      scope='col'
                      className='py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 '
                    >
                      Presale Mint Date & Time
                    </th>
                    <th
                      scope='col'
                      className='py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 '
                    >
                      Whitelist Available
                    </th>
                    <th
                      scope='col'
                      className='py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 '
                    >
                      Team Info
                    </th>
                    <th
                      scope='col'
                      className='py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 '
                    >
                      Project Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {collections.map((collection, index) => (
                    <tr key={index} className='border-b bg-white '>
                      <td className='flex items-center gap-5 whitespace-nowrap py-4 px-6 text-sm font-medium text-gray-900'>
                        <div className='h-10 w-10 flex-shrink-0 rounded-[50%] bg-gray-100'>
                          {/* <img
                          className='h-full w-full rounded-[50%] object-cover'
                          src={
                            limitedPartner.profileImage ??
                            'https://www.google.com/s2/favicons?sz=64&domain_url=https://nzvc.co.nz'
                          }
                          alt=''
                        /> */}
                        </div>
                        <div>
                          <div className="text-md">{collection.name}</div>
                          <div className="whitespace-nowrap text-sm text-gray-500 ">
                            <span>{collection.supply}</span>
                            <span>&nbsp;circulating supply</span>
                          </div>
                        </div>
                      </td>
                      <td className='whitespace-nowrap py-4 px-6 text-sm text-gray-500 '>
                        {collection.mintDate}
                      </td>
                      <td className='whitespace-nowrap py-4 px-6 text-sm uppercase text-gray-500'>
                        {collection.whitelist.toString()}
                      </td>
                      <td className='whitespace-nowrap py-4 px-6 text-sm uppercase text-gray-500'>
                        {collection.teamInfo.toString()}
                      </td>
                      <td className='whitespace-nowrap py-4 px-6 text-sm text-gray-500 '>
                        {collection.projectType}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Assets() {
  const assets: {
    name: string;
    image: string;
    collectionProfileImage: string;
  }[] = [
    { name: 'Cool Cats', image: '', collectionProfileImage: '' },
    { name: 'Azuki', image: '', collectionProfileImage: '' },
    { name: 'Bored Ape Yacht Club', image: '', collectionProfileImage: '' },
    { name: 'Crypto Punks', image: '', collectionProfileImage: '' },
    { name: 'Lions', image: '', collectionProfileImage: '' },
    { name: 'DAO Punks', image: '', collectionProfileImage: '' },
    { name: 'Womenrise', image: '', collectionProfileImage: '' },
  ];

  return (
    <div className='contained mt-10'>
      <div className='flex items-center justify-center gap-8 rounded bg-gray-100 px-5 py-2 md:w-fit md:justify-start'>
        <span className='flex cursor-pointer items-center gap-1'>
          Sort{' '}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 transition-all hover:scale-110'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </span>
        <span className='flex cursor-pointer items-center gap-1'>
          Period{' '}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 transition-all hover:scale-110'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </span>
        <span className='flex cursor-pointer items-center gap-1'>Trending</span>
        <span className='flex cursor-pointer items-center gap-1'>Discover</span>
      </div>

      <div className='mt-5 flex gap-5 overflow-auto'>
        {assets.map((item, index) => (
          <div key={index}>
            <div className='flex h-44 cursor-pointer flex-col justify-end rounded-lg bg-green-200'>
              <div className=' flex w-full items-center gap-5 rounded-b-lg border-2 border-t-0 bg-white px-3 py-3'>
                <div className='rounded-[50%] border-2 bg-gray-100 p-5'></div>
                <div className='whitespace-wrap'>{item.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='gradient-button mx-auto mt-5'>
        See More
      </div>
    </div>
  );
}

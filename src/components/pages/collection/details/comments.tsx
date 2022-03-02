export default function Comments() {
  const comments: {
    comment: string;
    owner: string;
    imageUrl?: string;
    upvotes: number;
  }[] = [
    {
      comment:
        'Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain.Cool Cat holders can participate in exclusive events such as NFTclaims, raffles, community giveaways, and more. Remember, all cats are cool, but some are cooler than others. Visit www.coolcatsnft.com to learn more.',
      owner: 'boateng.eth',
      upvotes: 5,
    },
    {
      comment:
        'Remember, all cats are cool, but some are cooler than others. Visit www.coolcatsnft.com to learn more.',
      owner: 'eshun.eth',
      upvotes: 8,
    },
    {
      comment:
        'Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain.Cool Cat holders can participate in exclusive events such as NFTclaims, raffles, community giveaways, and more. Remember, all cats are cool, but some are cooler than others. Visit www.coolcatsnft.com to learn more.',
      owner: 'francis.eth',
      upvotes: 0,
    },
  ];

  return (
    <div className='contained mt-10 rounded  py-5'>
      <div className='mt-0 text-2xl font-bold'>Comments</div>

      <div className='mt-10 flex flex-col gap-3'>
        {comments.map((item, index) => (
          <div
            key={index}
            className='flex gap-5 rounded-lg bg-gray-50 px-5 py-3'
          >
            <div className='h-10 w-10 rounded-[50%] border-2 border-red-200 bg-red-100'></div>
            <div className='flex flex-col gap-2'>
              <div className='flex gap-5'>
                <span>{item.owner}</span>
                {/* <span>Rating here</span> */}
              </div>
              <p className='max-w-3xl text-sm text-gray-500'>{item.comment}</p>
              <span
                className={`${
                  item.upvotes < 1 ? 'hidden' : 'block'
                } text-xs text-red-500`}
              >
                {item.upvotes} found this helpful
              </span>
              <div className='mt-2 flex items-center gap-5'>
                <div className='gradient-button flex items-center gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                    />
                  </svg>
                  <span className='text-xs'>Helpful</span>
                </div>
                <span className='text-sm'>Report</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-10'>
        <span className='mx-10 font-semibold'>Add New Comment</span>
        <div className='mt-2 flex gap-5 rounded-lg px-5 py-3'>
          <div className='h-10 w-10 rounded-[50%] border-2 border-red-200 bg-red-100'></div>
          <div className='flex w-full flex-col gap-2'>
            <div className='flex gap-5'>
              <span className='mx-5'>francis.eth</span>
            </div>

            <textarea
              className='w-full rounded-lg bg-gray-50 px-8 py-3'
              placeholder='Enter comment'
            />
            <div className='flex justify-end'>
              <div className='gradient-button flex items-center gap-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 13l4 4L19 7'
                  />
                </svg>
                <span className='text-xs'>Post</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

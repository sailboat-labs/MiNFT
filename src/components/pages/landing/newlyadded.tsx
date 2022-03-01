import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

export default function NewlyAdded() {
  const newlyAdded: {
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
    <div id='newly_added' className='contained mt-10'>
      <a href='#newly_added'>
        <strong className='text-xl'>Newly Added</strong>
      </a>

      <CarouselProvider
        className='mt-5 flex h-52 items-center gap-10'
        naturalSlideWidth={280}
        naturalSlideHeight={40}
        totalSlides={3}
        visibleSlides={1}
        isIntrinsicHeight={true}
        
      >
        <ButtonBack>
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
              d='M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z'
            />
          </svg>
        </ButtonBack>
        <div className='absolute z-[2] h-[180px] w-20 translate-x-10 rounded-l-lg bg-gradient-to-r from-white to-transparent'></div>

        <Slider>
          {newlyAdded.map((item, index) => (
            <Slide
              key={index}
              style={{ width: '180px', marginRight: '20px' }}
              index={index}
            >
              <div className='flex h-44 flex-col justify-end rounded-lg bg-green-200 cursor-pointer'>
                <div className=' flex w-full gap-5 rounded-b-lg border-2 border-t-0 bg-white px-3 py-3 items-center'>
                  <div className='rounded-[50%] border-2 bg-gray-100 p-5'></div>
                  <div className='whitespace-wrap'>{item.name}</div>
                </div>
              </div>
            </Slide>
          ))}
        </Slider>

        <ButtonNext>
          <div className='flex items-center'>
            <div className='right-0 z-[2] h-[180px] w-20 -translate-x-28 rounded-r-lg bg-gradient-to-r from-transparent to-white'></div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='absolute h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
        </ButtonNext>
      </CarouselProvider>
    </div>
  );
}

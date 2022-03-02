import Link from 'next/link';

export default function Footer() {
  const links: { label: string; route: string }[] = [
    { label: 'FAQ', route: '/' },
    { label: 'Contact', route: '/' },
    { label: 'Privacy', route: '/' },
    { label: 'Terms', route: '/' },
  ];

  const year = new Date().getUTCFullYear();

  return (
    <div className='mt-20 bg-primaryblue bg-opacity-20'>
      <div className='contained flex flex-col md:flex-row gap-5 text-center md:text-left items-center justify-between py-10'>
        <div className='flex select-none flex-col gap-2'>
          <Link passHref href='/'>
            <span className=' text-2xl font-black leading-none text-gray-900'>
              MiNFT<span className='text-indigo-600'>.</span>
            </span>
          </Link>
          <span className='text-primaryblue'>
            {' '}
            The best way to discover, track, and analyze NFTs.
          </span>
        </div>
        <div className='flex flex-col items-center md:items-end gap-5'>
          <div className='flex gap-3'>
            {links.map((link, index) => (
              <Link passHref href={link.route} key={index}>
                <span className='cursor-pointer text-primaryblue transition-all hover:scale-105'>
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
          <div className='flex gap-2'>
            <input
              placeholder='Your email address'
              className='border-b border-primaryblue bg-transparent px-3 py-1 text-center placeholder:text-primaryblue'
            />
            <div className='rounded bg-primaryblue px-5 py-2 text-xs capitalize'>
              Stay in the loop
            </div>
          </div>
          <div className='text-primaryblue'>
            © {year} MiNFT. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

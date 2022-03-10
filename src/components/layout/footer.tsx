import Link from "next/link";

type props = {
  className?: string;
};

export default function Footer({ className }: props) {
  const links: { label: string; route: string }[] = [
    { label: "FAQ", route: "/" },
    { label: "Contact", route: "/" },
    { label: "Privacy", route: "/" },
    { label: "Terms", route: "/" },
  ];

  const year = new Date().getUTCFullYear();

  return (
    <div
      className={`mt-20 border-t-2 bg-gray-50 dark:border-gray-500 dark:bg-[#121212] ${className}`}
    >
      <div className="contained flex flex-col items-center justify-between gap-5 py-10 text-center md:flex-row md:text-left">
        <div className="flex select-none flex-col gap-2">
          <Link passHref href="/">
            <span className=" text-2xl font-black leading-none text-gray-900 dark:text-gray-200">
              MiNFT<span className="text-indigo-600">.</span>
            </span>
          </Link>
          <span className="text-primaryblue">
            {" "}
            The best way to discover, track, and analyze NFTs.
          </span>
        </div>
        <div className="flex flex-col items-center gap-5 dark:border-gray-500 md:items-end lg:border-l-2 lg:pl-20">
          <div className="flex gap-3">
            {links.map((link, index) => (
              <Link passHref href={link.route} key={index}>
                <span className="cursor-pointer text-primaryblue transition-all hover:scale-105">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              placeholder="Your email address"
              className="border-b border-primaryblue bg-transparent px-3 py-1 text-center placeholder:text-primaryblue"
            />
            <div className="rounded bg-primaryblue px-5 py-2 text-xs capitalize">
              Stay in the loop
            </div>
          </div>
          <div className="text-primaryblue">
            © {year} MiNFT. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

/* eslint-disable @next/next/no-html-link-for-pages */
type props = {
  className?: string;
};

export default function Footer({ className }: props) {
  const links: { label: string; route: string }[] = [
    { label: "FAQ", route: "/#faq" },
    // { label: "Contact", route: "/" },
    // { label: "Privacy", route: "/" },
    // { label: "Terms", route: "/" },
  ];

  const year = new Date().getUTCFullYear();

  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2">
          <div className="border-b border-gray-800 py-16 lg:order-last lg:border-b-0 lg:border-l lg:py-10 lg:pl-12">
            <div className="mt-12 space-y-4 lg:mt-0">
              <span className="rounded bg-teal-500 lg:block lg:h-1 lg:w-10"></span>

              <div className="text-center lg:text-left">
                <h5 className="text-2xl font-medium text-white">
                  Request a Demo
                </h5>

                {/* <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-gray-400 lg:mx-0">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Veritatis, harum deserunt nesciunt praesentium, repellendus
                  eum perspiciatis ratione pariatur a aperiam eius numquam
                  doloribus asperiores sunt.
                </p> */}
              </div>

              <form className="mt-6">
                <div className="relative mx-auto max-w-lg lg:mx-0">
                  <label className="sr-only" htmlFor="email">
                    {" "}
                    Email{" "}
                  </label>

                  <input
                    className="w-full rounded-md border-none bg-gray-800 py-4 pl-3 pr-16 text-sm text-white"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />

                  <button
                    className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded bg-indigo-600 p-3 text-white transition hover:bg-indigo-700"
                    type="button"
                  >
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="pt-16 pb-8 lg:pt-10 lg:pr-12">
            <div className=" font-dmsans text-4xl font-extrabold text-[#675C4C]">
              MINFT
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:mt-12">
              <div className="text-center lg:text-left">
                <p className="text-lg font-medium text-white">About Us</p>

                <nav className="mt-4">
                  <ul className="space-y-1.5 text-sm">
                    <li>
                      <a
                        className="text-white transition hover:text-white/75"
                        href="/"
                      >
                        Company History
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-white transition hover:text-white/75"
                        href="/"
                      >
                        Meet the Team
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-white transition hover:text-white/75"
                        href="/"
                      >
                        Employee Handbook
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-white transition hover:text-white/75"
                        href="/"
                      >
                        Careers
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="text-center lg:text-left">
                <p className="text-lg font-medium text-white">Our Services</p>

                <nav className="mt-4">
                  <ul className="space-y-1.5 text-sm">
                    <li>
                      <a
                        className="text-white transition hover:text-white/75"
                        href="/"
                      >
                        Trait Mixing
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-white transition hover:text-white/75"
                        href="/"
                      >
                        Contract Development
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-white transition hover:text-white/75"
                        href="/"
                      >
                        Whitelisting
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-white transition hover:text-white/75"
                        href="/"
                      >
                        Premint
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="text-center lg:text-left">
                <p className="text-lg font-medium text-white">Helpful Links</p>

                <nav className="mt-4">
                  <ul className="space-y-1.5 text-sm">
                    <li>
                      <a
                        className="text-white transition hover:text-white/75"
                        href="/"
                      >
                        FAQs
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-white transition hover:text-white/75"
                        href="/"
                      >
                        Support
                      </a>
                    </li>

                    <li>
                      <a
                        className="group flex justify-center gap-1.5 lg:justify-start"
                        href="/"
                      >
                        <span className="text-white transition group-hover:text-white/75">
                          Live Chat
                        </span>

                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500"></span>
                        </span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            <div className="mt-16 border-t border-gray-800 pt-8 text-sm text-white lg:mt-24">
              <p className="text-center lg:text-left">
                <a
                  className="inline-block text-white underline transition hover:text-white/75"
                  href="/"
                >
                  Privacy Policy
                </a>

                <span>&middot;</span>

                <a
                  className="inline-block text-white underline transition hover:text-white/75"
                  href="/"
                >
                  Terms & Conditions
                </a>

                <span>&middot;</span>

                <a
                  className="inline-block text-white underline transition hover:text-white/75"
                  href="/"
                >
                  Cookies
                </a>
              </p>

              <p className="mt-4 text-center lg:text-left">
                &copy; 2022 MiNFT. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

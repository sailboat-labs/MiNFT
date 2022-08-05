import { useEffect, useState } from "react";

type props = {
  className?: string;
};

export default function DarkModeMenu({ className }: props) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    window.localStorage.setItem("minft-theme", theme);
    setTheme(window.localStorage.getItem("minft-theme") || "light");

    // if (window.localStorage.getItem("minft-theme") === "system") {
    //   //do something
    // }

    if (window.localStorage.getItem("minft-theme") === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleTheme = (theme: "dark" | "light" | "system") => {
    setTheme(theme);
    window.localStorage.setItem("minft-theme", theme);
  };

  return (
    <div
      className={`${className} flex items-center justify-center stroke-black px-0 text-sm font-medium dark:stroke-white`}
    >
      {theme === "light" ? (
        <div>
          <svg
            onClick={() => {
              handleTheme("dark");
            }}
            xmlns="http://www.w3.org/2000/svg"
            className="translate h-6 w-6 translate-y-[0.35rem] cursor-pointer transition-all hover:scale-125 hover:fill-black md:translate-y-0"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </div>
      ) : (
        <svg
          onClick={() => {
            handleTheme("light");
          }}
          xmlns="http://www.w3.org/2000/svg"
          className="translate h-6 translate-y-[0.35rem] transform cursor-pointer transition-all hover:rotate-180 hover:scale-125 md:translate-y-0"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )}
    </div>
  );
  // <div className={className}>
  //   <Menu as="div" className="relative inline-block text-left">
  //     <Menu.Button className="flex justify-center items-center w-full px-4 text-sm font-medium ">
  //       {theme === "light" ? (
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           className="h-6 cursor-pointer translate translate-y-[0.35rem] md:translate-y-0 transform transition-all hover:rotate-180 hover:scale-125"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke="currentColor"
  //         >
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth="2"
  //             d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
  //           />
  //         </svg>
  //       ) : (
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           className="h-6 w-6 cursor-pointer translate translate-y-[0.35rem] md:translate-y-0 transition-all hover:scale-125 hover:fill-black"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke="currentColor"
  //         >
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth="2"
  //             d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
  //           />
  //         </svg>
  //       )}
  //     </Menu.Button>
  //     <Transition
  //       as={Fragment}
  //       enter="transition ease-out duration-100"
  //       enterFrom="transform opacity-0 scale-95"
  //       enterTo="transform opacity-100 scale-100"
  //       leave="transition ease-in duration-75"
  //       leaveFrom="transform opacity-100 scale-100"
  //       leaveTo="transform opacity-0 scale-95"
  //     >
  //       <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right dark:text-white dark:text-gray-200  dark:bg-[#202124] divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
  //         <div className="px-1 py-1 ">
  //           <Menu.Item>
  //             {({ active }) => (
  //               <button
  //                 onClick={() => {
  //                   handleTheme("dark");
  //                 }}
  //                 className={`${
  //                   active
  //                     ? "bg-[#2D8DA7] text-white dark:text-gray-200"
  //                     : "text-gray-900 dark:text-white dark:text-gray-200"
  //                 } group flex rounded-md items-center w-full px-2 py-2 text-sm transition`}
  //               >
  //                 {active ? (
  //                   <svg
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     className="h-6 w-6 cursor-pointer translate transition-all hover:scale-125 hover:fill-black  mr-3"
  //                     fill="none"
  //                     viewBox="0 0 24 24"
  //                     stroke="currentColor"
  //                   >
  //                     <path
  //                       strokeLinecap="round"
  //                       strokeLinejoin="round"
  //                       strokeWidth="2"
  //                       d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
  //                     />
  //                   </svg>
  //                 ) : (
  //                   <svg
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     className="h-6 w-6 cursor-pointer translate transition-all hover:scale-125 hover:fill-black  mr-3"
  //                     fill="none"
  //                     viewBox="0 0 24 24"
  //                     stroke="currentColor"
  //                   >
  //                     <path
  //                       strokeLinecap="round"
  //                       strokeLinejoin="round"
  //                       strokeWidth="2"
  //                       d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
  //                     />
  //                   </svg>
  //                 )}
  //                 Dark
  //               </button>
  //             )}
  //           </Menu.Item>
  //           <Menu.Item>
  //             {({ active }) => (
  //               <button
  //                 onClick={() => {
  //                   handleTheme("light");
  //                 }}
  //                 className={`${
  //                   active
  //                     ? "bg-[#2D8DA7] text-white dark:text-gray-200"
  //                     : "text-gray-900 dark:text-white dark:text-gray-200"
  //                 } group flex rounded-md items-center w-full px-2 py-2 text-sm transition`}
  //               >
  //                 {active ? (
  //                   <svg
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     className="h-6 w-6 cursor-pointer translate transform transition-all hover:rotate-180 hover:scale-125  mr-3 "
  //                     fill="none"
  //                     viewBox="0 0 24 24"
  //                     stroke="currentColor"
  //                   >
  //                     <path
  //                       strokeLinecap="round"
  //                       strokeLinejoin="round"
  //                       strokeWidth="2"
  //                       d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
  //                     />
  //                   </svg>
  //                 ) : (
  //                   <svg
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     className="h-6 w-6 cursor-pointer translate transform transition-all hover:rotate-180 hover:scale-125 mr-3"
  //                     fill="none"
  //                     viewBox="0 0 24 24"
  //                     stroke="currentColor"
  //                   >
  //                     <path
  //                       strokeLinecap="round"
  //                       strokeLinejoin="round"
  //                       strokeWidth="2"
  //                       d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
  //                     />
  //                   </svg>
  //                 )}
  //                 Light
  //               </button>
  //             )}
  //           </Menu.Item>
  //         </div>
  //         {/* <div className="px-1 py-1">
  //           <Menu.Item>
  //             {({ active }) => (
  //               <button
  //               onClick={()=>{handleTheme('system')}}

  //                 className={`${
  //                   active ? "bg-[#2D8DA7] text-white dark:text-gray-200" : "text-gray-900"
  //                 } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
  //               >
  //                 {active ? (
  //                   <svg
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     className="h-6 w-6  mr-3"
  //                     fill="none"
  //                     viewBox="0 0 24 24"
  //                     stroke="currentColor"
  //                   >
  //                     <path
  //                       strokeLinecap="round"
  //                       strokeLinejoin="round"
  //                       strokeWidth="2"
  //                       d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
  //                     />
  //                   </svg>
  //                 ) : (
  //                   <svg
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     className="h-6 w-6  mr-3"
  //                     fill="none"
  //                     viewBox="0 0 24 24"
  //                     stroke="currentColor"
  //                   >
  //                     <path
  //                       strokeLinecap="round"
  //                       strokeLinejoin="round"
  //                       strokeWidth="2"
  //                       d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
  //                     />
  //                   </svg>
  //                 )}
  //                 System
  //               </button>
  //             )}
  //           </Menu.Item>
  //         </div> */}
  //       </Menu.Items>
  //     </Transition>
  //   </Menu>
  // </div>
  // );
}

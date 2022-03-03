import { Dispatch, SetStateAction, useState } from 'react';

type props = {
  onItemSelected: Dispatch<SetStateAction<string | undefined>>;
  options: string[];
  className?: string;
};

export default function Dropdown({
  onItemSelected,
  options,
  className,
}: props) {
  const [onParentClick, setOnParentClick] = useState<{
    show: boolean;
    selected: string;
  }>({ show: false, selected: 'Select One' });
  return (
    <>
      <button
        id='dropdownButton'
        onClick={() => {
          setOnParentClick({
            show: !onParentClick.show,
            selected: onParentClick.selected,
          });
        }}
        data-dropdown-toggle='dropdown'
        className={`capitalize inline-flex items-center rounded-lg bg-gray-200 px-4 py-2.5 text-center text-sm font-medium focus:ring-4 focus:ring-blue-300 ${className}`}
        type='button'
      >
        {onParentClick.selected}
        <svg
          className='ml-2 h-4 w-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19 9l-7 7-7-7'
          ></path>
        </svg>
      </button>

      <div
        id='dropdown'
        className={`absolute items-center z-10 mt-3 w-48 list-none divide-y divide-gray-100 rounded bg-white text-base shadow transition-all  ${
          onParentClick.show
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
        }`}
      >
        <ul className='py-1' aria-labelledby='dropdownButton'>
          {options.map((option, index) => (
            <li
              onClick={() => {
                onItemSelected(option);
                setOnParentClick({ show: false, selected: option });
              }}
              key={index}
            >
              <div className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 capitalize'>
                {option}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

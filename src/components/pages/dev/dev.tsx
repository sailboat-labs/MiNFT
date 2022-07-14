export default function DevPage() {
  const contractMakerAddresses: { name: string; address: string }[] = [
    {
      name: "Minft Registry",
      address: "0x65cF0585bD7B236b635DA7077624431DD9cec35e",
    },
    {
      name: "Minft Factory",
      address: "0x65cF0585bD7B236b635DA7077624431DD9cec35e",
    },
    {
      name: "Classic Mint",
      address: "0x65cF0585bD7B236b635DA7077624431DD9cec35e",
    },
    {
      name: "Classic Mint with whitelist",
      address: "0x65cF0585bD7B236b635DA7077624431DD9cec35e",
    },
    {
      name: "Dutch Auction",
      address: "0x65cF0585bD7B236b635DA7077624431DD9cec35e",
    },
    {
      name: "Dutch Auction with whitelist",
      address: "0x65cF0585bD7B236b635DA7077624431DD9cec35e",
    },
    {
      name: "Fair Dutch Auction",
      address: "0x65cF0585bD7B236b635DA7077624431DD9cec35e",
    },
    {
      name: "Fair Dutch Auction with whitelist",
      address: "0x65cF0585bD7B236b635DA7077624431DD9cec35e",
    },
    {
      name: "Pure whitelist",
      address: "0x65cF0585bD7B236b635DA7077624431DD9cec35e",
    },
  ];

  return (
    <div className="p-10">
      <div className="flex flex-col">
        <div className="text-2xl">Development Eyes</div>
        <div className="text-base text-gray-500">
          Development logs and variables
        </div>
      </div>

      <div>
        <div className="mt-10 mb-5 text-xl ">Contract Maker Addresses</div>
        <div className="relative w-fit overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-fit text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Address
                </th>
              </tr>
            </thead>
            <tbody>
              {contractMakerAddresses.map((item, index) => (
                <tr
                  key={index}
                  className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td className="py-4 px-6">{item.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

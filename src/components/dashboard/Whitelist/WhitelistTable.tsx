export default function WhitelistTable() {
  const users: { address: string; twitter: string; discord: string }[] = [
    {
      address: "0x65cF0585bD7B236b635DA7077624431DD9cec35e",
      twitter: "brainywayne",
      discord: "thebrainywayne",
    },
  ];

  return (
    <div className="relative overflow-auto  border sm:rounded-lg ">
      <table className="w-fit text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Wallet Address
            </th>
            <th scope="col" className="px-6 py-3">
              Twitter Account
            </th>
            <th scope="col" className="px-6 py-3">
              Discord Account
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {[...Array(15)].map((item, index) => (
            <tr
              key={index}
              className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white dark:text-gray-200"
              >
                {index + 1}. 0x65cF0585bD7B236b635DA7077624431DD9cec35e
              </th>
              <td className="px-6 py-4">@brainywayne</td>
              <td className="px-6 py-4">@thebrainywayne</td>
              <td className="px-6 py-4 text-right">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

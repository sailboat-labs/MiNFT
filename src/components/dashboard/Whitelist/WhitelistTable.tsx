/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";

import { functions } from "@/lib/firebase";

interface UserData {
  wallet: string;
  twitterUsername: string;
  discord: string;
}
export default function WhitelistTable() {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const getWhitelists = httpsCallable(functions, "getWhitelists");

    const { data }: any = await getWhitelists({
      project_slug: "indians-nft",
    });

    console.log({ data});

    if (data.success) {
      setUsers(data.data);
    }
  };

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
          {[...users].map((item, index) => (
            <tr
              key={index}
              className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white dark:text-gray-200"
              >
                {index + 1}. {item.wallet}
              </th>
              <td className="px-6 py-4">{item.twitterUsername}</td>
              <td className="px-6 py-4"></td>
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

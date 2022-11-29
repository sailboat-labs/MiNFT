/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// import useSWR from "swr";
import { firestore } from "@/lib/firebase";

interface UserData {
  wallet: string;
  twitterUsername: string;
  discord: string;
  channel: "main" | "premint" | "manual";
}

type props = {
  channel: "main" | "premint" | "manual";
};
export default function WhitelistTable({ channel }: props) {
  const [users, setUsers] = useState<UserData[]>([]);
  // const { data, error } = useSWR("/api/user", fetcher);

  const router = useRouter();

  useEffect(() => {
    if (!router.query.project) return;
    const _collection = collection(
      firestore,
      `Projects/${router.query.project as string}/Whitelist`
    );

    const unsubscribe = onSnapshot(_collection, (snapshot) => {
      const _users = snapshot.docs.map((doc) => doc.data() as UserData);
      setUsers(_users);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {!users.length && <p>No Whitelist</p>}
      {users.length && (
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

                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((item) => {
                  if (channel == "main") {
                    return item;
                  } else {
                    return item.channel == channel;
                  }
                })
                .map((item, index) => (
                  <tr
                    key={index}
                    className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <th
                      scope="row"
                      className="flex items-center whitespace-nowrap px-6 py-4 font-medium text-gray-900  dark:text-gray-200"
                    >
                      {index + 1}.{" "}
                      <div
                        className={`mx-3 h-3 w-3 rounded-full ${
                          item.channel == "manual"
                            ? "bg-orange-500"
                            : "bg-indigo-500"
                        }`}
                      ></div>
                      {item.wallet}
                    </th>
                    <td className="px-6 py-4">{item.twitterUsername}</td>
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
      )}
    </>
  );
}

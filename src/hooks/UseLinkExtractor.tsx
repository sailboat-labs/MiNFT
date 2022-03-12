/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useEffect, useState } from "react";

export default function useLinkExtractor() {
  const [links, setLinks] = useState<any[]>([]);
  const [text, setText] = useState("");

  async function generateLinkPreviewData() {
  try {
      const { data } = await axios.get("/api/linkpreview", {
        params: { text },
      });

      setLinks(data.data);
  } catch (error) {
    // console.log(error);
    
  }
  }

  useEffect(() => {
    generateLinkPreviewData();
  }, [text]);

  function LinkItems() {
    return (
      <div className="mt-5 grid w-fit grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {links &&
          links.map((link, index) => (
            <div
              onClick={() => {
                window.open(link.url, "_blank");
              }}
              className="flex w-fit cursor-pointer gap-3 rounded-lg border-2  transition-all hover:bg-gray-50 dark:border-gray-500 dark:hover:bg-gray-700"
              key={index}
            >
              <img
                className="h-14 w-14 rounded-l-lg border-r-2 object-cover dark:border-gray-500"
                alt=""
                src={
                  link.images.length == 0 ? link.favicons[0] : link.images[0]
                }
              />
              <div className="flex flex-col justify-center pr-3 dark:border-gray-500">
                <span className="text-sm">{link.siteName}</span>
                <span className="text-xs text-gray-400">
                  {link.description}
                </span>
                <span className="w-flex text-ellipsis text-xs text-gray-400">
                  {link.url.length > 30
                    ? link.url.toString().substring(0, 30)
                    : link.url}
                </span>
              </div>
            </div>
          ))}
      </div>
    );
  }

  return {
    links,
    setText,
    LinkItems,
  };
}

/* eslint-disable no-console */

import axios from "axios";
import { getLinkPreview } from "link-preview-js";
import { NextApiRequest, NextApiResponse } from "next";

import { extractUrls } from "@/utils/ExtractUrls";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method != "GET") return;
    const { text } = req.query;

    if(!text) return res.status(500).json({ success: false, error:"No text provided" });
    const links: ({ url: string; mediaType: string; contentType: string; favicons: string[]; } | { url: string; title: string; siteName: string | undefined; description: string | undefined; mediaType: string; contentType: string | undefined; images: string[]; videos: { url: string | undefined; secureUrl: string | null | undefined; type: string | null | undefined; width: string | undefined; height: string | undefined; }[]; favicons: string[]; })[] = [];

    const matches = extractUrls(text as string);
    console.log(matches);

    if (!matches) return res.status(200).json({ success: true, data: [] });

    for (let i = 0; i < matches.length; i++) {
      await getLinkPreview(matches[i]).then((data) => {
        links.push(data);
      });
    }

    console.log(links);

    return res.status(200).json({ success: true, data: links });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error });
  }
};

export default handler;

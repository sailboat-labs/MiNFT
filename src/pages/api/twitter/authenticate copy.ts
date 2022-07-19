/* eslint-disable no-console */
import { collection, getFirestore } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { TwitterApi } from "twitter-api-v2";

import { firebaseApp } from "@/lib/firebase";

import admin from "./config/admin";

const credentials = {
  clientId: process.env.TWITTER_CLIENT_ID as string,
  clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
};

const client = new TwitterApi({
  clientId: credentials.clientId,
  clientSecret: credentials.clientSecret,
});

const firestore = getFirestore(firebaseApp);
const usersCollections = collection(firestore, "users");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { url, codeVerifier, state } = client.generateOAuth2AuthLink(
      process.env.TWITTER_CALLBACK_URL as string,
      {
        scope: ["tweet.read", "follows.read"],
      }
    );
    await admin.firestore().doc(`Codes/${state}`).set({ codeVerifier, state });

    return res.redirect(url);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error });
  }
};

export default handler;

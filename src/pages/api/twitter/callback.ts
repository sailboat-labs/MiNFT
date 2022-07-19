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
      const { code, state } = req.query;

      // Check if a verifier is associated with given state
      const codeVerifier = (
        await admin.firestore().doc(`Codes/${state}`).get()
      ).data()?.codeVerifier;

      if (!codeVerifier || !code) {
        res.redirect(`${process.env.APP_URL}/twitter-accounts?success=false`);
        // res.status(400).send('You denied the app or your session expired!');
      }

      try {
        // Get tokens
        const { accessToken, refreshToken, expiresIn }: any =
          await client.loginWithOAuth2({
            code: code as string,
            codeVerifier,
            redirectUri: process.env.TWITTER_CALLBACK_URL as string,
          });

        const userClient = new TwitterApi(accessToken);

        // Get user ID
        const user = await userClient.v2.me();

        // Store credentials
        await admin
          .firestore()
          .doc(`TwitterAccounts/${user.data.username}`)
          .set(
            {
              accessToken,
              refreshToken,
              expiresIn,
              active: true,
              name: user.data.name,
              userName: user.data.username,
              twitterId: user.data.id,
              lastUpdated: new Date().toISOString(),
              lastActivity: "Login",
              lastActivityId: "",
              follows: [],
              lastActivityAt: new Date().toISOString(),
              tokenUpdated: new Date().toISOString(),
            },
            { merge: true }
          );

        await admin.firestore().doc(`Codes/${state}`).delete();

        res.redirect(`${process.env.APP_URL}/twitter-accounts?success=true`);
      } catch (e) {
        // res.status(403).send('Invalid verifier or access tokens!');
        res.redirect(`${process.env.APP_URL}/twitter-accounts?success=false`);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error });
    }
};

export default handler;

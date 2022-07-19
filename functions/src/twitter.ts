import { UserV2 } from "./../node_modules/twitter-api-v2/dist/types/v2/user.v2.types.d";
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as functions from "firebase-functions";
import { TwitterApi } from "twitter-api-v2";

import admin from "./config/admin";

const credentials = {
  clientId: process.env.TWITTER_CLIENT_ID as string,
  clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
};

const client = new TwitterApi({
  clientId: credentials.clientId,
  clientSecret: credentials.clientSecret,
});

const publicClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN as string);

// Tell typescript it's a readonly app
const roClient = publicClient.readOnly;

const checkFollows = functions.https.onCall(async (data) => {
  try {
    const { user_account, project_account } = data;
    const user = await roClient.v2.userByUsername(user_account);
    const project = await roClient.v2.userByUsername(project_account);
    if (user && project) {
      const following = await roClient.v2.followers(project.data.id);
      const ids = following.data.reduce((acc: string[], curr: UserV2) => {
        acc.push(curr.id);
        if (curr.id == user.data.id) console.log({ exists: true });
        return acc;
      }, []);
      console.log({ following: ids });
      console.log({ user: user.data });
      const isFollowing = ids.includes(user.data.id);

      return { success: true, isFollowing };
    } else {
      return {
        success: true,
        isFollowing: false,
        message: "Unable to get id ",
      };
    }
  } catch (error) {
    functions.logger.log(error);
    return { success: false, error, message: "Something bad happened" };
  }
});

export const follows = async (
  user_name: string,
  account_name: string
): Promise<any> => {
  try {
    const user = await roClient.v2.userByUsername(user_name);
    const account = await roClient.v2.userByUsername(account_name);
    if (user && account) {
      const following = await roClient.v2.following(user.data.id);
      const isFollowing = following.data.includes(user.data);

      return { success: true, isFollowing };
    } else {
      return {
        success: true,
        isFollowing: false,
        message: "Unable to get id ",
      };
    }
  } catch (error) {
    functions.logger.log(error);
    return { success: false, error, message: "Something bad happened" };
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const requestTwitterUrl = functions.https.onCall(async (data) => {
  try {
    // Don't forget to specify 'offline.access' in scope list, you want to refresh your token later
    const { url, codeVerifier, state } = client.generateOAuth2AuthLink(
      process.env.TWITTER_CALLBACK_URL as string,
      {
        scope: ["tweet.read", "users.read", "follows.read"],
      }
    );

    await admin.firestore().doc(`Codes/${state}`).set({ codeVerifier, state });

    return { success: true, authUrl: url };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
});

const twitterCallBack = functions.https.onRequest(
  async (req: functions.Request, res: functions.Response) => {
    try {
      const { code, state } = req.query;

      // Check if a verifier is associated with given state
      const codeVerifier = (
        await admin.firestore().doc(`Codes/${state}`).get()
      ).data()?.codeVerifier;

      if (!codeVerifier || !code) {
        res.redirect(`${process.env.APP_URL}/indiansnft?success=false`);
        // res.status(400).send('You denied the app or your session expired!');
      }

      // Get tokens
      const { accessToken, refreshToken, expiresIn }: any =
        await client.loginWithOAuth2({
          code: code as string,
          codeVerifier,
          redirectUri: process.env.TWITTER_CALLBACK_URL as string,
        });

      console.log({ accessToken, refreshToken, expiresIn });

      const userClient = new TwitterApi(accessToken);

      console.log({ userClient });

      // Get user ID
      const user = await userClient.v2.me();

      console.log({ user });

      // Store credentials
      await admin.firestore().doc(`TwitterAccounts/${user.data.username}`).set(
        {
          accessToken,
          refreshToken,
          expiresIn,
          active: true,
          name: user.data.name,
          userName: user.data.username,
          twitterId: user.data.id,
          lastUpdated: new Date().toISOString(),
          lastActivityAt: new Date().toISOString(),
          tokenUpdated: new Date().toISOString(),
        },
        { merge: true }
      );

      await admin.firestore().doc(`Codes/${state}`).delete();

      res.redirect(
        `${process.env.APP_URL}/indiansnft?success=true&twitterAccount=${user.data.username}&accessToken=${accessToken}`
      );
    } catch (error) {
      // functions.logger.log(error);
      console.log({ error });
      res.redirect(`${process.env.APP_URL}/indiansnft?success=false`);
    }
  }
);

export { requestTwitterUrl, twitterCallBack, checkFollows };
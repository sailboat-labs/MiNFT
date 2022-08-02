import { UserV2 } from "./../node_modules/twitter-api-v2/dist/types/v2/user.v2.types.d";
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as functions from "firebase-functions";
import { TwitterApi } from "twitter-api-v2";

import admin from "./config/admin";
import { v4 } from "uuid";

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
        if (curr.id == user.data.id) functions.logger.log({ exists: true });
        return acc;
      }, []);
      functions.logger.log({ following: ids });
      functions.logger.log({ user: user.data });
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
    functions.logger.log({ error });
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
  const id = v4();
  console.log(id)
  try {
    // Don't forget to specify 'offline.access' in scope list, you want to refresh your token later
    const { url, codeVerifier, state } = client.generateOAuth2AuthLink(
      process.env.TWITTER_CALLBACK_URL as string,
      {
        scope: ["tweet.read", "users.read", "follows.read"],
        state: `${data.projectSlug}:${id}`,
      }
    );

    await admin.firestore().doc(`Codes/${state}`).set({ codeVerifier, state });

    return { success: true, authUrl: url };
  } catch (error) {
    functions.logger.log({ error });
    return { success: false, error };
  }
});

const twitterCallBack = functions.https.onRequest(
  async (req: functions.Request, res: functions.Response) => {
    const { code, state } = req.query;
    const project = (state as string).split(":")[0];

    try {
      // Check if a verifier is associated with given state
      const codeVerifier = (
        await admin.firestore().doc(`Codes/${state}`).get()
      ).data()?.codeVerifier;

      if (!codeVerifier || !code) {
        res.redirect(
          `${process.env.APP_URL}/launch/${project}/?success=false`
        );
      }

      // Get tokens
      const { accessToken }: any = await client.loginWithOAuth2({
        code: code as string,
        codeVerifier,
        redirectUri: process.env.TWITTER_CALLBACK_URL as string,
      });

      const userClient = new TwitterApi(accessToken);

      // Get user ID
      const user = await userClient.v2.me();

      await admin.firestore().doc(`Codes/${state}`).delete();

      res.redirect(
        `${process.env.APP_URL}/launch/${project}?success=true&twitterAccount=${user.data.username}&accessToken=${accessToken}`
      );
    } catch (error) {
      console.log(error)
      // functions.logger.log({ error });
      res.redirect(
        `${process.env.APP_URL}/launch/${project}?success=false`
      );
    }
  }
);

export { requestTwitterUrl, twitterCallBack, checkFollows };

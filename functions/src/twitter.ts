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

const getUserId = async (user_name: string): Promise<any> => {
  try {
    const user = await roClient.v2.userByUsername(user_name);
    if (user) {
      const user_id = user.data.id;
      const name = user.data.name;
      return { success: true, id: user_id, name };
    } else {
      return { success: true, message: "Unable to get id " };
    }
  } catch (error) {
    functions.logger.log(error);
    return { success: false, error, message: "Something bad happened" };
  }
};

const checkFollows = functions.https.onRequest(
  async (req: functions.Request, res: functions.Response) => {
    try {
      const { user_name, account_name } = req.params;
      const user = await roClient.v2.userByUsername(user_name);
      const account = await roClient.v2.userByUsername(account_name);
      if (user && account) {
        const following = await roClient.v2.following(user.data.id);
        const isFollowing = following.data.includes(user.data);

        res.json({ success: true, isFollowing });
      } else {
        res.json({
          success: true,
          isFollowing: false,
          message: "Unable to get id ",
        });
      }
    } catch (error) {
      functions.logger.log(error);
      res.json({ success: false, error, message: "Something bad happened" });
    }
  }
);

const follows = async (user_name: string, account_name: string) => {
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

const followUser = async (
  user_id: string,
  target_user_id: string
): Promise<any> => {
  try {
    const accessToken = await refreshTokens(user_id);

    const userClient = new TwitterApi(accessToken);

    const follow = await userClient.v2.follow(user_id, target_user_id);

    if (follow.data.following) {
      return { success: true, data: follow.data };
    } else {
      return {
        success: false,
        message: "Something went wrong",
        error: follow.errors,
      };
    }
  } catch (error) {
    console.log(error);
    // functions.logger.error(error);
    return {
      success: false,
      error,
      message: "Something bad happened, Check function logs",
    };
  }
};

const tweet = async (user_id: string, tweet: string): Promise<any> => {
  try {
    const accessToken = await refreshTokens(user_id);

    const userClient = new TwitterApi(accessToken);

    const result = await userClient.v2.tweet({ text: tweet });

    if (result.data) {
      return { success: true, id: result.data.id };
    } else {
      return {
        success: false,
        message: "Something went wrong",
        error: result.errors,
      };
    }
  } catch (error) {
    functions.logger.error(error);
    return {
      success: false,
      error,
      message: "Something bad happened, Check function logs",
    };
  }
};

const like = async (user_id: string, tweetId: string): Promise<any> => {
  try {
    const accessToken = await refreshTokens(user_id);

    const userClient = new TwitterApi(accessToken);

    const result = await userClient.v2.like(user_id, tweetId);

    if (result.data) {
      return { success: true, liked: result.data.liked };
    } else {
      return {
        success: false,
        message: "Something went wrong",
        error: result.errors,
      };
    }
  } catch (error) {
    functions.logger.error(error);
    return {
      success: false,
      error,
      message: "Something bad happened, Check function logs",
    };
  }
};

const retweet = async (user_id: string, tweetId: string): Promise<any> => {
  try {
    const accessToken = await refreshTokens(user_id);

    const userClient = new TwitterApi(accessToken);

    const result = await userClient.v2.retweet(user_id, tweetId);

    if (result.data) {
      return { success: true, liked: result.data.retweeted };
    } else {
      return {
        success: false,
        message: "Something went wrong",
        error: result.errors,
      };
    }
  } catch (error) {
    functions.logger.error(error);
    return {
      success: false,
      error,
      message: "Something bad happened, Check function logs",
    };
  }
};

const refreshTokens = async (user_id: string) => {
  try {
    const user = (
      await admin
        .firestore()
        .collection(`TwitterAccounts`)
        .where("twitterId", "==", user_id)
        .get()
    ).docs[0].data();

    try {
      const data = await client.refreshOAuth2Token(user?.refreshToken);

      await admin.firestore().doc(`TwitterAccounts/${user?.userName}`).update({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn,
        tokenUpdated: new Date().toISOString(),
      });
      return data.accessToken;
    } catch (error) {
      await admin.firestore().doc(`TwitterAccounts/${user?.userName}`).update({
        active: false,
        updatedAt: new Date().toDateString(),
      });
      return "";
    }
  } catch (error) {
    functions.logger.log(error);
    return "";
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const requestTwitterUrl = functions.https.onCall(async (data) => {
  try {
    // Don't forget to specify 'offline.access' in scope list, you want to refresh your token later
    const { url, codeVerifier, state } = client.generateOAuth2AuthLink(
      process.env.TWITTER_CALLBACK_URL as string,
      {
        // scope: ["follows.read", "offline.access"],
        scope: ["tweet.read", "users.read", "follows.read", "offline.access"],
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
        `${process.env.APP_URL}/indiansnft?success=true&twitterAccount=${user.data.username}`
      );
    } catch (error) {
      // functions.logger.log(error);
      console.log({ error });
      res.redirect(`${process.env.APP_URL}/indiansnft?success=false`);
    }
  }
);

export {
  followUser,
  getUserId,
  requestTwitterUrl,
  tweet,
  like,
  retweet,
  twitterCallBack,
  checkFollows,
};

import * as functions from "firebase-functions";
import admin from "./config/admin";

export const checkExists = functions.https.onCall(async (data) => {
  try {
    const project = (
      await admin.firestore().doc(`Projects/${data.project_slug}`).get()
    ).data();

    const twitterAccounts = project?.accounts ?? [];

    return {
      success: true,
      exists: twitterAccounts.includes(data.user_account),
    };
  } catch (error) {
    functions.logger.log(error);
    return { success: false, error, message: "Something bad happened" };
  }
});

export const updateAccounts = functions.https.onCall(async (data) => {
  try {
    const project = (
      await admin.firestore().doc(`Projects/${data.project_slug}`).get()
    ).data();

    const twitterAccounts = project?.accounts ?? [];

    await admin
      .firestore()
      .doc(`Projects/${data.project_slug}`)
      .update({ accounts: [...twitterAccounts, ...[data.user_account]] });

    return { success: true };
  } catch (error) {
    functions.logger.log(error);
    return { success: false, error, message: "Something bad happened" };
  }
});

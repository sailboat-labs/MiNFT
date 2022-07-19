import * as functions from "firebase-functions";
import admin from "./config/admin";

export const addWhitelist = functions.https.onCall(async (data) => {
  try {
    await admin
      .firestore()
      .doc(`Projects/${data.project_slug}/Whitelist/${data.id}`)
      .set(data);

    return { success: true };
  } catch (error) {
    functions.logger.log(error);
    return { success: false, error, message: "Something bad happened" };
  }
});

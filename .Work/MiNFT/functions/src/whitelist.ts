/* eslint-disable @typescript-eslint/no-explicit-any */
import * as functions from "firebase-functions";
import admin from "./config/admin";

export const isWhitelisted = functions.https.onCall(async (data) => {
  try {
    const _docs = await admin
      .firestore()
      .collection(`Projects/${data.project_slug}/Whitelist`)
      .where("wallet", "==", data.wallet)
      .get();

    return { success: true, isWhitelisted: _docs.docs.length > 0 };
  } catch (error) {
    functions.logger.log({ error });
    return { success: false, error, message: "Something bad happened" };
  }
});

export const addWhitelist = functions.https.onCall(async (data) => {
  try {
    await admin
      .firestore()
      .doc(`Projects/${data.projectSlug}/Whitelist/${data.id}`)
      .set(data);

    return { success: true };
  } catch (error) {
    functions.logger.log({ error });
    return { success: false, error, message: "Something bad happened" };
  }
});

export const getWhitelists = functions.https.onCall(async (data) => {
  try {
    const _docs = await admin
      .firestore()
      .collection(`Projects/${data.project_slug}/Whitelist`)
      .get();

    const whitelist = _docs.docs.reduce((acc: any[], curr: any) => {
      acc.push(curr.data())
      return acc
    }, [])

    return { success: true, data: whitelist };
  } catch (error) {
    functions.logger.log({ error });
    return { success: false, error, message: "Something bad happened" };
  }
});

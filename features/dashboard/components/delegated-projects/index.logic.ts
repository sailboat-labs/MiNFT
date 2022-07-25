import {
  collection,
  collectionGroup,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { firestore } from "@/lib/firebase";

import { IProject } from "@/interfaces";

export async function getDelegatedProjects(account: string) {
  const projects: IProject[] = [];

  const delegateAccessCollection = collectionGroup(firestore, `Delegates`);
  try {
    const _query = query(
      delegateAccessCollection,

      where("delegate", "==", account)
    );

    const delegatedAccess = (await getDocs(_query)).docs.map((item) =>
      item.data()
    );

    for (let index = 0; index < delegatedAccess.length; index++) {
      const access = delegatedAccess[index];
      const projectsCollection = collection(firestore, `Projects`);

      const _query = query(
        projectsCollection,

        where("slug", "==", access.slug)
      );

      const project = (await getDocs(_query)).docs.map((item) => item.data());

      if (project.length > 0) {
        projects.push(project[0] as IProject);
      }
    }

    console.log({ delegatedProjects: projects });
  } catch (error) {
    console.log(error);
  }

  return projects;
}

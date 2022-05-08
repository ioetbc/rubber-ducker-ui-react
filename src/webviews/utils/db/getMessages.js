import { db } from "../../../firebaseApp";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import { getMessengerDocName } from "./getMessengerDocName";

export const getMessages = async (currentUsername, collaboratorUsername) => {
  const docName = getMessengerDocName([currentUsername, collaboratorUsername]);
  const collectionRef = collection(db, `messages/${docName}/conversations`);
  const q = query(collectionRef, orderBy("created_at"));

  return onSnapshot(q, (snapshot) => snapshot.docChanges());
};

import { useContext } from "react";
import { db } from "../../../../firebaseApp";
import { collection } from "firebase/firestore";

import { RubberDuckerContext } from "../../../context/RubberDuckerContext";
import { getMessengerDocName } from "../getMessengerDocName";

export default function useMessageHistoryRef() {
  const { currentUser, currentCollaborator } = useContext(RubberDuckerContext);

  const docName = getMessengerDocName([
    currentUser.username,
    currentCollaborator.username,
  ]);

  const reference = collection(
    db,
    `messages/${currentUser.username}/${docName}/history/messages`
  );

  return reference;
}

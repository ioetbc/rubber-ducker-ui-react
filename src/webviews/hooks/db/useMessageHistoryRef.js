import { useContext } from "react";
import { db } from "../../../firebaseApp";
import { collection } from "firebase/firestore";

import { RubberDuckerContext } from "../../context/RubberDuckerContext";
import { getMessengerDocName } from "../../utils/db/getMessengerDocName";

export default function useMessageHistoryRef() {
  const { currentUser, currentCollaborator } = useContext(RubberDuckerContext);

  const docName = getMessengerDocName([
    currentUser.githubId,
    currentCollaborator.githubId,
  ]);

  const reference = collection(
    db,
    `messages/${currentUser.githubId}/${docName}/history/messages`
  );

  return reference;
}

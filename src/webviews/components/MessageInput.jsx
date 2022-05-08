import React, { useContext, useState } from "react";
import { db } from "../../firebaseApp";
import { collection, doc, setDoc } from "firebase/firestore";

import { RubberDuckerContext } from "../context/RubberDuckerContext";
import { getMessengerDocName } from "../utils/db/getMessengerDocName";

export const MessageInput = ({ placeholder }) => {
  const { currentUser, currentCollaborator } = useContext(RubberDuckerContext);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleMessageSubmission = async (event) => {
    event.preventDefault();
    if (message.length <= 0) {
      setErrorMessage("Need to enter a message");
      return;
    } else {
      setErrorMessage("");
    }
    setMessage("");
    const docName = getMessengerDocName([
      currentUser.username,
      currentCollaborator.username,
    ]);
    const messagesRef = collection(db, `messages/${docName}/conversations`);
    await setDoc(doc(messagesRef), {
      text: message,
      created_at: new Date().getTime(),
      to: currentCollaborator.username,
      from: currentUser.username,
    });
  };
  return (
    <form onSubmit={handleMessageSubmission}>
      <textarea
        type="text"
        maxLength={300}
        placeholder={placeholder}
        onChange={handleMessageChange}
        value={message}
      ></textarea>
      {errorMessage && <p>{errorMessage}</p>}
      <button type="submit">send</button>
    </form>
  );
};

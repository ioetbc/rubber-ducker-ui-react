import React, { useContext, useState } from "react";
import { doc, setDoc } from "firebase/firestore";

import { RubberDuckerContext } from "../context/RubberDuckerContext";
import useMessageHistoryRef from "../utils/db/references";

export const MessageInput = ({ placeholder }) => {
  const { currentUser, currentCollaborator } = useContext(RubberDuckerContext);
  const docReference = useMessageHistoryRef();
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

    // perhaps when we set the doc we also set the avatar and any other info you might want to include along side the message. would mean we dont need to left join by doing a new query and then merging the states
    await setDoc(doc(docReference), {
      text: message,
      createdAt: new Date().getTime(),
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

import React, { useContext, useState } from "react";
import { doc, setDoc } from "firebase/firestore";

import { RubberDuckerContext } from "../context/RubberDuckerContext";
import useMessageHistoryRef from "../hooks/db/useMessageHistoryRef";

export const MessageInput = ({ placeholder }) => {
  const { currentUser, currentCollaborator } = useContext(RubberDuckerContext);
  const { githubId, username, profileURL } = currentCollaborator;

  const docReference = useMessageHistoryRef();
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const handleMessageSubmission = async (event) => {
    event.preventDefault();
    if (message.length <= 0) {
      setErrorMessage("Need to enter a message");
      return;
    } else {
      setErrorMessage("");
    }
    setMessage("");

    await setDoc(doc(docReference), {
      text: message,
      createdAt: new Date().getTime(),
      to: githubId,
      from: currentUser.githubId,
      user: {
        username,
        githubId,
        profileURL,
      },
    });
  };
  return (
    <form onSubmit={handleMessageSubmission}>
      <input
        type="text"
        maxLength={300}
        placeholder={placeholder}
        onChange={(event) => setMessage(event.target.value)}
        value={message}
      ></input>
      {errorMessage && <p>{errorMessage}</p>}
      <button type="submit">send</button>
    </form>
  );
};

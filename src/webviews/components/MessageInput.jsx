import React, { useEffect, useContext, useState } from "react";
import { doc, setDoc } from "firebase/firestore";

import { RubberDuckerContext } from "../context/RubberDuckerContext";
import useMessageHistoryRef from "../hooks/db/useMessageHistoryRef";

export const MessageInput = ({ placeholder = "Aa" }) => {
  const { currentUser, currentCollaborator } = useContext(RubberDuckerContext);
  const { githubId, username, profileURL } = currentCollaborator;

  const docReference = useMessageHistoryRef();
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    window.addEventListener("message", async (event) => {
      if (event.data.type !== "liveshareURL") return;
      const URL = event.data.value;
      if (!URL) {
        // TODO - set error message using the setErrorMessage context
        // setLoggedIn(false);
      }
      setMessage("");
      updateDB(URL);
    });
  }, []);

  const updateDB = async (liveshareURL) => {
    const text = message || liveshareURL;
    if (!text.length) return;
    await setDoc(doc(docReference), {
      text,
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

  const handleMessageSubmission = async (event) => {
    event.preventDefault();
    if (message.length <= 0) {
      setErrorMessage("Need to enter a message");
      return;
    } else {
      setErrorMessage("");
    }
    setMessage("");
    updateDB();
  };

  const handleLiveShareLink = () => {
    tsvscode.postMessage({ type: "live-share" });
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
      <button type="button" onClick={handleLiveShareLink}>
        send live share link
      </button>
    </form>
  );
};

import React, { useState } from "react";
import { db } from "../../firebaseApp";

import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import firebase from "firebase/app";
export const SendMessage = () => {
  const [message, setMessage] = useState();
  const sendMessage = async (e) => {
    e.preventDefault();
    const docRef = collection(db, "users");

    await setDoc(doc(docRef), {
      text: message,
      githubId: 12345,
      created_at: serverTimestamp(),
    });
    setMessage("");
  };
  return (
    <form onSubmit={sendMessage}>
      <textarea
        type="text"
        placeholder="enter message"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      ></textarea>
      <button type="submit">send</button>
    </form>
  );
};

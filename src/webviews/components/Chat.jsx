// import { doc } from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseApp";
import { doc, getDoc, collection } from "firebase/firestore";
import { SendMessage } from "./SendMessage";

const Chat = () => {
  const [message, setMessages] = useState({ text: "" });

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "users", "ioetbc/messages");

      const docSnap = await getDoc(docRef);
      // console.log("docSnap", docSnap.data());
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setMessages(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }

    fetchData();
  }, []);
  return (
    <>
      <p>{message.text}</p>
      <SendMessage />
    </>
  );
};

export default Chat;

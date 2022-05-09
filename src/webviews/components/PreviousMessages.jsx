import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { db } from "../../firebaseApp";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
// import { getMessages } from "../utils/getMessages";

import { RubberDuckerContext } from "../context/RubberDuckerContext";
import { getMessengerDocName } from "../utils/db/getMessengerDocName";
import { Paragraph } from "./Fonts";

const MessagesContainer = styled.div`
  height: 300px;
  overflow-y: scroll;
  background: purple;
`;

const MessageBubble = styled.div`
  background: ${(props) => (props.youSentThisMessage ? "green" : "red")};
  padding: 4px;
  margin: 12px;
`;

export const PreviousMessages = () => {
  const { currentUser, currentCollaborator } = useContext(RubberDuckerContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const docName = getMessengerDocName([
        currentUser.username,
        currentCollaborator.username,
      ]);
      const collectionRef = collection(db, `messages/${docName}/conversations`);
      const q = query(collectionRef, orderBy("created_at"));
      onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          setMessages((messages) => [...messages, { ...change.doc.data() }]);
        });
      });
    };

    try {
      setMessages([]);
      fetchMessages();
    } catch (error) {
      console.log("Error getting the messages", error);
    }
  }, [currentCollaborator.username]);

  return (
    <MessagesContainer>
      {messages.map((message) => (
        <MessageBubble
          youSentThisMessage={message.from === currentUser.username}
        >
          <Paragraph text={message.text} />
        </MessageBubble>
      ))}
    </MessagesContainer>
  );
};

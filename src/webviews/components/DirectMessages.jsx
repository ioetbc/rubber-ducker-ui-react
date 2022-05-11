import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { onSnapshot, query, orderBy } from "firebase/firestore";

import { RubberDuckerContext } from "../context/RubberDuckerContext";
import useMessageHistoryRef from "../utils/db/references";

import { MessageTile } from "./MessageTile";
import { HeadingTwo } from "./Fonts";

const Container = styled.div`
  width: 100%;
  padding: 12px;
`;

export const DirectMessages = () => {
  const { currentCollaborator } = useContext(RubberDuckerContext);
  const docReference = useMessageHistoryRef();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchConversationHistory = async () => {
      const q = query(docReference, orderBy("createdAt", "asc"));
      onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          setMessages((messages) => [
            ...messages,
            { ...change.doc.data(), ...currentCollaborator },
          ]);
        });
      });
    };

    try {
      fetchConversationHistory();
    } catch (error) {
      console.log("Error getting the messages", error);
    }
  }, []);

  return (
    <Container>
      <HeadingTwo text="messages" />
      {messages.map((message) => (
        <MessageTile
          username={message.username}
          profileURL={message.profileURL}
          message={message.message}
        />
      ))}
    </Container>
  );
};

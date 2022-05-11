import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { onSnapshot, query, orderBy } from "firebase/firestore";

import { RubberDuckerContext } from "../context/RubberDuckerContext";
import useMessageHistoryRef from "../hooks/db/useMessageHistoryRef";

import { HeadingTwo } from "./Fonts";
import { MessageBubble } from "./MessageBubble";

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
        <MessageBubble text={message.text} from={message.from} />
      ))}
    </Container>
  );
};

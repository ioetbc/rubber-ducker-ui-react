import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { onSnapshot, query, orderBy } from "firebase/firestore";

import { RubberDuckerContext } from "../context/RubberDuckerContext";
import useMessageHistoryRef from "../hooks/db/useMessageHistoryRef";
import { MessageBubble } from "./MessageBubble";

const MessagesContainer = styled.div`
  height: 300px;
  overflow-y: scroll;
  background: purple;
`;

export const PreviousMessages = () => {
  const { currentCollaborator } = useContext(RubberDuckerContext);
  const docReference = useMessageHistoryRef();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const q = query(docReference, orderBy("createdAt", "asc"));
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
  }, [currentCollaborator.githubId]);

  return (
    <MessagesContainer>
      {messages.map((message) => (
        <MessageBubble text={message.text} from={message.from} />
      ))}
    </MessagesContainer>
  );
};

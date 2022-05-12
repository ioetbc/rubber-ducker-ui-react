import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebaseApp";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";

import { RubberDuckerContext } from "../context/RubberDuckerContext";
import { getMessengerDocName } from "../utils/db/getMessengerDocName";

import { MessageTile } from "./MessageTile";
import { HeadingTwo } from "./Fonts";

const Container = styled.div`
  width: 100%;
  padding: 12px;
`;

export const MessageOverview = () => {
  const { currentUser } = useContext(RubberDuckerContext);
  const [latestMessages, setLatestMessages] = useState([]);

  useEffect(() => {
    const fetchLatestMessage = async () => {
      // chunk the array so you only get the first 25 or something once scrolled to top it loads the next 25
      currentUser.hasMessaged.forEach((githubId) => {
        const docName = getMessengerDocName([currentUser.githubId, githubId]);

        const reference = collection(
          db,
          `messages/${currentUser.githubId}/${docName}/history/messages`
        );

        const q = query(reference, orderBy("createdAt", "desc"), limit(1));
        onSnapshot(q, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            setLatestMessages((current) => [change.doc.data(), ...current]);
          });
        });
      });
    };

    try {
      fetchLatestMessage();
    } catch (error) {
      console.log("Error getting the messages", error);
    }
  }, []);

  return (
    <Container>
      <HeadingTwo text="messages" />
      {latestMessages.map((msg) => (
        <MessageTile
          username={msg.user.username}
          profileURL={msg.user.profileURL}
          message={msg.text}
          githubId={msg.user.githubId}
        />
      ))}
    </Container>
  );
};

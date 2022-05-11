import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebaseApp";
import { doc, getDoc } from "firebase/firestore";

import { getMessengerDocName } from "../utils/db/getMessengerDocName";
import { RubberDuckerContext } from "../context/RubberDuckerContext";

import { MessageTile } from "./MessageTile";
import { HeadingTwo } from "./Fonts";

const Container = styled.div`
  width: 100%;
  padding: 12px;
`;

export const MessageOverview = () => {
  const { currentUser } = useContext(RubberDuckerContext);
  const [latestMessages, setLatestMessages] = useState([]);
  const [latestMessagesWithProfile, setLatestMessagesWithProfile] = useState(
    []
  );

  const getFirestoreDoc = async (path) => {
    const snapshot = await getDoc(path);
    if (snapshot.exists()) {
      return snapshot.data();
    } else {
      console.log("No such document");
      return [];
    }
  };

  useEffect(() => {
    const fetchLatestMessage = async () => {
      currentUser.hasMessaged.forEach(async (user) => {
        const docName = getMessengerDocName([currentUser.username, user]);
        const ref = doc(
          db,
          `messages/${currentUser.username}/${docName}/latestMessage`
        );

        const document = await getFirestoreDoc(ref);
        return setLatestMessages((current) => [...current, document]);
      });
    };

    try {
      fetchLatestMessage();
    } catch (error) {
      console.log("Error getting the messages", error);
    }
  }, []);

  useEffect(() => {
    const getCollaborator = () => {
      latestMessages.forEach(async (message) => {
        const ref = doc(db, `users/${message.username}`);
        const document = await getFirestoreDoc(ref);
        setLatestMessagesWithProfile((current) => [
          ...current,
          {
            latestMessage: { ...message },
            user: { ...document },
          },
        ]);
      });
    };

    try {
      getCollaborator();
    } catch (error) {
      console.log("error", error);
    }
  }, [latestMessages]);

  return (
    <Container>
      <HeadingTwo text="messages" />
      {latestMessagesWithProfile.map((msg) => (
        <MessageTile
          username={msg.user.username}
          profileURL={msg.user.profileURL}
          message={msg.latestMessage.message}
          githubId={msg.user.github_id}
        />
      ))}
    </Container>
  );
};

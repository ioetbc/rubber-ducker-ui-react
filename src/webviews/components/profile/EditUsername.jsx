import React, { useContext } from "react";
import { doc, setDoc } from "firebase/firestore";
import { RubberDuckerContext } from "../../context/RubberDuckerContext";
import styled from "styled-components";

import { HeadingThree } from "../misc/Fonts";
import { Input } from "../misc/Input";

const Container = styled.div`
  background: red;
  border: 1px solid white;
  padding: 12px;
  margin-top: 4px;
`;

export const EditUsername = () => {
  const { currentUser } = useContext(RubberDuckerContext);

  // const handleSubmission = () => {
  // const reference = collection(
  //   db,
  //   `messages/${currentUser.githubId}/${docName}/history/messages`
  // );

  //     await setDoc(doc(docReference), {
  //     text,
  //     createdAt: new Date().getTime(),
  //     to: githubId,
  //     from: currentUser.githubId,
  //     user: {
  //       username,
  //       githubId,
  //       profileURL,
  //     },
  //   });
  // }

  return (
    <Container>
      <HeadingThree text="edit username" />
      <Input type="text" placeholder={currentUser.username} />
    </Container>
  );
};

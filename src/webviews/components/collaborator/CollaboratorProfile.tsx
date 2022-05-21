import React, { useContext } from "react";
import styled from "styled-components";

import { RubberDuckerContext } from "../../context/RubberDuckerContext";
import { ProfileIdentifier } from "./ProfileIdentifier";
import { ProfileReviews } from "./ProfileReviews";
import { TopTech } from "./TopTech";
import { Bio } from "./Bio";

import { MessagesContainer } from "../MessagesContainer";
import { PreviousMessages } from "../PreviousMessages";
import { MessageInput } from "../MessageInput";
import { HeadingThree } from "../misc/Fonts";

const Container = styled.div`
  width: 100%;
  padding: 12px;
`;

export const CollaboratorProfile = () => {
  const { currentCollaborator } = useContext(RubberDuckerContext);
  return (
    <Container>
      <ProfileIdentifier user={currentCollaborator} />
      <Bio />
      <TopTech />
      <ProfileReviews />
      <MessagesContainer>
        <HeadingThree text="messages" />
        <PreviousMessages />
        <MessageInput
          placeholder={`Tell ${currentCollaborator.username} what you are stuck on`}
        />
      </MessagesContainer>
    </Container>
  );
};

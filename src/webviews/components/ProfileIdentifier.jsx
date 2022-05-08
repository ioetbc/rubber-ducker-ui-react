import React, { useContext } from "react";
import styled from "styled-components";
import { RubberDuckerContext } from "../context/RubberDuckerContext";

const Container = styled.div`
  background: hotpink;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const ProfileIdentifier = () => {
  const { currentCollaborator } = useContext(RubberDuckerContext);
  return (
    <Container>
      <img
        className="avatar"
        src={currentCollaborator.profileURL}
        alt={currentCollaborator.username}
      ></img>
      <p>{currentCollaborator && currentCollaborator.username}</p>
    </Container>
  );
};

import React, { useContext } from "react";
import styled from "styled-components";
import { RubberDuckerContext } from "../context/RubberDuckerContext";

const Container = styled.div`
  background: red;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 4px 0;
  margin-top: 4px 0;

  .avatar {
    width: 50px;
    border-radius: 50%;
  }
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

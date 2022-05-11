import React, { useContext } from "react";
import { RubberDuckerContext } from "../context/RubberDuckerContext";
import styled from "styled-components";

import { HeadingFive } from "./Fonts";

const Container = styled.div`
  .container {
    width: 100%;
    background: red;
    display: flex;
    margin-bottom: 16px;
    padding: 12px;
    justify-content: space-between;
    align-items: center;
  }
  .avatar {
    width: 50px;
    border-radius: 50%;
  }
`;

export const MessageTile = ({
  profileURL,
  username,
  message,
  githubId,
  createdAt,
  lastActive,
}) => {
  const { setCurrentCollaborator, setCurrentScreen } =
    useContext(RubberDuckerContext);

  const handleMessageTile = () => {
    setCurrentScreen("direct-message");
    setCurrentCollaborator({ username, github_id: githubId, profileURL });
  };
  return (
    <Container>
      <div className="container" onClick={handleMessageTile}>
        <img className="avatar" src={profileURL} alt="avatar" />
        <HeadingFive text={message} />
      </div>
    </Container>
  );
};

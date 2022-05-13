import React, { useContext } from "react";
import styled from "styled-components";
import { RubberDuckerContext } from "../context/RubberDuckerContext";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 24px 0;
  padding: 4px;
  background: green;
  cursor: pointer;
  .avatar {
    width: 50px;
    border-radius: 50%;
  }
`;

export const ProfileCard = ({ key, githubId, profileURL, username }) => {
  const { setCurrentCollaborator, setCurrentScreen } =
    useContext(RubberDuckerContext);

  const handleProfile = () => {
    setCurrentScreen("profile");
    setCurrentCollaborator({ username, githubId, profileURL });
  };
  return (
    <Container key={key} onClick={handleProfile}>
      <img className="avatar" src={profileURL} alt={username}></img>
      <p className="username">{username}</p>
    </Container>
  );
};

import React from "react";
import styled from "styled-components";

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

interface ProfileIdentifierInterface {
  profileURL: string;
  username: string;
}

export const ProfileIdentifier = ({
  profileURL,
  username,
}: ProfileIdentifierInterface) => {
  return (
    <Container>
      <img className="avatar" src={profileURL} alt={username}></img>
      <p>{username && username}</p>
    </Container>
  );
};

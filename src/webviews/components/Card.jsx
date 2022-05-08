import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: blue;
  .avatar {
    width: 50px;
    border-radius: 50%;
  }
`;

export const Card = ({ children }) => {
  return <Container>{children}</Container>;
};

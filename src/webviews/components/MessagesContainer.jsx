import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background: red;
  padding: 12px;
  border: white solid 1px;
  margin-top: 4px;
`;

export const MessagesContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

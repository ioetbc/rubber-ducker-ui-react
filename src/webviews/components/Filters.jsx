import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 24px 0;
  display: flex;
  justify-content: space-between;
`;

export const Filters = ({ children, key }) => {
  return <Container key={key}>{children}</Container>;
};

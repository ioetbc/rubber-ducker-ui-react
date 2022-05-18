import React, { useContext } from "react";
import { RubberDuckerContext } from "../context/RubberDuckerContext";
import styled from "styled-components";

const Container = styled.div`
  background: green;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 24px;
`;

export const Footer = () => {
  const { setCurrentScreen } = useContext(RubberDuckerContext);
  return (
    <Container>
      <button onClick={() => setCurrentScreen("message-overview")}>
        messages
      </button>
      <button onClick={() => setCurrentScreen("myProfile")}>my profile</button>
      <button onClick={() => setCurrentScreen("invoices")}>invoice</button>
      <button onClick={() => setCurrentScreen("message-overview")}>
        legal
      </button>
    </Container>
  );
};

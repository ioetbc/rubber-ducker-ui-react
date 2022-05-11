import React, { useContext } from "react";
import styled from "styled-components";

import { RubberDuckerContext } from "../context/RubberDuckerContext";
import { Paragraph } from "./Fonts";

const Container = styled.div`
  background: ${(props) => (props.youSentThisMessage ? "green" : "red")};
  padding: 4px;
  margin: 12px;
`;

export const MessageBubble = ({ message }) => {
  const { currentUser } = useContext(RubberDuckerContext);

  return (
    <Container youSentThisMessage={message.from === currentUser.username}>
      <Paragraph text={message.text} />
    </Container>
  );
};

import React, { useContext } from "react";
import { RubberDuckerContext } from "../../context/RubberDuckerContext";
import styled from "styled-components";

import { HeadingThree, Paragraph } from "../misc/Fonts";

const Container = styled.div`
  background: red;
  border: 1px solid white;
  padding: 12px;
  margin-top: 4px;
`;

export const Bio = () => {
  const { currentUser } = useContext(RubberDuckerContext);
  return (
    <Container>
      <HeadingThree text="about me" />
      <Paragraph text={currentUser.bio} />
    </Container>
  );
};

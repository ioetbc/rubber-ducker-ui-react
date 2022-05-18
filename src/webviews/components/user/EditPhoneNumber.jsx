import React, { useContext } from "react";
import { RubberDuckerContext } from "../../context/RubberDuckerContext";
import styled from "styled-components";

import { HeadingThree } from "../misc/Fonts";
import { Input } from "../misc/Input";

const Container = styled.div`
  background: red;
  border: 1px solid white;
  padding: 12px;
  margin-top: 4px;
`;

export const EditPhoneNumber = () => {
  const { currentUser } = useContext(RubberDuckerContext);
  return (
    <Container>
      <HeadingThree text="edit phone number" />
      <Input
        type="text"
        placeholder={currentUser?.email ? currentUser?.phone : "07493774943"}
      />
    </Container>
  );
};

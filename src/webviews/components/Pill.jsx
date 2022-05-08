import React from "react";
import styled from "styled-components";

import { IoClose } from "react-icons/io5";

const Container = styled.div`
  background: black;
  color: white;
  border-radius: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  text-transform: uppercase;
  font-size: 10px;
  padding: 4px 14px;
`;

export const Pill = ({ label, close = false }) => {
  return (
    <Container>
      {label}
      {close && <IoClose size={15} />}
    </Container>
  );
};

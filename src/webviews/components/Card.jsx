import React, { useContext } from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";

import { RubberDuckerContext } from "../context/RubberDuckerContext";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 800px;
  overflow-y: scroll;
  background: blue;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  .close-button {
    padding: 12px 8px 0 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

export const Card = ({ children }) => {
  const { setCurrentScreen } = useContext(RubberDuckerContext);

  const handleClose = () => {
    setCurrentScreen("homepage");
  };
  return (
    <Container>
      <div className="close-button">
        <div onClick={handleClose} style={{ cursor: "pointer" }}>
          <IoClose size={20} />
        </div>
      </div>
      {children}
    </Container>
  );
};

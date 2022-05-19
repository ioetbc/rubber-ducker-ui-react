import React, { useContext } from "react";
import { RubberDuckerContext } from "../../context/RubberDuckerContext";
import styled from "styled-components";

import { HeadingFive } from "../misc/Fonts";

const Container = styled.div`
  .container {
    width: 100%;
    background: red;
    display: flex;
    margin-bottom: 16px;
    padding: 12px;
    justify-content: space-between;
    align-items: center;
  }
  .avatar {
    width: 50px;
    border-radius: 50%;
  }
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
  }
  .status {
    background: ${(props) =>
      props.status === "complete" ? "green" : "purple"};
    padding: 4px;
  }
`;

export const InvoiceTile = ({ amount, status, profileURL, minutes }) => {
  const { setCurrentScreen } = useContext(RubberDuckerContext);

  const handleMessageTile = () => {
    setCurrentScreen("direct-invoice");
  };
  return (
    <Container status={status}>
      <div className="container" onClick={handleMessageTile}>
        <img className="avatar" src={profileURL} alt="avatar" />
        <div className="data">
          <div className="flex">
            <HeadingFive text="amount:" />
            <HeadingFive text={`£${amount}`} />
          </div>
          <div className="flex">
            <HeadingFive text="status:" />
            <HeadingFive className="status" text={status} />
          </div>
        </div>
      </div>
    </Container>
  );
};

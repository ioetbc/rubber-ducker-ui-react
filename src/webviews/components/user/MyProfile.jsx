import React, { useContext } from "react";
import styled from "styled-components";

import { RubberDuckerContext } from "../../context/RubberDuckerContext";
import { ProfileIdentifier } from "../collaborator/ProfileIdentifier";
import { EditBio } from "./EditBio";
import { EditUsername } from "./EditUsername";
import { EditEmailAddress } from "./EditEmailAddress";
import { EditPhoneNumber } from "./EditPhoneNumber";
import { EditPerHourRate } from "./EditPerHourRate";
import { EditTopTech } from "./EditTopTech";

const Container = styled.div`
  width: 100%;
  padding: 12px;
`;

export const MyProfile = () => {
  const { currentUser } = useContext(RubberDuckerContext);
  return (
    <Container>
      <ProfileIdentifier user={currentUser} />
      <EditUsername />
      <EditBio />
      <EditEmailAddress />
      <EditPhoneNumber />
      {/* should everyone have a phr? or just those that sign up to be a teacher? */}
      <EditPerHourRate />
      <EditTopTech />
    </Container>
  );
};

import React, { useContext } from "react";
import { RubberDuckerContext } from "../context/RubberDuckerContext";
import { ProfileIdentifier } from "./ProfileIdentifier";
import { PreviousMessages } from "./PreviousMessages";
import { MessageInput } from "./MessageInput";
import { ProfileReviews } from "./ProfileReviews";

export const Profile = () => {
  const { currentCollaborator } = useContext(RubberDuckerContext);
  return (
    <>
      <ProfileIdentifier />
      <ProfileReviews />
      <PreviousMessages />
      <MessageInput
        placeholder={`Tell ${currentCollaborator.username} what you are stuck on`}
      />
    </>
  );
};

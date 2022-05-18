import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { db } from "../../../firebaseApp";
import { collection, onSnapshot } from "firebase/firestore";
import { RubberDuckerContext } from "../../context/RubberDuckerContext";

import { HeadingThree } from "../misc/Fonts";
import { Pill } from "../misc/Pill";

const TechContainer = styled.div`
  background: red;
  border: 1px solid white;
  padding: 12px;
  margin-top: 4px;
`;

const Container = styled.div`
  display: flex;
  gap: 10px;
`;

export const TopTech = () => {
  const { currentCollaborator } = useContext(RubberDuckerContext);
  const [technology, setTechnology] = useState([]);

  useEffect(() => {
    const fetchTechnology = async () => {
      const collectionRef = collection(
        db,
        `technology/${currentCollaborator.username}/technology`
      );
      onSnapshot(collectionRef, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          setTechnology((technology) => [
            ...technology,
            { ...change.doc.data() },
          ]);
        });
      });
    };

    try {
      setTechnology([]);
      fetchTechnology();
    } catch (error) {
      console.log("Error getting the reviews", error);
    }
  }, [currentCollaborator.username]);

  return (
    <TechContainer>
      <HeadingThree text="top skills" />
      <Container>
        {technology.map((tech) => (
          <Pill label={tech.technology} />
        ))}
      </Container>
    </TechContainer>
  );
};

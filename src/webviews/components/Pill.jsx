import React, { useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseApp";
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
  user-select: none;
  .shit {
    cursor: pointer;
  }
`;

export const Pill = ({
  key,
  label,
  close = false,
  techFilters,
  setTechFilters,
  setUsers,
  setCollaborators,
}) => {
  const handleTechRemoval = () => {
    console.log({ label, techFilters });
    console.log(
      "hmm",
      techFilters.filter((tech) => tech.type !== label)
    );

    setUsers([]);
    setTechFilters(techFilters.filter((tech) => tech.type !== label));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      console.log("calling firebase after removing filter", techFilters);
      try {
        const ref = collection(db, "users");
        techFilters.forEach(async (filter) => {
          const q = query(
            ref,
            where(`tech.${filter.type}`, ">=", filter.proficiency)
          );
          const snapshot = await getDocs(q);
          snapshot.docs.forEach(async (doc) => {
            setCollaborators((currentArray) => [...currentArray, doc.data()]);
          });
        });
      } catch (error) {
        console.log(error.toString());
      }
    };

    try {
      fetchUsers();
    } catch (erros) {
      console.log("there was an error");
    }
  }, [techFilters]);

  return (
    <Container key={key}>
      {label}
      {close && (
        <IoClose className="shit" onClick={handleTechRemoval} size={15} />
      )}
    </Container>
  );
};

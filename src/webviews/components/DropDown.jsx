import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseApp";
import styled from "styled-components";

import DatalistInput, { useComboboxControls } from "react-datalist-input";

const Container = styled.div`
  .react-datalist-input__container > * {
    box-sizing: border-box;
  }

  .react-datalist-input__container {
    width: 100%;
    position: relative;
  }

  .react-datalist-input__textbox {
    width: 100%;
    border: 1px solid blue;
    padding: 16px;
  }

  .react-datalist-input__listbox {
    width: 100%;
    position: absolute;
    margin-top: 4px;
    border: 1px solid red;
    background: purple;
    display: flex;
    gap: 20px;
    flex-direction: column;
    list-style-type: none;
    z-index: 10;
  }

  .react-datalist-input__listbox-option {
    width: 100%;
    background: green;
    cursor: pointer;
    padding: 16px;
    color: white;
  }

  .react-datalist-input__listbox-option:focus {
    background: pink;
  }

  .react-datalist-input__listbox-option:hover {
    background: blue;
  }
`;

export const SearchableDropdown = ({
  setUsers,
  techFilters,
  setTechFilters,
}) => {
  const [collaborators, setCollaborators] = useState([]);
  // set all errors in the context
  const [errorMessage, setErrorMessage] = useState("");
  const { setValue, value } = useComboboxControls();

  const validateInput = (type) => {
    const filter = type.toLowerCase();
    if (
      techFilters.some((filter) => filter.type === filter) ||
      filter.length <= 0
    ) {
      if (filter.length <= 0) setErrorMessage("you must enter a value");
      else setErrorMessage("filter option already exists");
      return;
    } else {
      setErrorMessage("");
      return filter;
    }
  };

  const handleInputSelection = async ({ type, proficiency = 5 }) => {
    const technology = validateInput(type);
    if (!technology) return;
    console.log("technology", technology);

    setValue("");
    setUsers([]);
    setTechFilters((techFilters) => [
      ...techFilters,
      { type: technology, proficiency },
    ]);
    try {
      const ref = collection(db, "users");
      const q = query(ref, where(`tech.${technology}`, ">=", proficiency));
      const snapshot = await getDocs(q);
      snapshot.docs.forEach(async (doc) => {
        setCollaborators((currentArray) => [...currentArray, doc.data()]);
      });
    } catch (error) {
      console.log(error.toString());
    }
  };

  useEffect(() => {
    if (!techFilters.length) return;

    const potentialCollaboratorUsernames = collaborators.map(
      (collaborator) => collaborator.username
    );

    const getNumberOfOccurences = potentialCollaboratorUsernames.reduce(
      function (obj, b) {
        obj[b] = ++obj[b] || 1;
        return obj;
      },
      {}
    );

    Object.filter = (obj, predicate) =>
      Object.keys(obj)
        .filter((key) => predicate(obj[key]))
        .reduce((res, key) => ((res[key] = obj[key]), res), {});

    const collaboratorsThatMatchAllFilters =
      Object.filter(
        getNumberOfOccurences,
        (score) => score === techFilters.length
      ) || {};

    const hmm = Object.keys(collaboratorsThatMatchAllFilters);

    const found = hmm.map((collaborator) =>
      collaborators.find((element) => element.username === collaborator)
    );

    setUsers(found);
  }, [collaborators]);

  const handleProficiency = ({ type, proficiency }) => {
    handleInputSelection({ type, proficiency });
  };

  return (
    <Container>
      <DatalistInput
        onBlur={() => handleInputSelection({ type: value })}
        placeholder="node"
        onSelect={(item) => handleInputSelection({ type: item.value })}
        value={value}
        setValue={setValue}
        items={[
          { value: "node", id: "node" },
          { value: "python", id: "python" },
          { value: "javascript", id: "javascript" },
          { value: "dynamo_db", id: "dynamo_db" },
          { value: "react", id: "react" },
        ]}
      />
      <p>{errorMessage}</p>
    </Container>
  );
};

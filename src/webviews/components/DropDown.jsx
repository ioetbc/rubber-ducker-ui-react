import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseApp";

import DatalistInput, { useComboboxControls } from "react-datalist-input";

[
  {
    type: "node",
    proficiency: 8,
  },
  {
    type: "node",
    proficiency: 5,
  },
];

export const SearchableDropdown = ({
  setUsers,
  techFilters,
  setTechFilters,
}) => {
  const [filter1, setFilter1] = useState([]);
  const [filter2, setFilter2] = useState([]);
  const [filter3, setFilter3] = useState([]);
  const { setValue, value } = useComboboxControls();

  const handleInputSelection = async ({ type, proficiency = 5 }) => {
    const technology = type.toLowerCase();
    // do some more sanitizing checks

    if (
      techFilters.some(
        (filter) =>
          filter.type === technology && filter.proficiency === proficiency
      ) ||
      technology.length <= 0
    )
      return;

    // only set this proficieny if its changes

    console.log("TECH FILTERS", techFilters);
    setTechFilters((techFilters) => [
      ...techFilters,
      { type: technology, proficiency },
    ]);

    setValue("");
    setUsers([]);

    try {
      const ref = collection(db, "users");
      const q = query(ref, where(`tech.${technology}`, ">=", proficiency));
      const snapshot = await getDocs(q);

      snapshot.docs.forEach(async (doc) => {
        if (techFilters.length === 0) {
          setFilter1((filter) => [...filter, doc.data()]);
        }
        if (techFilters.length === 1) {
          setFilter2((F) => [...F, doc.data()]);
        }
        if (techFilters.length === 2) {
          setFilter3((filter) => [...filter, doc.data()]);
        }
      });
    } catch (error) {
      console.log(error.toString());
    }
  };

  useEffect(() => {
    let filteredByAllConditions;
    if (techFilters.length === 1) {
      filteredByAllConditions = filter1;
    }

    if (techFilters.length === 2) {
      filteredByAllConditions = filter2.filter((val) => !filter1.includes(val));
    }
    if (techFilters.length === 3) {
      filteredByAllConditions = filter3.filter((val) => !filter2.includes(val));
    }

    if (techFilters.length > 0) {
      setUsers(filteredByAllConditions);
    }
  }, [filter1, filter2, filter3]);

  const handleProficiency = ({ type, proficiency }) => {
    console.log("type selected", type);

    handleInputSelection({ type, proficiency });
  };

  return (
    <>
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

      <ul>
        {techFilters.map((tech) => (
          <>
            <p>{tech.type}</p>
            <div>
              <button
                onClick={() =>
                  handleProficiency({ type: tech.type, proficiency: 4 })
                }
              >
                junior
              </button>
              <button
                onClick={() =>
                  handleProficiency({ type: tech.type, proficiency: 8 })
                }
              >
                mid
              </button>
              <button
                onClick={() =>
                  handleProficiency({ type: tech.type, proficiency: 10 })
                }
              >
                senior
              </button>
            </div>
          </>
        ))}
      </ul>
    </>
  );
};

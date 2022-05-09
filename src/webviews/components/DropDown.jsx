import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseApp";

import DatalistInput, { useComboboxControls } from "react-datalist-input";

export const SearchableDropdown = ({
  setUsers,
  techFilters,
  setTechFilters,
}) => {
  const { setValue, value } = useComboboxControls();

  const handleSubmission = async () => {
    setUsers([]);
    try {
      const ref = collection(db, "users");
      const snapshot = await getDocs(ref);

      snapshot.docs.forEach(async (doc) => {
        const containsAll = techFilters.every((type) => {
          if (!doc.data().technology) return;
          return doc.data().technology.includes(type);
        });
        if (!containsAll) return;
        setUsers((users) => [...users, { ...doc.data(), id: doc.id }]);
      });
    } catch (error) {
      setErrorMessage(error.toString());
    }
  };

  const handleInputSelection = (value) => {
    const val = value.toLowerCase();
    if (techFilters.includes(val) || val.length <= 0) return;
    setTechFilters((techFilters) => [...techFilters, val]);
    setValue("");
  };

  return (
    <>
      <DatalistInput
        onBlur={() => handleInputSelection(value)}
        placeholder="node"
        onSelect={(item) => handleInputSelection(item.value)}
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
      <button onClick={handleSubmission}>submit</button>
    </>
  );
};

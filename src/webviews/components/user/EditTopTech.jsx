import React, { useState } from "react";
import styled from "styled-components";

import { SearchableDropdown } from "../dropdown";
import { Pill } from "../misc/Pill";
import { Filters } from "../Filters";
import { HeadingThree } from "../misc/Fonts";

const Container = styled.div`
  background: red;
  border: 1px solid white;
  padding: 12px;
  margin-top: 4px;
`;

export const EditTopTech = () => {
  const [techFilters, setTechFilters] = useState([]);
  const [_, setUsers] = useState([]);

  return (
    <Container>
      <HeadingThree text="edit top tech" />
      <SearchableDropdown
        techFilters={techFilters}
        setTechFilters={setTechFilters}
        setUsers={setUsers}
      />
      {techFilters.map((tech) => (
        <Filters key={tech}>
          <Pill
            key={tech}
            label={tech.type}
            close={true}
            techFilters={techFilters}
            setTechFilters={setTechFilters}
          />
        </Filters>
      ))}
    </Container>
  );
};

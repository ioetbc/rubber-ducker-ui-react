import React, { useState } from "react";
import styled from "styled-components";

import { SearchableDropdown } from "./dropdown";
import { Pill } from "./misc/Pill";
import { Filters } from "./Filters";
import { ProfileCard } from "./collaborator/ProfileCard";
import { TechProficiency } from "./TechProficiency";
import { PerHourRateFilter } from "./PerHourRateFilter";

const ProfileCardContainer = styled.div`
  /* display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px; */
`;

export const FindCollaborators = () => {
  const [techFilters, setTechFilters] = useState([]);
  const [users, setUsers] = useState([]);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  const handleAdvancedSearch = () => {
    setShowAdvancedSettings(!showAdvancedSettings);
  };

  return (
    <>
      <SearchableDropdown
        techFilters={techFilters}
        setTechFilters={setTechFilters}
        setUsers={setUsers}
      />
      <button onClick={handleAdvancedSearch}>advanced</button>
      {techFilters.map((tech) => (
        <Filters key={tech}>
          <Pill
            key={tech}
            label={tech.type}
            close={true}
            techFilters={techFilters}
            setTechFilters={setTechFilters}
          />
          {showAdvancedSettings && (
            <TechProficiency
              filter={tech}
              techFilters={techFilters}
              setTechFilters={setTechFilters}
            />
          )}
        </Filters>
      ))}
      {showAdvancedSettings && <PerHourRateFilter />}
      <ProfileCardContainer>
        {users.map((user) => (
          <ProfileCard
            key={user.githubId}
            githubId={user.githubId}
            profileURL={user.profileURL}
            username={user.username}
          />
        ))}
      </ProfileCardContainer>
    </>
  );
};

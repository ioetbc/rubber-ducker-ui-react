import React, { useState } from "react";
import { SearchableDropdown } from "./Dropdown";
import { Pill } from "./Pill";
import { Filters } from "./Filters";
import { ProfileCard } from "./ProfileCard";
import { TechProficiency } from "./TechProficiency";
import { PerHourRateFilter } from "./PerHourRateFilter";

// TODO
// click advanced and you can filter user for free / paid

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
      {users.map((user) => (
        <ProfileCard
          key={user.githubId}
          githubId={user.githubId}
          profileURL={user.profileURL}
          username={user.username}
        />
      ))}
    </>
  );
};

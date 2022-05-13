import React, { useState } from "react";
import { SearchableDropdown } from "./Dropdown";
import { Pill } from "./Pill";
import { ProfileCard } from "./ProfileCard";

// TODO
// ability to remove a filter
// click advanced and you can filter users by proficiency
// click advanced and you can filter user for free / paid

export const FindCollaborators = () => {
  const [techFilters, setTechFilters] = useState([]);
  const [users, setUsers] = useState([]);

  return (
    <>
      <SearchableDropdown
        techFilters={techFilters}
        setTechFilters={setTechFilters}
        setUsers={setUsers}
      />
      {techFilters.map((tech) => (
        <Pill
          key={tech}
          label={tech.type}
          close={true}
          techFilters={techFilters}
          setTechFilters={setTechFilters}
        />
      ))}
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

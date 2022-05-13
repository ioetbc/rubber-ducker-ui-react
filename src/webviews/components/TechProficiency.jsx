import React from "react";

export const TechProficiency = ({ techFilters, filter, setTechFilters }) => {
  const levels = {
    junior: 1,
    mid: 4,
    senior: 7,
    expert: 10,
  };

  const handleProficiency = (level) => {
    const updatedTechFilters = techFilters.map((tech) => {
      const proficiency = levels[level];

      if (tech.type === filter.type) {
        return { ...tech, proficiency };
      }
    });
    setTechFilters(updatedTechFilters);
  };

  return Object.keys(levels).map((level) => (
    <button key={level} onClick={() => handleProficiency(level)}>
      {level}
    </button>
  ));
};

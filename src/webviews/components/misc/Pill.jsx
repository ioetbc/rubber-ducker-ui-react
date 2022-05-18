import React from "react";
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
}) => {
  const handlePillRemoval = () => {
    console.log({ label, techFilters });
    console.log(
      "hmm",
      techFilters.filter((tech) => tech.type !== label)
    );

    setTechFilters(techFilters.filter((tech) => tech.type !== label));
  };

  return (
    <Container key={key}>
      {label}
      {close && (
        <IoClose className="shit" onClick={handlePillRemoval} size={15} />
      )}
    </Container>
  );
};

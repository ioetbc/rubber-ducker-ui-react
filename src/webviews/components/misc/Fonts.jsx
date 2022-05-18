import React from "react";
import styled from "styled-components";

const generic = {
  color: "black",
  "margin-bottom": "4px",
  "text-transform": "uppercase",
};

const H1 = styled.h1`
  ${generic}
`;

const H2 = styled.h2`
  ${generic}
`;

const H3 = styled.h3`
  ${generic}
`;

const H4 = styled.h4`
  ${generic}
`;

const H5 = styled.h5`
  ${generic}
`;

const Body = styled.p`
  color: black;
  margin-bottom: 4px;
  font-size: 14px;
`;

export const Paragraph = ({ text, className }) => {
  return <Body className={className}>{text}</Body>;
};

export const HeadingOne = ({ text, className }) => {
  return <H1 className={className}>{text}</H1>;
};

export const HeadingTwo = ({ text, className }) => {
  return <H2 className={className}>{text}</H2>;
};

export const HeadingThree = ({ text, className }) => {
  return <H3 className={className}>{text}</H3>;
};

export const HeadingFour = ({ text, className }) => {
  return <H4 className={className}>{text}</H4>;
};

export const HeadingFive = ({ text, className }) => {
  return <H5 className={className}>{text}</H5>;
};

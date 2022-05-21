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

interface FontInterface {
  text: string;
  className?: string;
}

export const Paragraph = ({ text, className }: FontInterface) => {
  return <Body className={className}>{text}</Body>;
};

export const HeadingOne = ({ text, className }: FontInterface) => {
  return <H1 className={className}>{text}</H1>;
};

export const HeadingTwo = ({ text, className }: FontInterface) => {
  return <H2 className={className}>{text}</H2>;
};

export const HeadingThree = ({ text, className }: FontInterface) => {
  return <H3 className={className}>{text}</H3>;
};

export const HeadingFour = ({ text, className }: FontInterface) => {
  return <H4 className={className}>{text}</H4>;
};

export const HeadingFive = ({ text, className }: FontInterface) => {
  return <H5 className={className}>{text}</H5>;
};

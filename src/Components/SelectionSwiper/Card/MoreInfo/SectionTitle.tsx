import { styled } from "styled-components";

interface Props {
  title: string;
}

export const SectionTitle = ({ title }: Props) => (
  <StyledSectionTitle>{title}</StyledSectionTitle>
);

const StyledSectionTitle = styled.div`
  margin: 30px 0 12px;
  font-family: "Overpass", sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 118%;
  letter-spacing: 0.36px;
  text-transform: uppercase;
  text-transform: uppercase;
`;

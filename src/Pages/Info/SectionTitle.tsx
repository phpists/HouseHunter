import { styled } from "styled-components";

interface Props {
  title: string;
}

export const SectionTitle = ({ title }: Props) => (
  <StyledSectionTitle>{title}</StyledSectionTitle>
);

const StyledSectionTitle = styled.div`
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: 118%; /* 25.96px */
  letter-spacing: 0.44px;
  text-transform: uppercase;
  margin: 48px 0 24px;
  @media (max-width: 1000px) {
    margin: 30px 0 12px;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 118%;
    letter-spacing: 0.36px;
  }
`;

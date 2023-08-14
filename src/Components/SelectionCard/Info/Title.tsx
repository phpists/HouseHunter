import { styled } from "styled-components";

interface Props {
  title: string;
}

export const Title = ({ title }: Props) => <StyledTitle>{title}</StyledTitle>;

const StyledTitle = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%; /* 26px */
  letter-spacing: 0.4px;
  text-transform: uppercase;
  margin: 0 0 16px;
`;

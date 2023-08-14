import { styled } from "styled-components";

interface Props {
  title: string;
}
export const Title = ({ title }: Props) => <StyledTitle>{title}</StyledTitle>;

const StyledTitle = styled.div`
  font-size: 26px;
  font-style: normal;
  font-weight: 500;
  line-height: 118%;
  letter-spacing: 0.52px;
  text-transform: uppercase;
  margin-bottom: 12px;
  @media (max-width: 1000px) {
    font-size: 20px;
    margin-bottom: 10px;
    font-family: "Overpass", sans-serif;
  }
`;

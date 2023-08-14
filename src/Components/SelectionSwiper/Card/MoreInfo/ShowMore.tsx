import { styled } from "styled-components";

interface Props {
  title: string;
  onClick: () => void;
}

export const ShowMore = ({ title, onClick }: Props) => (
  <StyledShowMore onClick={onClick}>{title}</StyledShowMore>
);

const StyledShowMore = styled.div`
  font-family: "Overpass", sans-serif;
  color: #81fb21;
  font-size: 15px;
  font-style: normal;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  cursor: pointer;
  text-decoration: underline;
`;

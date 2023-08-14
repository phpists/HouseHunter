import { styled } from "styled-components";

interface Props {
  title: string;
  onClick: () => void;
}

export const ShowMore = ({ title, onClick }: Props) => (
  <StyledShowMore onClick={onClick}>{title}</StyledShowMore>
);

const StyledShowMore = styled.div`
  color: #81fb21;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  cursor: pointer;
  text-decoration: underline;
`;

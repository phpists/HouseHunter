import { styled } from "styled-components";

interface Props {
  title: string;
}
export const Title = ({ title }: Props) => <StyledTitle>{title}</StyledTitle>;

const StyledTitle = styled.div`
  font-size: 20px;
  font-style: normal;
  line-height: 150%;
  letter-spacing: 0.52px;
  text-transform: uppercase;
  font-family: "Overpass", sans-serif;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

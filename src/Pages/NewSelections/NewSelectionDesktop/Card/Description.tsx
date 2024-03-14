import styled from "styled-components";

interface Props {
  description: string;
}

export const Description = ({ description }: Props) => (
  <StyledDescription className="hide-scroll">{description}</StyledDescription>
);

const StyledDescription = styled.div`
  font-family: Overpass, sans-serif;
  font-size: 15px;
  font-weight: 100;
  line-height: 18px;
  letter-spacing: 0.02em;
  text-align: left;
  color: #ffffff;
  opacity: 0.4;
  min-height: 200px;
  max-height: 40vh;
  overflow: auto;
`;

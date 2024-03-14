import styled from "styled-components";

interface Props {
  category: string;
}

export const Tag = ({ category }: Props) => <StyledTag>{category} </StyledTag>;

const StyledTag = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  font-family: Overpass;
  font-size: 15px;
  font-weight: 300;
  line-height: 19px;
  letter-spacing: 0.02em;
  text-align: left;
  z-index: 4;
  background: #2c2c2c80;
  height: 24px;
  padding: 3px 6px 2px 6px;
  border-radius: 5px;
  border: solid 1px #ffffff26;
  backdrop-filter: blur(18px);
`;

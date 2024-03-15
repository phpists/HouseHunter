import styled from "styled-components";

interface Props {
  title: string;
}

export const Title = ({ title }: Props) => <StyledTitle>{title}</StyledTitle>;

const StyledTitle = styled.div`
  font-family: Overpass;
  font-size: 20px;
  font-weight: 300;
  line-height: 26px;
  letter-spacing: 0.02em;
  text-align: left;
  color: #ffffff;
  margin-bottom: 14px;
  text-transform: uppercase;
  word-break: break-all;
  white-space: pre-wrap;
`;

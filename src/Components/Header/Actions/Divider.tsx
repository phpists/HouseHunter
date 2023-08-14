import { styled } from "styled-components";

export const Divider = () => <StyledDivider />;

const StyledDivider = styled.div`
  width: 1px;
  height: 38px;
  flex-shrink: 0;
  opacity: 0.14;
  background: #fff;
  margin: 0 18px;
  @media (max-width: 1000px) {
    display: none;
  }
`;

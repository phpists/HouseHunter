import { styled } from "styled-components";

export const Divider = () => <StyledDivider />;

const StyledDivider = styled.div`
  width: 1px;
  height: 16px;
  flex-shrink: 0;
  border-radius: 10px;
  opacity: 0.32;
  background: #fff;
  margin: 0 12px;
`;

import { styled } from "styled-components";

export const Badge = () => <StyledBadge className="badge" />;

const StyledBadge = styled.div`
  position: absolute;
  top: 8px;
  right: 7px;
  width: 10px;
  height: 10px;
  background: #5d63ff;
  border-radius: 100%;
  border: 1.2px solid #676767;
  flex-shrink: 0;
  div {
    height: 11px;
  }
  @media (max-width: 1000px) {
    border: 1.2px solid #454545;
  }
`;

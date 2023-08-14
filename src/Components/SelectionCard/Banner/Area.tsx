import { styled } from "styled-components";

interface Props {
  area: number | string;
  onOpen: () => void;
}

export const Area = ({ area, onOpen }: Props) => (
  <StyledArea onClick={onOpen}>{area} м²</StyledArea>
);

const StyledArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: 118%;
  letter-spacing: 0.4px;
  background: #2c2c2c;
  z-index: 4;
  padding: 6px 0 2px;
  color: rgba(255, 255, 255, 0.4);
  &:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-left: 35px solid transparent;
    border-right: 35px solid transparent;
    border-top: 35px solid #2c2c2c;
    right: -35px;
    z-index: -1;
    top: -2.2px;
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;

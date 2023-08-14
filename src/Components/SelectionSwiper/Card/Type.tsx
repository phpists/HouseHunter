import { styled } from "styled-components";

interface Props {
  type: string;
  className?: string;
}

export const Type = ({ type, className }: Props) => (
  <StyledType className={`${className}`}>{type}</StyledType>
);

const StyledType = styled.div`
  position: absolute;
  top: 18px;
  right: 18px;
  border-radius: 22px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(12.5px);
  font-size: 12px;
  font-style: normal;
  line-height: 118%;
  letter-spacing: 0.24px;
  text-transform: uppercase;
  z-index: 4;
  padding: 5px 7px 2px;
  z-index: 400;
  @media (max-width: 1000px) {
    backdrop-filter: none;
  }
`;

import { styled } from "styled-components";

interface Props {
  active: boolean;
  title: string;
  onClick: () => void;
}

export const Currency = ({ active, title, onClick }: Props) => (
  <StyledCurrency
    active={active}
    onClick={onClick}
    className="flex items-center justify-center "
  >
    <div className="">{title}</div>
  </StyledCurrency>
);

interface StyledCurrencyProps {
  active: boolean;
}

const StyledCurrency = styled.div<StyledCurrencyProps>`
  margin-left: 10px;
  width: 28px;
  height: 27px;
  border-radius: 7px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  flex-shrink: 0;
  cursor: pointer;
  div {
    height: 13px;
  }
  ${({ active }) =>
    active &&
    `
    border: 1px solid rgba(255, 255, 255, 0.30);
    background: #FFF;
    color: #2C2C2C;
  `}
`;

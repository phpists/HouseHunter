import { styled } from "styled-components";
import { Text } from "./Text";

interface Props {
  options: { symbol: string; title: string }[];
  activeSymbol: string;
  onChange: (index: number) => void;
}

export const Dropdown = ({ options, activeSymbol, onChange }: Props) => (
  <StyledDropdown className="dropdown">
    {options.map((opt, i) => (
      <div
        key={i}
        className={`option flex items-center justify-center ${
          activeSymbol === opt.symbol && "active"
        }`}
        onClick={() => onChange(i)}
      >
        <Text symbol={opt.symbol} title={opt.title} />
      </div>
    ))}
  </StyledDropdown>
);

const StyledDropdown = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  width: 100%;
  .option {
    width: 100%;
    background: #000;
    height: 38px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.14);
    &:first-child {
      border-radius: 8px 8px 0 0;
    }
    &:last-child {
      border-radius: 0 0 8px 8px;
      border: none;
    }
    &:hover,
    &.active {
      background: #fff;
    }
    &:hover > div,
    &.active > div {
      color: #000 !important;
    }
  }
`;

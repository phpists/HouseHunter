import { styled } from "styled-components";
import { Currency } from "./Currency";

interface Props {
  open: boolean;
  options: { symbol: string; title: string }[];
  activeCurrency: string;
  onSelectCurrency: (value: string) => void;
}

export const CurrencyList = ({
  open,
  options,
  activeCurrency,
  onSelectCurrency,
}: Props) => (
  <StyledCurrencyList className="flex items-center " open={open}>
    {options.map((opt, i) => (
      <Currency
        key={i}
        title={opt.symbol}
        active={activeCurrency === opt.title}
        onClick={() => onSelectCurrency(opt.title)}
      />
    ))}
  </StyledCurrencyList>
);

interface StyledCurrencyListProps {
  open: boolean;
}

const StyledCurrencyList = styled.div<StyledCurrencyListProps>`
  opacity: 0;
  visibility: 0;
  overflow: hidden;
  width: 0;
  transition: all 0.3s;
  ${({ open }) =>
    open &&
    `
        width: 120px;
        opacity: 1;
        visibility: visible;
    `}
`;

import { styled } from "styled-components";
import { Active } from "./Active";
import { useRef } from "react";
import { Dropdown } from "./Dropdown";
import { currencies } from "../../../../constants/currency";

interface Props {
  currency: string;
  onChangeCurrency: (value: string) => void;
}

export const Currency = ({ currency, onChangeCurrency }: Props) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const active = currencies.find((c) => c.title === currency);

  const handleChangeActive = (index: number) => {
    onChangeCurrency(currencies[index].title);
    btnRef.current && btnRef.current.blur();
  };

  return (
    <StyledCurrency ref={btnRef}>
      <Active data={active} />
      <Dropdown
        options={currencies}
        activeSymbol={active?.symbol ?? ""}
        onChange={handleChangeActive}
      />
    </StyledCurrency>
  );
};

const StyledCurrency = styled.button`
  position: relative;
  margin-right: 18px;
  z-index: 10;
  .dropdown {
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
  }
  &:focus {
    .dropdown {
      opacity: 1;
      visibility: visible;
    }
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;

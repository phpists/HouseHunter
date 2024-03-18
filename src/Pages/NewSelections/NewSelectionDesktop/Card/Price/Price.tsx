import { styled } from "styled-components";
import { useState } from "react";
import { CurrencyList } from "./CurrencyList";
import { Button } from "./Button";
import { currencies } from "../../../../../constants/currency";

interface Props {
  currency: string;
  onChangeCurrency: (value: string) => void;
  price: number;
}

export const Price = ({ currency, onChangeCurrency, price }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleChangeCurrency = (value: string) => {
    onChangeCurrency(value);
    setOpen(false);
  };

  return (
    <>
      <StyledPrice className="flex items-center ">
        <Button
          price={price}
          open={open}
          onToggleOpen={() => setOpen(!open)}
          activeCurrency={
            currencies.find((c) => c.title === currency)?.symbol ?? ""
          }
        />
        <CurrencyList
          open={open}
          options={currencies}
          activeCurrency={currency}
          onSelectCurrency={handleChangeCurrency}
        />
      </StyledPrice>
    </>
  );
};

const StyledPrice = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  color: #81fb21;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.36px;
  z-index: 500;
`;

import { styled } from "styled-components";
import { useState } from "react";
import { CurrencyList } from "./CurrencyList";
import { Button } from "./Button";
import { currencies } from "../../../../constants/currency";
import { BackButton } from "../../../BackButton";

interface Props {
  currency: string;
  onChangeCurrency: (value: string) => void;
  price: number;
  onClose?: () => void;
}

export const Price = ({
  currency,
  onChangeCurrency,
  price,
  onClose,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleChangeCurrency = (value: string) => {
    onChangeCurrency(value);
    setOpen(false);
  };

  return (
    <>
      <StyledPrice className="flex items-center ">
        {onClose && <BackButton onClick={onClose} classes="back-btn" />}
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
  top: 15px;
  left: 15px;
  color: #81fb21;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.36px;
  z-index: 500;
  .back-btn {
    margin-right: 20px;
  }
`;

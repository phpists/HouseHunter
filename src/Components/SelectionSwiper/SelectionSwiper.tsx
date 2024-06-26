import { styled } from "styled-components";
import { Footer } from "./Footer/Footer";
import { Cards } from "./Cards";
import { useState } from "react";

interface Props {
  cards: any[];
  onSwap: (index: number, direction: string, id: string, type: string) => void;
  history?: boolean;
  onSendRealtor: (type: string, id: string) => void;
  currency: string;
  onChangeCurrency: (value: string) => void;
  disabled?: boolean;
  onClose?: () => void;
  phonesCodes?: any;
  onNavigate?: (prev?: boolean) => void;
}

export const SelectionSwiper = ({
  cards,
  onSwap,
  history,
  onSendRealtor,
  currency,
  onChangeCurrency,
  disabled,
  onClose,
  phonesCodes,
  onNavigate,
}: Props) => {
  const [cardStatusChanged, setCardStatusChanged] = useState<null | string>(
    null
  );

  const handleChangeCardStatus = (
    index: number,
    value: string | null,
    id: string,
    type: string
  ) => {
    if (!cardStatusChanged) {
      setCardStatusChanged(value);
      if (value) {
        if (history) {
          onSwap(index, value, id, type);
          setTimeout(() => {
            setCardStatusChanged(null);
          }, 3000);
        } else {
          setTimeout(() => {
            onSwap(index, value, id, type);
            setCardStatusChanged(null);
          }, 400);
        }
      }
    }
  };

  return (
    <StyledSelectionSwiper
      className="flex flex-col justify-between"
      history={!!history}
    >
      <Cards
        cards={cards}
        history={history}
        cardStatusChanged={cardStatusChanged}
        onChangeStatus={handleChangeCardStatus}
        onSendRealtor={onSendRealtor}
        currency={currency}
        onChangeCurrency={onChangeCurrency}
        onClose={onClose}
        disabled={disabled}
        phonesCodes={phonesCodes}
      />
      {onNavigate ? <Footer onNavigate={onNavigate} /> : null}
    </StyledSelectionSwiper>
  );
};

interface StyledSelectionSwiperProps {
  history: boolean;
}

const StyledSelectionSwiper = styled.div<StyledSelectionSwiperProps>`
  ${({ history }) => !history && "padding: 15px 0;"}
  @media (min-width: 1000px) {
    display: none;
  }
`;

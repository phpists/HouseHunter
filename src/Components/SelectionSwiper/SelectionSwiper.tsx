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
  rieltor: { name: string; photo: string | undefined; phone: any };
  view?: boolean;
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
  rieltor,
  view,
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
        if (view) {
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

  const handleSendRealtor = () => {
    if (cards.length > 0) {
      const type = cards[0]?.type ?? "";
      const id = cards[0]?.id ?? "";

      onSendRealtor(type, id);
    }
  };

  const handleChangeStatusFooter = (direction: string | null) => {
    if (cards.length > 0) {
      const type = cards[0]?.type ?? "";
      const id = cards[0]?.id ?? "";

      handleChangeCardStatus(0, direction, id, type);
    }
  };

  return (
    <StyledSelectionSwiper
      className="flex flex-col justify-between"
      history={!!history}
      view={view}
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
        rieltor={rieltor}
        view={view}
      />
      {!history && (
        <Footer
          onChangeStatus={handleChangeStatusFooter}
          onSendRealtor={handleSendRealtor}
          disabled={disabled || !!cardStatusChanged}
        />
      )}
    </StyledSelectionSwiper>
  );
};

interface StyledSelectionSwiperProps {
  history: boolean;
  view?: boolean;
}

const StyledSelectionSwiper = styled.div<StyledSelectionSwiperProps>`
  ${({ view }) => (view ? "padding: 140px 0 15px;" : "padding: 15px 0;")}
  @media (min-width: 1000px) {
    display: none;
  }
`;

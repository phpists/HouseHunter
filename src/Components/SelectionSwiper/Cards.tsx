import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Card } from "./Card/Card";
import { Empty } from "../Swaper/Empty";
import { Animation } from "./Animation";
import { getLocation } from "../../helpers";
import { MoreInfo } from "./Card/MoreInfo/MoreInfo";
import noPhoto from "../../assets/images/no-photo.svg";
import { CardList } from "./CardList";

interface Props {
  cards: any[];
  history?: boolean;
  cardStatusChanged: null | string;
  onChangeStatus: (
    index: number,
    direction: string | null,
    id: string,
    type: string
  ) => void;
  onSendRealtor: (type: string, id: string) => void;
  currency: string;
  onChangeCurrency: (value: string) => void;
  onClose?: () => void;
}

export const Cards = ({
  cards,
  history,
  cardStatusChanged,
  onChangeStatus,
  onSendRealtor,
  currency,
  onChangeCurrency,
  onClose,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setLoading(true);
    setData(cards?.slice(cards.length - 3, cards.length) ?? []);
    setTimeout(() => setLoading(false), 100);
  }, [cards]);

  return (
    <>
      {history ? (
        <MoreInfo
          type={cards[0]?.type ?? ""}
          price={cards[0]?.price ? cards[0]?.price[currency] : 0}
          currency={currency}
          location={getLocation(cards[0]?.location)}
          doors={"-"}
          area={"-"}
          stairs="- із -"
          box="-"
          title={cards[0]?.title}
          description={cards[0]?.description}
          index={10}
          onClose={() => (onClose ? onClose() : null)}
          images={
            cards[0]?.image_url?.length > 0 ? cards[0]?.image_url : [noPhoto]
          }
          onChangeStatus={(direction) =>
            onChangeStatus(0, direction, cards[0]?.id_object, cards[0]?.type)
          }
          onSendRealtor={() =>
            onSendRealtor(cards[0]?.type, cards[0]?.id_object)
          }
        />
      ) : (
        <StyledCards
          className={`flex items-center justify-center `}
          isEmpty={cards.length === 0}
        >
          {cardStatusChanged && history && (
            <Animation status={cardStatusChanged} />
          )}

          <CardList
            cards={data}
            history={history}
            cardStatusChanged={cardStatusChanged}
            onChangeStatus={onChangeStatus}
            onSendRealtor={onSendRealtor}
            currency={currency}
            onChangeCurrency={onChangeCurrency}
            onClose={onClose}
            loading={loading}
          />
        </StyledCards>
      )}
    </>
  );
};

interface StyledCardsProps {
  isEmpty: boolean;
}

const StyledCards = styled.div<StyledCardsProps>`
  height: calc(100vh - 320px);
  width: 100%;
  margin-bottom: 15px;
  border-radius: 13px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  overflow-x: hidden;
  ${({ isEmpty }) =>
    isEmpty &&
    `
  border: 1px dashed rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.3);
  `}
  ::-webkit-scrollbar {
    display: none;
  }
  &.loading-cards {
    opacity: 0;
  }
`;

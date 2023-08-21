import { SelectionSwiper } from "../../Components/SelectionSwiper/SelectionSwiper";
import { NewSelectionDesktop } from "./NewSelectionDesktop/NewSelectionDesktop";
import { useEffect, useState, useRef } from "react";
import { getNewSelections, rate } from "../../api/methods";
import { Spinner } from "../../Components/Spinner";
import { removeDublicats } from "../../helpers";

interface Props {
  onOpenInfo: (card: any) => void;
  onSendRealtor: (type: string, id: string) => void;
  currency: string;
  onChangeCurrency: (value: string) => void;
}

export const NewSelections = ({
  onOpenInfo,
  onSendRealtor,
  currency,
  onChangeCurrency,
}: Props) => {
  const isLastPage = useRef<boolean>(false);
  const [cards, setCards] = useState<any[]>([]);
  const cardsData = useRef<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const isFirstRender = useRef(true);
  const removed = useRef<any>([]);

  const handleGetSelections = (perPage?: number, isMore?: boolean) => {
    setLoading(!isMore);
    getNewSelections(0, perPage).then((resp: any) => {
      const data = resp?.data?.data;
      const totalPage = resp?.data?.pages_count ?? 1;
      setLoading(false);
      isLastPage.current = totalPage === 1;
      if (data) {
        const updatedData = removeDublicats([...cardsData.current, ...data]);
        cardsData.current = updatedData;
        setCards(updatedData);
      }
    });
  };

  const handleSwap = (
    index: number,
    direction: string,
    id: string,
    type: string,
    notRemove?: boolean
  ) => {
    if (!notRemove) {
      const prevCards = [...cardsData.current];
      const updatedCards = [...cardsData.current].filter(
        (card, i) => card.id_object !== id
      );
      setCards(updatedCards);
      cardsData.current = updatedCards;
      rate(direction === "right" ? 1 : 0, id, type).then(
        (errorCode: number) => {
          if (errorCode !== 0) {
            setCards(prevCards);
            cardsData.current = prevCards;
          }
          if (cardsData.current.length <= 10 && !isLastPage.current) {
            setTimeout(() => handleGetSelections(20, true), 400);
          }
        }
      );
    } else {
      removed.current = [...removed.current, id];
      rate(direction === "right" ? 1 : 0, id, type).then(() => {
        if (
          removed.current.length >= 15 ||
          (cardsData.current.length <= 10 && !isLastPage.current)
        ) {
          const updatedCards = [...cardsData.current].filter(
            (card, i) =>
              !removed.current.find((id: any) => card.id_object === id)
          );
          setCards(updatedCards);
          cardsData.current = updatedCards;
          removed.current = [];
          setTimeout(() => handleGetSelections(20, true), 400);
        }
      });
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      handleGetSelections(20);
    }
  }, []);

  return (
    <>
      {loading ? (
        <Spinner className="empty-title" />
      ) : (
        <>
          <NewSelectionDesktop
            cards={cards}
            onOpenInfo={onOpenInfo}
            onSendRealtor={onSendRealtor}
            currency={currency}
            onSwap={(index, direction, id, type) =>
              handleSwap(index, direction, id, type, true)
            }
          />
          <SelectionSwiper
            cards={[...cards].reverse()}
            onSwap={handleSwap}
            onSendRealtor={onSendRealtor}
            currency={currency}
            onChangeCurrency={onChangeCurrency}
            disabled={loading}
          />
        </>
      )}
    </>
  );
};

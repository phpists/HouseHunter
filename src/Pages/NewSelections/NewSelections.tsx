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
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [cards, setCards] = useState<any[]>([]);
  const cardsData = useRef<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const isFirstRender = useRef(true);
  const removed = useRef<any>([]);

  const handleGetSelections = (perPage?: number) => {
    setLoading(true);
    getNewSelections(currentPage, perPage).then((resp: any) => {
      const data = resp?.data?.data;
      setLoading(false);
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
      const updatedCards = [...cardsData.current].filter(
        (card, i) => card.id_object !== id
      );
      setCards(updatedCards);
      cardsData.current = updatedCards;
      rate(direction === "right" ? 1 : 0, id, type).then(() => {
        if (updatedCards.length <= 10) {
          handleGetSelections(20);
        }
      });
    } else {
      removed.current = [...removed.current, id];
      rate(direction === "right" ? 1 : 0, id, type).then(() => {
        if (removed.current.length >= 15 || cardsData.current.length <= 10) {
          const updatedCards = [...cardsData.current].filter(
            (card, i) =>
              !removed.current.find((id: any) => card.id_object === id)
          );
          setCards(updatedCards);
          cardsData.current = updatedCards;
          removed.current = [];
          handleGetSelections(20);
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

  console.log(cards);
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

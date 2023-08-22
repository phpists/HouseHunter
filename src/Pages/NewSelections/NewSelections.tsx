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
  const [rating, setRating] = useState<boolean>(false);
  const isFirstRender = useRef(true);
  const [removed, setRemoved] = useState<any[]>([]);
  const removedData = useRef<any>([]);

  const handleGetSelections = (perPage?: number, isMore?: boolean) => {
    setLoading(!isMore);
    getNewSelections(0, perPage).then((resp: any) => {
      const data = resp?.data?.data;
      const totalPage = resp?.data?.pages_count ?? 1;
      setLoading(false);
      isLastPage.current = totalPage === 1;
      if (data) {
        const updatedData = removeDublicats([...cardsData.current, ...data]);
        console.log(updatedData);
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
    console.log("here 1");
    if (!notRemove) {
      setRating(true);
      console.log("here 2");
      rate(direction === "right" ? 1 : 0, id, type).then(
        (errorCode: number) => {
          console.log("here 3");
          setRating(false);
          if (errorCode === 0) {
            const updatedCards = [...cardsData.current].filter(
              (card, i) => card.id_object !== id
            );
            setCards(updatedCards);
            cardsData.current = updatedCards;
          }
          if (cardsData.current.length <= 10 && !isLastPage.current) {
            setTimeout(() => handleGetSelections(20, true), 400);
          }
        }
      );
    } else {
      console.log("here 4");
      setRemoved([...removedData.current, id]);
      removedData.current = [...removedData.current, id];
      rate(direction === "right" ? 1 : 0, id, type).then(() => {
        if (
          removedData.current.length >= 15 ||
          (cardsData.current.length <= 10 && !isLastPage.current) ||
          cardsData.current.length === removedData.current.length
        ) {
          const updatedCards = [...cardsData.current].filter(
            (card, i) =>
              !removedData.current.find((id: any) => card.id_object === id)
          );
          setCards(updatedCards);
          cardsData.current = updatedCards;
          removedData.current = [];
          setRemoved([]);
          handleGetSelections(20, true);
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
            removed={removed}
          />
          <SelectionSwiper
            cards={cards}
            onSwap={handleSwap}
            onSendRealtor={onSendRealtor}
            currency={currency}
            onChangeCurrency={onChangeCurrency}
            disabled={loading || rating}
          />
        </>
      )}
    </>
  );
};

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
  rieltor: { name: string; photo: string | undefined; phone: any };
  appendObjectToList: any;
}

export const NewSelections = ({
  onOpenInfo,
  onSendRealtor,
  currency,
  onChangeCurrency,
  rieltor,
  appendObjectToList,
}: Props) => {
  const isLastPage = useRef<boolean>(false);
  const [cards, setCards] = useState<any[]>([]);
  const cardsData = useRef<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const isLoading = useRef<boolean>(false);
  const [rating, setRating] = useState<boolean>(false);
  const isFirstRender = useRef(true);
  const [removed, setRemoved] = useState<any[]>([]);
  const removedData = useRef<any>([]);
  const removedBeforeData = useRef<any>([]);

  const handleGetSelections = (perPage?: number, isMore?: boolean) => {
    if (!isLastPage.current && !isLoading.current) {
      setLoading(!isMore);
      setLoadingMore(!!isMore);
      isLoading.current = true;
      getNewSelections(0, perPage).then((resp: any) => {
        const data = resp?.data?.data;
        const totalPage = Math.ceil(Number(resp?.data?.all_item) / 20) ?? 1;
        setLoading(false);
        setLoadingMore(false);
        isLoading.current = false;
        isLastPage.current = totalPage === 1;
        if (data) {
          let updatedData = removeDublicats([...cardsData.current, ...data]);
          updatedData = updatedData.filter(
            (item: any) =>
              !removedBeforeData.current.find((id: any) => id === item.id)
          );
          cardsData.current = updatedData;
          setCards(updatedData);
        }
      });
    }
  };

  const handleSwap = (
    index: number,
    direction: string,
    id: string,
    type: string,
    notRemove?: boolean
  ) => {
    if (!notRemove) {
      setRating(true);
      rate(direction === "right" ? 1 : 0, id, type).then(
        (errorCode: number) => {
          setRating(false);
          if (errorCode === 0) {
            const updatedCards = [...cardsData.current].filter(
              (card, i) => card.id !== id
            );
            setCards(updatedCards);
            cardsData.current = updatedCards;
          }
          if (
            cardsData.current.length <= 10 &&
            !isLastPage.current &&
            !isLoading.current
          ) {
            setTimeout(() => handleGetSelections(20, true), 400);
          }
        }
      );
    } else {
      setRating(true);
      setRemoved([...removedData.current, id]);
      removedData.current = [...removedData.current, id];
      rate(direction === "right" ? 1 : 0, id, type).then(() => {
        setRating(false);
        if (
          removedData.current.length >= 15 ||
          (cardsData.current.length <= 10 && !isLastPage.current) ||
          (cardsData.current.length === removedData.current.length &&
            !isLoading.current)
        ) {
          const updatedCards = [...cardsData.current].filter(
            (card, i) => !removedData.current.find((id: any) => card.id === id)
          );
          setCards(updatedCards);
          removedBeforeData.current = [
            ...removedBeforeData.current,
            ...removedData.current,
          ];
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

  useEffect(() => {
    if (appendObjectToList) {
      const filteredCards = cardsData.current
        ? cardsData.current.filter(
            (card: any) => card.id !== appendObjectToList.id
          )
        : [];
      cardsData.current = [appendObjectToList, ...filteredCards];
      setCards(cardsData.current);
    }
  }, [appendObjectToList]);

  return (
    <>
      {loading ? (
        <Spinner className="empty-title" />
      ) : (
        <>
          <NewSelectionDesktop
            cards={cards.filter(
              (c: any) => !removed?.find((r: any) => r === c?.id)
            )}
            onOpenInfo={onOpenInfo}
            onSendRealtor={onSendRealtor}
            onSwap={(index, direction, id, type) =>
              handleSwap(index, direction, id, type, true)
            }
            removed={removed}
            rating={false}
            loadingMore={loadingMore}
            currency={currency}
            onChangeCurrency={onChangeCurrency}
          />
          <SelectionSwiper
            cards={cards}
            onSwap={handleSwap}
            onSendRealtor={onSendRealtor}
            currency={currency}
            onChangeCurrency={onChangeCurrency}
            disabled={loading || rating}
            rieltor={rieltor}
          />
        </>
      )}
    </>
  );
};

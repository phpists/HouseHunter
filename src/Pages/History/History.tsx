import { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import { SelectionCard } from "../../Components/SelectionCard/SelectionCard";
import { getHistory, rate } from "../../api/methods";
import { getLocation } from "../../helpers";
import { Spinner } from "../../Components/Spinner";

interface Props {
  onOpenInfo: (card: any) => void;
  currency: string;
  onSendRealtor: (type: string, id: string) => void;
  filterLiked: boolean;
}

export const History = ({
  onOpenInfo,
  currency,
  onSendRealtor,
  filterLiked,
}: Props) => {
  const currentPage = useRef<number>(1);
  const [cards, setCards] = useState<any>(null);
  const cardsData = useRef<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const isLoading = useRef(false);
  const [totalPages, setTotalPages] = useState<number>(10);
  const isFirstRender = useRef(true);

  const handleGetHistory = () => {
    if (!loading && totalPages >= currentPage.current) {
      getHistory(currentPage.current, filterLiked ? 1 : undefined)
        .then((resp: any) => {
          const data = resp?.data?.data;
          const pagesCount = resp?.data?.pages_count;
          setTotalPages(pagesCount);
          currentPage.current = currentPage.current + 1;
          if (data) {
            const updatedCards = cardsData.current
              ? [...cardsData.current, ...data]
              : [...data];
            cardsData.current = updatedCards;
            setCards(updatedCards);
            setLoading(false);
            isLoading.current = false;
          } else {
            cardsData.current = [];
            setCards([]);
          }
        })
        .catch(() => {
          cardsData.current = [];
          setCards([]);
        });
    } else if (totalPages < currentPage.current) {
      setLoading(false);
      isLoading.current = false;
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop <=
        document.documentElement.offsetHeight - 400 ||
      isLoading.current
    ) {
      return;
    }
    setLoading(true);
    isLoading.current = true;
    handleGetHistory();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, filterLiked]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      handleGetHistory();
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    cardsData.current = null;
    setCards(null);
    currentPage.current = 1;
    handleGetHistory();
  }, [filterLiked]);

  const handleSwap = (
    index: number,
    direction: string,
    id: string,
    type: string,
    notRemove?: boolean
  ) => {
    rate(direction === "right" ? 1 : 0, id, type).then(() => {
      const updatedData = cardsData.current.map((card: any) =>
        card?.id_object === id
          ? { ...card, like: direction === "right" ? 1 : 0 }
          : card
      );

      setCards(updatedData);
      cardsData.current = updatedData;
    });
  };

  console.log(cards);
  return (
    <>
      <StyledHistory className="content" isCards={!!cards}>
        {!cards ? (
          <Spinner className="main-spinner" />
        ) : cards?.length > 0 ? (
          cards?.map((card: any, i: number) => (
            <SelectionCard
              key={i}
              onOpen={() => onOpenInfo(card)}
              area={"-"}
              currency={currency}
              price={card?.price ? card?.price[currency] : 0}
              title={card?.title ?? ""}
              location={getLocation(card?.location)}
              doors={"-"}
              stairs="- із -"
              description={card?.description ?? ""}
              images={card?.image_url ?? []}
              onSendRealtor={() => onSendRealtor(card?.type, card?.id_object)}
              onSwap={(direction) =>
                handleSwap(i, direction, card?.id_object, card?.type)
              }
              noAnimation
              like={card?.like === 1}
            />
          ))
        ) : (
          <div className="empty-title">Пусто</div>
        )}
      </StyledHistory>
      {loading && cards && (
        <div className="flex items-center justify-center my-2 mb-3">
          <Spinner className="spinner" />
        </div>
      )}
    </>
  );
};

interface StyledHistoryProps {
  isCards: boolean;
}

const StyledHistory = styled.div<StyledHistoryProps>`
  margin: 50px 0;
  display: grid;
  grid-template-columns: repeat(4, calc((98% - (12px * 3)) / 4));
  gap: 24px 30px;
  grid-auto-rows: max-content;
  justify-content: center;
  .chat-card {
    grid-column: 3/4;
    grid-row: 1/3;
    display: none;
  }
  .main-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      height: 50px;
    }
  }
  .spinner-wrapper {
    height: 40px;
  }
  .spinner {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, calc((98% - (24px * 2)) / 3));
  }
  @media (min-width: 1000px) {
    grid-template-columns: repeat(3, calc((98% - 24px) / 3));
    .chat-card {
      display: block;
    }
  }
  @media (min-width: 1400px) {
    grid-template-columns: repeat(4, calc((1400px - (24px * 3)) / 4));
    .chat-card {
      grid-column: 4/5;
      grid-row: 1/3;
    }
  }
  @media (max-width: 1000px) {
    margin: 15px 0 100px;
    border-radius: 13px;
    background: rgba(255, 255, 255, 0.12);
    ${({ isCards }) => isCards && "padding: 10px;"}
    gap: 20px 12px;
    grid-template-columns: repeat(3, calc((98% - 12px) / 3));
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(2, calc((98% - 12px) / 2));
  }
  @media (max-width: 320px) {
    grid-template-columns: repeat(1, 98%);
  }
`;

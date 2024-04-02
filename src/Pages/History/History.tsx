// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import { SelectionCard } from "../../Components/SelectionCard/SelectionCard";
import { getHistory, rate } from "../../api/methods";
import { getLocation, removeDublicats } from "../../helpers";
import { Spinner } from "../../Components/Spinner";

interface Props {
  onOpenInfo: (card: any) => void;
  currency: string;
  onSendRealtor: (type: string, id: string) => void;
  filterLiked: boolean;
  infoOpen: boolean;
  appendObjectToList: any;
}

export const History = ({
  onOpenInfo,
  currency,
  onSendRealtor,
  filterLiked,
  infoOpen,
  appendObjectToList,
}: Props) => {
  const currentPage = useRef<number>(0);
  const [cards, setCards] = useState<any>(null);
  const cardsData = useRef<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const isLoading = useRef(false);
  const [totalPages, setTotalPages] = useState<number>(3);
  const isFirstRender = useRef(true);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const historyRef = useRef<HTMLDivElement>(null);
  const scrolledTop = useRef<null | number>(null);

  const handleGetHistory = (cleanPrevData?: boolean) => {
    if (!loading && totalPages >= currentPage.current) {
      getHistory(currentPage.current, filterLiked ? 1 : undefined)
        .then((resp: any) => {
          const data = resp?.data?.data;
          const pagesCount = resp?.data?.pages_count;
          setTotalPages(Math.ceil(Number(resp?.data?.all_item) / 20));
          currentPage.current = currentPage.current + 1;
          isFirstRender.current = false;
          if (data && cleanPrevData) {
            setCards(data);
            cardsData.current = data;
            setTimeout(() => {
              setIsFiltered(filterLiked);
            }, 1000);
          } else if (data) {
            const updatedCards = cardsData.current
              ? removeDublicats([...cardsData.current, ...data])
              : [...data];
            cardsData.current = updatedCards;
            setCards(updatedCards);
            setLoading(false);
            isLoading.current = false;
          } else if (cardsData.current.length > 0) {
            setLoading(false);
            isLoading.current = false;
            setTotalPages(1);
          } else {
            cardsData.current = [];
            setCards([]);
          }
        })
        .catch(() => {
          cardsData.current = [];
          setCards([]);
        });
    } else {
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
    if (cards) {
      currentPage.current = 0;
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      filterLiked && setIsFiltered(true);
    }
  }, [filterLiked]);

  const handleSwap = (
    index: number,
    direction: string,
    id: string,
    type: string,
    notRemove?: boolean,
    onSuccess?: () => void
  ) => {
    rate(direction === "right" ? 1 : 0, id, type).then((resp) => {
      if (resp === 0) {
        const updatedData = cardsData.current.map((card: any) =>
          card?.id === id
            ? { ...card, like: direction === "right" ? 1 : 0 }
            : card
        );
        setCards(updatedData);
        cardsData.current = updatedData;
        onSuccess && onSuccess();
      }
    });
  };

  const handleOpenInfo = (card: any, i: number) => {
    scrolledTop.current = window.scrollY;
    onOpenInfo({
      ...card,
      history: true,
      handleSwap: (direction, onSuccess) =>
        handleSwap(i, direction, card?.id, card?.type, undefined, onSuccess),
    });
  };

  useEffect(() => {
    if (!infoOpen && scrolledTop.current) {
      window.scrollTo({
        top: scrolledTop.current,
        left: 0,
      });
      scrolledTop.current = null;
    }
  }, [infoOpen]);

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
      <StyledHistory className="content" isCards={!!cards} ref={historyRef}>
        {!cards ? (
          <Spinner className="main-spinner" />
        ) : cards?.length > 0 ? (
          cards?.map((card: any, i: number) => (
            <SelectionCard
              //   key={i}
              onOpen={() => handleOpenInfo(card, i)}
              area={card?.area_total ?? "-"}
              currency={currency}
              price={card?.[`price_per_object_${currency?.toLowerCase()}`] ?? 0}
              title={card?.title ?? ""}
              location={card?.location_name}
              doors={card?.rooms ?? "-"}
              stairs={`${card?.address_apartment_number ?? "-"} із ${
                card?.address_storey ?? "-"
              }`}
              description={card?.description ?? ""}
              images={
                card?.img?.length > 0 ? card?.img?.map((i: any) => i?.name) : []
              }
              onSendRealtor={() => onSendRealtor(card?.type, card?.id)}
              onSwap={(direction) =>
                handleSwap(i, direction, card?.id, card?.type)
              }
              noAnimation
              like={card?.like}
              isHide={filterLiked && !card?.like}
              tag={card?.tags?.length > 0 ? card?.tags : null}
              category={card?.rubric_name}
              tags={card?.tags_folder}
            />
          ))
        ) : (
          <div className="empty-title">Пусто</div>
        )}
      </StyledHistory>
      {loading && cards && (
        <div className="flex items-center justify-center my-1 mb-16 spinner-more">
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
  display: flex;
  flex-wrap: wrap;
  display: grid;
  grid-template-columns: repeat(4, calc((98% - (12px * 3)) / 4));
  gap: 24px 30px;
  grid-auto-rows: max-content;
  justify-content: center;
  transition: all 0.3s;
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
    grid-template-columns: repeat(3, calc((98% - (30px * 2)) / 3));
  }
  @media (min-width: 1000px) {
    grid-template-columns: repeat(3, calc((98% - 30px) / 3));
    .chat-card {
      display: block;
    }
  }
  @media (min-width: 1400px) {
    grid-template-columns: repeat(4, calc((1400px - (30px * 3)) / 4));
    .chat-card {
      grid-column: 4/5;
      grid-row: 1/3;
    }
  }
  @media (max-width: 1000px) {
    margin: 15px 0 80px;
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

import { styled } from "styled-components";
import { SelectionCard } from "../../../Components/SelectionCard/SelectionCard";
import { getLocation } from "../../../helpers";
import { Empty } from "./Empty";
import { Spinner } from "../../../Components/Spinner";
import { Card } from "./Card/Card";
import { useEffect, useState } from "react";

interface Props {
  cards: any;
  onOpenInfo: (card: any) => void;
  onSendRealtor: (type: string, id: string) => void;
  currency: string;
  onSwap: (index: number, direction: string, id: string, type: string) => void;
  removed: any[];
  rating: boolean;
  loadingMore: boolean;
  onChangeCurrency: (value: string) => void;
}

export const NewSelectionDesktop = ({
  cards,
  onOpenInfo,
  onSendRealtor,
  currency,
  onSwap,
  removed,
  rating,
  loadingMore,
  onChangeCurrency,
}: Props) => {
  const [swipeAnimation, setSwipeAnimation] = useState<string | null>(null);
  const [animationProgress, setAnimationProgress] = useState<any>(false);
  const [lastCard, setLastCard] = useState<any>();

  const handleChangeCardStatus = (
    index: number,
    value: string | null,
    id: string,
    type: string
  ) => {
    if (!swipeAnimation) {
      setLastCard(cards?.[1]);
      setSwipeAnimation(value);
      if (value) {
        setTimeout(() => {
          setAnimationProgress("ended");
          onSwap(index, value, id, type);
        }, 200);
      }
    }
  };

  useEffect(() => {
    if (animationProgress === "ended") {
      setAnimationProgress("reload");
      setTimeout(() => {
        setAnimationProgress(null);
        setSwipeAnimation(null);
      }, 200);
    }
  }, [cards]);

  return (
    <StyledNewSelectionDesktop>
      {cards?.length > 0 ? (
        <div className="cards-list">
          <Card
            data={swipeAnimation && lastCard ? lastCard : cards?.[0] ?? null}
            onSendRealtor={onSendRealtor}
            onSwap={handleChangeCardStatus}
            swipeAnimation={swipeAnimation}
            isReload={animationProgress === "reload"}
            currency={currency}
            onChangeCurrency={onChangeCurrency}
          />
          {cards?.[1] && (
            <Card
              data={swipeAnimation && lastCard ? lastCard : cards?.[1] ?? null}
              swipeAnimation={swipeAnimation}
              hide
              isReload={animationProgress === "reload"}
              currency={currency}
              onChangeCurrency={onChangeCurrency}
            />
          )}
        </div>
      ) : loadingMore ? (
        <Spinner className="loading-more-desktop" />
      ) : (
        <Empty />
      )}
    </StyledNewSelectionDesktop>
  );
};

const StyledNewSelectionDesktop = styled.div`
  display: flex;
  margin: 30px 0 0;
  height: calc(100vh - 105px);
  overflow: hidden;
  position: relative;
  @media (max-width: 1000px) {
    display: none;
  }
  .selection-card-desctop {
    width: calc((98% - (24px * 2)) / 4);
    margin-right: 24px;
  }
  .selection-card-desctop-hide {
    scale: 0;
    margin: 0 !important;
    transition: all 0.7s;
    flex-shrink: initial !important;
    width: 0 !important;
  }
  .loading-more-desktop {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .cards-list {
  }
  @media (max-width: 1200px) {
    .selection-card-desctop {
      width: calc((98% - (24px * 2)) / 3);
    }
  }
`;

import { styled } from "styled-components";
import { SelectionCard } from "../../../Components/SelectionCard/SelectionCard";
import { getLocation } from "../../../helpers";
import { Empty } from "./Empty";
import { Spinner } from "../../../Components/Spinner";

interface Props {
  cards: any;
  onOpenInfo: (card: any) => void;
  onSendRealtor: (type: string, id: string) => void;
  currency: string;
  onSwap: (index: number, direction: string, id: string, type: string) => void;
  removed: any[];
  rating: boolean;
  loadingMore: boolean;
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
}: Props) => (
  <StyledNewSelectionDesktop>
    {cards?.length > 0 ? (
      cards.map((card: any, i: number) => (
        <SelectionCard
          key={i}
          onOpen={() => onOpenInfo(card)}
          isNew
          onSendRealtor={() => onSendRealtor(card?.type, card?.id_object)}
          area={card?.total_house_area ?? "-"}
          currency={currency}
          price={card?.price ? card?.price[currency] : 0}
          title={
            card?.title?.length > 0 ? card?.title : card?.description ?? ""
          }
          location={getLocation(card?.location)}
          doors={card?.rooms ?? "-"}
          stairs={`${card?.storey ?? "-"} із ${card?.storey_count ?? "-"}`}
          description={card?.description ?? ""}
          images={card?.image_url ?? []}
          onSwap={(direction) =>
            onSwap(i, direction, card?.id_object, card?.type)
          }
          className={`selection-card-desctop ${
            !!removed.find((id: any) => id === card?.id_object) &&
            "selection-card-desctop-hide"
          }`}
          disabled={rating}
          recommended={card?.recommended}
        />
      ))
    ) : loadingMore ? (
      <Spinner className="loading-more-desktop" />
    ) : (
      <Empty />
    )}
  </StyledNewSelectionDesktop>
);

const StyledNewSelectionDesktop = styled.div`
  display: flex;
  margin: 30px 0 0;
  height: calc(100vh - 138px);
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
  @media (max-width: 1200px) {
    .selection-card-desctop {
      width: calc((98% - (24px * 2)) / 3);
    }
  }
`;

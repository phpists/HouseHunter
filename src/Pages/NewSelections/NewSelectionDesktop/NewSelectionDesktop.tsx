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
          onSendRealtor={() => onSendRealtor(card?.type, card?.id)}
          area={card?.area_total ?? "-"}
          currency={currency}
          price={card[`price_${currency}`] ?? 0}
          title={
            card?.title?.length > 0 ? card?.title : card?.description ?? ""
          }
          location={card?.location_name}
          doors={card?.rooms ?? "-"}
          stairs={`${card?.address_apartment_number ?? "-"} із ${
            card?.address_storey ?? "-"
          }`}
          description={card?.description ?? ""}
          images={
            card?.img?.length > 0 ? card?.img?.map((i: any) => i.name) : []
          }
          onSwap={(direction) => onSwap(i, direction, card?.id, card?.type)}
          className={`selection-card-desctop ${
            !!removed.find((id: any) => id === card?.id) &&
            "selection-card-desctop-hide"
          }`}
          disabled={rating}
          recommended={card?.recommended}
          category={card?.rubric_name}
          expand={card?.area_total ? `${card?.area_total}м²` : "-"}
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

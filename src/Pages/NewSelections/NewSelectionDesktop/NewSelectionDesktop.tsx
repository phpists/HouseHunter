import { styled } from "styled-components";
import { SelectionCard } from "../../../Components/SelectionCard/SelectionCard";
import { getLocation } from "../../../helpers";
import { Empty } from "./Empty";

interface Props {
  cards: any;
  onOpenInfo: (card: any) => void;
  onSendRealtor: (type: string, id: string) => void;
  currency: string;
  onSwap: (index: number, direction: string, id: string, type: string) => void;
}

export const NewSelectionDesktop = ({
  cards,
  onOpenInfo,
  onSendRealtor,
  currency,
  onSwap,
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
          className={`selection-card-desctop`}
        />
      ))
    ) : (
      <Empty />
    )}
  </StyledNewSelectionDesktop>
);

const StyledNewSelectionDesktop = styled.div`
  display: flex;
  /* grid-template-columns: repeat(4, minmax(0px, calc((98% - (24px * 2)) / 4))); */
  /* grid-auto-rows: max-content;
  justify-content: center; */
  margin: 30px 0 0;
  height: calc(100vh - 138px);
  overflow: hidden;
  @media (max-width: 1000px) {
    display: none;
  }
  .selection-card-desctop {
    width: calc((98% - (24px * 2)) / 4);
    margin-right: 24px;
  }
  @media (max-width: 1200px) {
    /* grid-template-columns: repeat(3, minmax(0, calc((98% - (24px * 2)) / 3))); */

    .selection-card-desctop:nth-child(4) {
      display: none;
    }
    .selection-card-desctop {
      width: calc((98% - (24px * 2)) / 3);
    }
  }
`;

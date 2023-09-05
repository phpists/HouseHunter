import { getLocation } from "../../helpers";
import { Card } from "./Card/Card";
import { Empty } from "./Empty";
import noPhoto from "../../assets/images/no-photo.svg";
import { EmptyCard } from "./EmptyCard";

interface Props {
  cards: any[];
  history?: boolean;
  cardStatusChanged: null | string;
  onChangeStatus: (
    index: number,
    direction: string | null,
    id: string,
    type: string
  ) => void;
  onSendRealtor: (type: string, id: string) => void;
  currency: string;
  onChangeCurrency: (value: string) => void;
  onClose?: () => void;
  loading: boolean;
  onPhotoView: (photos: string[]) => void;
  disabled?: boolean;
  rieltor: { name: string; photo: string | undefined; phones: string[] };
}

export const CardList = ({
  cards,
  history,
  cardStatusChanged,
  onChangeStatus,
  onSendRealtor,
  currency,
  onChangeCurrency,
  onClose,
  loading,
  onPhotoView,
  disabled,
  rieltor,
}: Props) => (
  <>
    {loading ? (
      <>
        {cards.length > 0 ? (
          cards.map((card: any, i: number) => (
            <EmptyCard
              key={i}
              index={1 + i}
              images={card?.image_url?.length > 0 ? card?.image_url : [noPhoto]}
              totalCards={cards?.length ?? 0}
            />
          ))
        ) : (
          <Empty />
        )}
      </>
    ) : (
      <>
        {cards.length > 0 ? (
          cards.map((card: any, i: number) => (
            <Card
              key={i}
              type={card?.rubric_name ?? ""}
              currency={currency}
              onChangeCurrency={onChangeCurrency}
              price={card?.price ? card?.price[currency] : 0}
              location={getLocation(card?.location)}
              doors={card?.rooms ?? "-"}
              area={card?.total_house_area ?? "-"}
              stairs={`${card?.storey ?? "-"} із ${card?.storey_count ?? "-"}`}
              box={card?.kitchen_area ?? "-"}
              title={
                card?.title?.length > 0 ? card?.title : card?.description ?? ""
              }
              description={card?.description ?? ""}
              index={1 + i}
              images={card?.image_url?.length > 0 ? card?.image_url : [noPhoto]}
              onChangeStatus={(direction) =>
                onChangeStatus(i, direction, card?.id_object, card?.type)
              }
              history={history}
              totalCards={cards?.length ?? 0}
              onSendRealtor={() => onSendRealtor(card?.type, card?.id_object)}
              onClose={onClose}
              cardStatusChanged={cardStatusChanged}
              onPhotoView={() =>
                onPhotoView(
                  card?.image_url?.length > 0 ? card?.image_url : [noPhoto]
                )
              }
              disabled={disabled}
              rieltor={rieltor}
              recommended={card?.recommended}
            />
          ))
        ) : (
          <Empty />
        )}
      </>
    )}
  </>
);

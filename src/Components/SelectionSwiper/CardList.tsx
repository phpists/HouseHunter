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
  phonesCodes?: any;
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
  phonesCodes,
}: Props) => (
  <>
    {loading ? (
      <>
        {cards.length > 0 ? (
          cards.map((card: any, i: number) => (
            <EmptyCard
              key={i}
              index={1 + i}
              images={
                card?.photos?.length > 0
                  ? card?.photos?.map((i: any) => i?.name)
                  : [noPhoto]
              }
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
              price={card?.[`price_per_object_${currency?.toLowerCase()}`] ?? 0}
              location={card?.location_name}
              doors={card?.rooms ?? "-"}
              area={card?.area_total ?? "-"}
              stairs={`${card?.address_storey ?? "-"} із ${
                card?.storey_count ?? "-"
              }`}
              box={card?.area_kitchen ?? ""}
              title={
                card?.title?.length > 0 ? card?.title : card?.description ?? ""
              }
              description={card?.description ?? ""}
              index={1 + i}
              images={
                card?.photos?.length > 0
                  ? card?.photos?.map((i: any) => i?.name)
                  : [noPhoto]
              }
              onChangeStatus={(direction) =>
                onChangeStatus(i, direction, card?.id, card?.type)
              }
              history={history}
              totalCards={cards?.length ?? 0}
              data={card}
              onSendRealtor={() => onSendRealtor(card?.type, card?.id)}
              onClose={onClose}
              cardStatusChanged={cardStatusChanged}
              onPhotoView={() =>
                onPhotoView(
                  card?.photos?.length > 0
                    ? card?.photos?.map((i: any) => i?.name)
                    : [noPhoto]
                )
              }
              disabled={disabled}
              recommended={card?.recommended}
              tags={card?.tags_folder}
              phonesCodes={phonesCodes}
            />
          ))
        ) : (
          <Empty />
        )}
      </>
    )}
  </>
);

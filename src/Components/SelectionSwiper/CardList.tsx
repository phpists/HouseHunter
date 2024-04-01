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
  rieltor: { name: string; photo: string | undefined; phone: any };
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
              images={
                card?.img?.length > 0
                  ? card?.img?.map((i: any) => i?.name)
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
              stairs={`${card?.address_apartment_number ?? "-"} із ${
                card?.address_storey ?? "-"
              }`}
              box={card?.kitchen_area ?? "-"}
              title={
                card?.title?.length > 0 ? card?.title : card?.description ?? ""
              }
              description={card?.description ?? ""}
              index={1 + i}
              images={
                card?.img?.length > 0
                  ? card?.img?.map((i: any) => i?.name)
                  : [noPhoto]
              }
              onChangeStatus={(direction) =>
                onChangeStatus(i, direction, card?.id, card?.type)
              }
              history={history}
              totalCards={cards?.length ?? 0}
              onSendRealtor={() => onSendRealtor(card?.type, card?.id)}
              onClose={onClose}
              cardStatusChanged={cardStatusChanged}
              onPhotoView={() =>
                onPhotoView(
                  card?.img?.length > 0
                    ? card?.img?.map((i: any) => i?.name)
                    : [noPhoto]
                )
              }
              disabled={disabled}
              rieltor={rieltor}
              recommended={card?.recommended}
              tags={card?.tags_folder}
            />
          ))
        ) : (
          <Empty />
        )}
      </>
    )}
  </>
);

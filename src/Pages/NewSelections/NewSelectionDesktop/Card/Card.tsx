import styled from "styled-components";
import { Slider } from "./Slider/Slider";
import { Title } from "./Title";
import { Location } from "./Location";
import { Tags } from "./Tags";
import { Description } from "./Description";
import { Footer } from "./Footer/Footer";
import image from "../../../../assets/images/image.png";
import image2 from "../../../../assets/images/image2.png";

interface Props {
  data: any;
  onSendRealtor: (type: string, id: string) => void;
  onSwap: (index: number, direction: string, id: string, type: string) => void;
}

// key={i}
// onOpen={() => onOpenInfo(card)}
// isNew
// onSendRealtor={() => onSendRealtor(card?.type, card?.id)}
// area={card?.area_total ?? "-"}
// currency={currency}
// price={card[`price_${currency}`] ?? 0}
// title={
//   card?.title?.length > 0 ? card?.title : card?.description ?? ""
// }
// location={card?.location_name}
// doors={card?.rooms ?? "-"}
// stairs={`${card?.address_apartment_number ?? "-"} із ${  card?.address_storey ?? "-" }`}
// description={card?.description ?? ""}
// images={
//   card?.img?.length > 0 ? card?.img?.map((i: any) => i.name) : []
// }
// onSwap={(direction) => onSwap(i, direction, card?.id, card?.type)}
// className={`selection-card-desctop ${
//   !!removed.find((id: any) => id === card?.id) &&
//   "selection-card-desctop-hide"
// }`}
// disabled={rating}
// recommended={card?.recommended}
// category={card?.rubric_name}
// expand={card?.area_total ? `${card?.area_total}м²` : "-"}

export const Card = ({ data, onSendRealtor, onSwap }: Props) => {
  return (
    <StyledCard>
      <Slider
        onOpen={() => null}
        images={data?.img?.length > 0 ? data?.img?.map((i: any) => i.name) : []}
        category={data?.rubric_name}
      />
      <div className="flex flex-col justify-between card-content">
        <div>
          <Title
            title={
              data?.title?.length > 0
                ? data?.title
                : data?.description?.length > 100
                ? `${data?.description?.substring(0, 100)}...`
                : data?.description ?? ""
            }
          />
          <Location location={data?.location_name} />
          <Tags
            doors={data?.rooms ? `${data?.rooms}к` : "-"}
            stairs={`${data?.address_apartment_number ?? "-"} із ${
              data?.address_storey ?? "-"
            }`}
          />
          <Description description={data?.description ?? ""} />
        </div>
        <Footer
          onSendRealtor={() => onSendRealtor(data?.type, data?.id)}
          onSwap={(direction) => onSwap(0, direction, data?.id, data?.type)}
        />
      </div>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  display: grid;
  grid-template-columns: 570px max-content 1fr;
  overflow: auto;
  min-height: 400px;
  height: 81vh;
  .card-content {
    margin-left: 40px;
  }
  @media (max-width: 1220px) {
    grid-template-columns: 500px max-content 1fr;
  }
  @media (max-width: 1120px) {
    grid-template-columns: 450px max-content 1fr;
  }
`;

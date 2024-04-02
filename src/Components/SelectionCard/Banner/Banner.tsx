import { styled } from "styled-components";
import { Slider } from "./Slider/Slider";
import { Area } from "./Area";
import { Status } from "./Status";
import { Price } from "./Price";
import { ShowBtn } from "./ShowBtn";
import noPhoto from "../../../assets/images/no-photo.svg";
import { Recomended } from "./Recomended";
import { Type } from "./Type";
interface Props {
  onOpen: () => void;
  isNew?: boolean;
  area: string | number;
  currency: string;
  price: number;
  images: string[];
  like?: boolean;
  isHide?: boolean;
  tag?: string;
  recommended?: boolean;
  tags?: any;
}

export const Banner = ({
  onOpen,
  isNew,
  area,
  currency,
  price,
  images,
  like,
  isHide,
  tag,
  recommended,
  tags,
}: Props) => {
  return (
    <StyledBanner status={!!like} isNew={!!isNew}>
      {!isNew && tag ? (
        <ShowBtn tag={tag} />
      ) : (
        <Area area={area} onOpen={onOpen} />
      )}
      <div className="tags">
        {tags?.label_recomendation ? (
          <Type type={"Рекомендовано"} className="maininfo" />
        ) : null}
        {tags?.label_showing ? (
          <Type type={"Показ"} className="maininfo" />
        ) : null}
        {tags?.label_top ? <Type type={"Топ"} className="maininfo" /> : null}
        {!isNew && !isHide && (
          <>
            <Status status={!!like} onOpen={onOpen} />
          </>
        )}
      </div>
      {isNew && recommended && <Recomended />}
      <Price price={price} currency={currency} onOpen={onOpen} />
      <Slider
        isNew={isNew}
        onOpen={onOpen}
        images={images?.length > 0 ? images : [noPhoto]}
      />
    </StyledBanner>
  );
};

interface StyledBannerProps {
  status: boolean;
  isNew: boolean;
}

const StyledBanner = styled.div<StyledBannerProps>`
  position: relative;
  .tags {
    display: flex;
    align-items: center;
    gap: 4px;
    position: absolute;
    top: 10px;
    right: 10px;
    flex-wrap: wrap;
    justify-content: end;
    @media (max-width: 1000px) {
      right: 6px;
      top: 6px;
    }
    @media (max-width: 600px) {
      max-width: 200px;
    }
  }
  @media (max-width: 1000px) {
    border-radius: 11px;
    overflow: hidden;
    ${({ status, isNew }) =>
      !status && !isNew && "border: 1.4px solid rgba(237, 56, 56, 0.6);"}
  }
`;

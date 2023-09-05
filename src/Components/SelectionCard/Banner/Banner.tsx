import { styled } from "styled-components";
import { Slider } from "./Slider/Slider";
import { Area } from "./Area";
import { Status } from "./Status";
import { Price } from "./Price";
import { ShowBtn } from "./ShowBtn";
import noPhoto from "../../../assets/images/no-photo.svg";
import { Recomended } from "./Recomended";
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
}: Props) => {
  return (
    <StyledBanner status={!!like} isNew={!!isNew}>
      {!isNew && tag ? (
        <ShowBtn tag={tag} />
      ) : (
        <Area area={area} onOpen={onOpen} />
      )}
      {!isNew && !isHide && (
        <>
          <Status status={!!like} onOpen={onOpen} />
        </>
      )}
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
  @media (max-width: 1000px) {
    border-radius: 11px;
    overflow: hidden;
    ${({ status, isNew }) =>
      !status && !isNew && "border: 1.4px solid rgba(237, 56, 56, 0.6);"}
  }
`;

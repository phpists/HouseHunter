import { styled } from "styled-components";
import { Slider } from "./Slider/Slider";
import { Area } from "./Area";
import { Status } from "./Status";
import { Price } from "./Price";
import { ShowBtn } from "./ShowBtn";
import noPhoto from "../../../assets/images/no-photo.svg";
interface Props {
  onOpen: () => void;
  isNew?: boolean;
  area: string | number;
  currency: string;
  price: number;
  images: string[];
  like?: boolean;
  isHide?: boolean;
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
}: Props) => {
  return (
    <StyledBanner status={!!like} isNew={!!isNew}>
      <Area area={area} onOpen={onOpen} />
      {!isNew && !isHide && (
        <>
          {/* <ShowBtn onOpen={onOpen} /> */}
          <Status status={!!like} onOpen={onOpen} />
        </>
      )}
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

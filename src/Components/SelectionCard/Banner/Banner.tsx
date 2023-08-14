import { styled } from "styled-components";
import { Slider } from "./Slider/Slider";
import { Area } from "./Area";
import { Status } from "./Status";
import { Price } from "./Price";
import { ShowBtn } from "./ShowBtn";

interface Props {
  onOpen: () => void;
  isNew?: boolean;
  area: string | number;
  currency: string;
  price: number;
  images: string[];
}

export const Banner = ({
  onOpen,
  isNew,
  area,
  currency,
  price,
  images,
}: Props) => {
  return (
    <StyledBanner status={true}>
      <Area area={area} onOpen={onOpen} />
      {!isNew && (
        <>
          {/* <ShowBtn onOpen={onOpen} /> */}
          <Status status={true} onOpen={onOpen} />
        </>
      )}
      <Price price={price} currency={currency} onOpen={onOpen} />
      <Slider isNew={isNew} onOpen={onOpen} images={images} />
    </StyledBanner>
  );
};

interface StyledBannerProps {
  status: boolean;
}

const StyledBanner = styled.div<StyledBannerProps>`
  position: relative;
  ${({ status }) => !status && "border: 1.4px solid rgba(237, 56, 56, 0.6);"}
  @media (max-width: 1000px) {
    border-radius: 11px;
    overflow: hidden;
  }
`;

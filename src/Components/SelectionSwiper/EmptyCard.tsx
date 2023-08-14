// @ts-nocheck
import { styled } from "styled-components";
import { Price } from "./Card/Price/Price";
import { Type } from "./Card/Type";
import { MainInfo } from "./Card/MainInfo/MainInfo";
import { Slider } from "./Card/Slider/Slider";

interface Props {
  index: number;
  images: string[];
  totalCards: number;
}

export const EmptyCard = ({ index, images, totalCards }: Props) => {
  return (
    <StyledCard
      index={index}
      totalCards={totalCards}
      draggable={false}
      className={`swapper-card${index}`}
    >
      <Slider images={images} index={index} />
    </StyledCard>
  );
};

interface StyledCardProps {
  index: number;
  totalCards: number;
}

const StyledCard = styled.div<StyledCardProps>`
  position: absolute;
  height: calc(100vh - 310px);
  /* overflow: auto; */
  font-size: 80px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  width: 100%;
  z-index: ${({ index }) => index};
  background: #2c2c2c;
  border-radius: 13px;
  top: ${({ index, totalCards }) =>
    totalCards === index ? 20 : totalCards - 1 === index ? 0 : -15}px;
  scale: ${({ index, totalCards }) =>
    totalCards === index ? 1 : totalCards - 1 === index ? 0.95 : 0.9};
  filter: blur(
    ${({ index, totalCards }) => (totalCards === index ? 0 : 1.2)}px
  );
  .maininfo,
  .slick-arrow {
    transition: all 0.3s;
    opacity: ${({ index, totalCards }) =>
      totalCards === index ? 1 : 0} !important;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      11deg,
      #2c2c2c 7.62%,
      rgba(44, 44, 44, 0) 47.6%
    );
    opacity: 1;
    z-index: ${({ index }) => index};
  }
`;

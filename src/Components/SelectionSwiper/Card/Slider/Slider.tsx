import SlickSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from "styled-components";
import { Slide } from "./Slide";
import prevIcon from "../../../../assets/images/slider-prev.svg";
import nextIcon from "../../../../assets/images/slider-next.svg";
import { useState } from "react";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: false,
  touchMove: false,
};

interface Props {
  images: string[];
  index: number;
}

export const Slider = ({ images, index }: Props) => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);

  return (
    <>
      <StyledSlider
        prevIcon={prevIcon}
        nextIcon={nextIcon}
        draggable="false"
        index={index}
      >
        <SlickSlider
          {...settings}
          beforeChange={(currentSlide, nextSlide) =>
            setCurrentSlide(1 + nextSlide)
          }
          prevArrow={
            <button className="clickable maininfo">
              <img src={prevIcon} alt="" className="clickable" />
            </button>
          }
          nextArrow={
            <button className="clickable maininfo">
              <img src={nextIcon} alt="" className="clickable" />
            </button>
          }
        >
          {images.map((image, i) => (
            <Slide key={i} image={image} />
          ))}
        </SlickSlider>
      </StyledSlider>
    </>
  );
};

interface StyledSliderProps {
  prevIcon: string;
  nextIcon: string;
  index: number;
}

const StyledSlider = styled.div<StyledSliderProps>`
  overflow: hidden;
  position: relative;
  border-radius: 13px;

  .slick-next,
  .slick-prev {
    z-index: ${({ index }) => index + 1};
    height: 140px;
    width: 62px;
    display: flex;
    &::before {
      content: "";
      display: none;
    }
    img {
      display: inline;
    }
  }
  .slick-prev {
    left: 10px;
  }
  .slick-next {
    right: 10px;
  }
  .slick-disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
  .slick-next img,
  .slick-prev img {
    height: 36px;
    width: 36px;
  }
  @media (min-width: 1000px) {
    display: none;
  }
`;

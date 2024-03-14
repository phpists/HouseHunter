import SlickSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from "styled-components";
import { Slide } from "./Slide";
import prevIcon from "../../../../assets/images/slider-prev.svg";
import nextIcon from "../../../../assets/images/slider-next.svg";
import { useState } from "react";
import { SlideCount } from "../SlideCount";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

interface Props {
  images: string[];
  index: number;
  onPhotoView: () => void;
  onChangeSlide: (num: number) => void;
}

export const Slider = ({
  images,
  index,
  onPhotoView,
  onChangeSlide,
}: Props) => {
  return (
    <>
      <StyledSlider prevIcon={prevIcon} nextIcon={nextIcon} index={index}>
        <div className="shadow"></div>
        <SlickSlider
          {...settings}
          beforeChange={(nextSlide) => onChangeSlide(1 + nextSlide)}
          prevArrow={
            <button className=" maininfo">
              <img src={prevIcon} alt="" className="" />
            </button>
          }
          nextArrow={
            <button className=" maininfo">
              <img src={nextIcon} alt="" className="" />
            </button>
          }
        >
          {images.map((image, i) => (
            <Slide
              key={i}
              image={image}
              //   active={currentSlide === 1 + i}
              active={true}
              onPhotoView={onPhotoView}
              index={index}
            />
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
  border-radius: 13px 13px 0 0;

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

import SlickSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from "styled-components";
import { Slide } from "./Slide";
import prevIcon from "../../../../../assets/images/slider-prev.svg";
import nextIcon from "../../../../../assets/images/slider-next.svg";
import { SlideCount } from "./SlideCount";
import { useState } from "react";
import { Type } from "../../Type";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: false,
  touchMove: true,
};

interface Props {
  type: string;
  images: string[];
  onPhotoView: () => void;
}

export const Slider = ({ type, images, onPhotoView }: Props) => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);

  return (
    <StyledSlider prevIcon={prevIcon} nextIcon={nextIcon}>
      <div className="header flex items-center justify-between">
        <SlideCount currentSlide={currentSlide} total={images.length} />
        <Type className="tag" type={type} />
      </div>
      <SlickSlider
        {...settings}
        beforeChange={(currentSlide, nextSlide) =>
          setCurrentSlide(1 + nextSlide)
        }
        prevArrow={
          <button className="clickable">
            <img src={prevIcon} alt="" className="clickable" />
          </button>
        }
        nextArrow={
          <button className="clickable">
            <img src={nextIcon} alt="" className="clickable" />
          </button>
        }
      >
        {images.map((image, i) => (
          <Slide key={i} image={image} onPhotoView={onPhotoView} />
        ))}
      </SlickSlider>
    </StyledSlider>
  );
};

interface StyledSliderProps {
  prevIcon: string;
  nextIcon: string;
}

const StyledSlider = styled.div<StyledSliderProps>`
  border-radius: 13px 13 0 0;
  overflow: hidden;
  position: relative;
  margin-bottom: 14px;
  .slick-next,
  .slick-prev {
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(18.5px);
    z-index: 2;
    &::before {
      content: "";
      display: none;
    }
    img {
      display: inline;
      margin: 0 !important;
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
  .header {
    position: absolute;
    left: 7px;
    right: 7px;
    top: 12px;
    z-index: 12;
  }
  .tag {
    position: relative;
    top: unset;
    left: unset;
    right: unset;
    margin-left: 7px;
  }
  @media (min-width: 1000px) {
    display: none;
  }
`;

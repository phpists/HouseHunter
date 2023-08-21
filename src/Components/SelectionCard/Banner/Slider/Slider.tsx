import SlickSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from "styled-components";
import image from "../../../../assets/images/image.png";
import image2 from "../../../../assets/images/image2.png";
import { Slide } from "./Slide";
import prevIcon from "../../../../assets/images/slider-prev.svg";
import nextIcon from "../../../../assets/images/slider-next.svg";
import { SlideCount } from "./SlideCount";
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
  isNew?: boolean;
  onOpen: () => void;
  images: string[];
}

export const Slider = ({ isNew, onOpen, images }: Props) => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);

  return (
    <>
      <StyledSlider prevIcon={prevIcon} nextIcon={nextIcon}>
        <SlickSlider
          {...settings}
          beforeChange={(currentSlide, nextSlide) =>
            setCurrentSlide(1 + nextSlide)
          }
          prevArrow={
            <button>
              <img src={prevIcon} alt="" />
            </button>
          }
          nextArrow={
            <button>
              <img src={nextIcon} alt="" />
            </button>
          }
        >
          {images.map((image, i: number) => (
            <Slide
              key={i}
              image={image}
              isNew={isNew}
              onOpen={onOpen}
              active={currentSlide === 1 + i}
            />
          ))}
        </SlickSlider>
      </StyledSlider>
      <SlideCount currentSlide={currentSlide} total={images.length ?? 0} />
    </>
  );
};

interface StyledSliderProps {
  prevIcon: string;
  nextIcon: string;
}

const StyledSlider = styled.div<StyledSliderProps>`
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
  @media (max-width: 1000px) {
    .slick-prev,
    .slick-next {
      display: none !important;
    }
  }
`;

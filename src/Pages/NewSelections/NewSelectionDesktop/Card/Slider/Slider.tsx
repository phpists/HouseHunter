import SlickSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from "styled-components";
import { Slide } from "./Slide";
import prevIcon from "../../../../../assets/images/slider-prev.svg";
import nextIcon from "../../../../../assets/images/slider-next.svg";
import { SlideCount } from "./SlideCount";
import { useRef, useState } from "react";
import noPhoto from "../../../../../assets/images/no-photo.svg";
import { Tag } from "./Tag";
import { Photos } from "./Photos/Photos";
import { Price } from "../Price/Price";
import { Status } from "./Status";

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
  onOpen: () => void;
  images: string[];
  category?: string;
  currency: string;
  onChangeCurrency: (value: string) => void;
  price: number;
  showLike?: boolean;
  status?: boolean;
}

export const Slider = ({
  onOpen,
  images,
  category,
  currency,
  onChangeCurrency,
  price,
  showLike,
  status,
}: Props) => {
  const sliderRef = useRef<any>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(1);

  const handleChangeActiveSlide = (index: number) => {
    setCurrentSlide(index);
    sliderRef.current && sliderRef.current.slickGoTo(index - 1);
  };

  return (
    <>
      <StyledSlider prevIcon={prevIcon} nextIcon={nextIcon} noPhoto={noPhoto}>
        {images?.length === 0 ? (
          <div className="empty-slider" />
        ) : (
          <SlickSlider
            {...settings}
            ref={sliderRef}
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
              <Slide key={i} image={image} onOpen={onOpen} />
            ))}
          </SlickSlider>
        )}
        {images?.length >= 2 && (
          <>
            <SlideCount
              currentSlide={currentSlide}
              total={images.length ?? 0}
            />
          </>
        )}
        {category && <Tag category={category} />}
        {showLike && <Status status={status ?? false} />}
        <Price
          currency={currency}
          onChangeCurrency={onChangeCurrency}
          price={price}
        />
      </StyledSlider>
      {images?.length >= 2 && (
        <Photos images={images} onChangeSlide={handleChangeActiveSlide} />
      )}
    </>
  );
};

interface StyledSliderProps {
  prevIcon: string;
  nextIcon: string;
  noPhoto: string;
}

const StyledSlider = styled.div<StyledSliderProps>`
  position: relative;
  width: 570px;
  flex-shrink: 0;
  .slick-next,
  .slick-prev {
    width: 44px;
    height: 44px;
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
      height: 22px;
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
  .empty-slider {
    min-height: 400px;
    height: calc(80vh - 40px);
    background: url(${({ noPhoto }) => noPhoto}) center/cover no-repeat;
    width: 100%;
  }
  @media (max-width: 1220px) {
    width: 500px;
  }
  @media (max-width: 1120px) {
    width: 450px;
  }
  @media (max-width: 1080px) {
    width: 400px;
  }
`;

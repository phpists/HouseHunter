import SlickSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from "styled-components";
import { Slide } from "./Slide";
import prevIcon from "../../../../../assets/images/slider-prev.svg";
import nextIcon from "../../../../../assets/images/slider-next.svg";
import { SlideCount } from "./SlideCount";
import { useEffect, useRef, useState } from "react";
import noPhoto from "../../../../../assets/images/no-photo.svg";
import { Tag } from "./Tag";
import { Photos } from "./Photos/Photos";
import { Price } from "../Price/Price";
import { Status } from "./Status";
import { PhotoSlider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const settings = {
  dots: false,
  infinite: true,
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
  tags?: any;
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
  tags,
}: Props) => {
  const sliderRef = useRef<any>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [sortPhotos, setSortPhotos] = useState<any>(null);
  const [openView, setOpenView] = useState(false);

  const handleChangeActiveSlide = (index: number) => {
    setCurrentSlide(index);
    sliderRef.current && sliderRef.current.slickGoTo(index - 1);
  };

  useEffect(() => {
    setCurrentSlide(1);
    handleChangeActiveSlide(1);
  }, [images]);

  const handleOpen = () => {
    setSortPhotos(
      images.map((image, key) => ({
        src: image,
        key: key,
      }))
      // ?.sort((a, b) => b?.key - a?.key)
    );
    setOpenView(true);
  };

  return (
    <>
      {openView && sortPhotos && (
        <PhotoSlider
          images={sortPhotos}
          visible={openView}
          onClose={() => setOpenView(false)}
          index={currentSlide - 1}
          onIndexChange={(index) => handleChangeActiveSlide(1 + index)}
          speed={() => 0}
          easing={(type) =>
            type === 2
              ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
              : "cubic-bezier(0.34, 1.56, 0.64, 1)"
          }
        />
      )}
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
              <Slide key={i} image={image} onOpen={handleOpen} />
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
        <div className="tags">
          {tags?.label_recomendation ? (
            <Tag category={"Рекомендовано"} />
          ) : null}
          {tags?.label_showing ? <Tag category={"Показ"} /> : null}
          {tags?.label_top ? <Tag category={"Топ"} /> : null}

          {category && <Tag category={category} />}
        </div>
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
  .tags {
    position: absolute;
    right: 20px;
    top: 20px;
    display: flex;
    gap: 5px;
  }
  @media (max-width: 1220px) {
    width: 500px;
  }
  @media (max-width: 1120px) {
    width: 450px;
    .tags {
      flex-wrap: wrap;
      width: 140px;
      justify-content: end;
    }
  }
  @media (max-width: 1080px) {
    width: 400px;
  }
`;

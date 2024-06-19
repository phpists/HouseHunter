// @ts-nocheck
import { useEffect } from "react";
import { styled } from "styled-components";
import { useState, useRef } from "react";
import { Slider } from "./Slider/Slider";
import { Price } from "./Price/Price";
import { MainInfo } from "./MainInfo/MainInfo";
import { MoreInfo } from "./MoreInfo/MoreInfo";
import { Type } from "./Type";
import { SwipeStatus } from "./SwipeStatus";
import noPhoto from "../../../assets/images/no-photo.svg";
import { Title } from "./MainInfo/Title";
import { Location } from "./MainInfo/Location";
import { Doors } from "./MainInfo/Doors";
import { Divider } from "./MainInfo/Divider";
import { Expand } from "./MainInfo/Expand";
import { Box } from "./MoreInfo/Box";
import { Stairs } from "./MoreInfo/Stairs";
import { SectionTitle } from "./MoreInfo/SectionTitle";
import { Descrioption } from "./MoreInfo/Description";
import { Realtor } from "../../Header/Realtor/Realtor";

interface Props {
  type: string;
  currency: string;
  onChangeCurrency: (value: string) => void;
  price: number;
  location: string;
  doors: number | string;
  stairs: string;
  box: number | string;
  area: number | string;
  title: string;
  description: string;
  index: number;
  images: string[];
  onChangeStatus: (value: string | null) => void;
  onSendRealtor: () => void;
  history?: boolean;
  totalCards: number;
  onClose?: () => void;
  cardStatusChanged?: null | string;
  loading?: string;
  onPhotoView?: () => void;
  disabled?: boolean;
  recommended?: boolean;
  tags?: any;
  data?: any;
  phonesCodes?: any;
}

export const Card = ({
  type,
  currency,
  onChangeCurrency,
  price,
  location,
  doors,
  area,
  stairs,
  box,
  title,
  description,
  index,
  images,
  onShowPhotos,
  onChangeStatus,
  history,
  totalCards,
  onSendRealtor,
  onClose,
  cardStatusChanged,
  loading,
  onPhotoView,
  disabled,
  recommended,
  tags,
  data,
  phonesCodes,
}: Props) => {
  const [open, setOpen] = useState<boolean>(history);
  const cardRef = useRef(null);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [isDraged, setIsDraged] = useState<boolean>(false);
  const posX = useRef(0);
  const mouseX = useRef(0);
  const [direction, setDirection] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<number>(1);

  const handleStartDrag = (e) => {
    if (!open && totalCards === index) {
      setIsDrag(true);
      const cientX = e?.touches?.length ? e?.touches[0]?.clientX : e.clientX;
      const offSetLeft = cardRef.current.offsetLeft;
      posX.current = cientX - offSetLeft;
    }
  };

  const handleCheckIsClick = (e?: any) => {
    const clickableClasses = ["slick-arrow", "clickable"];
    const isClickable =
      e &&
      (e.target.classList.contains(clickableClasses[0]) ||
        e.target.classList.contains(clickableClasses[1]));

    if (mouseX.current === 0) {
      return isClickable && true;
    } else if (mouseX.current <= 0) {
      return isClickable && mouseX.current >= -10;
    } else {
      return isClickable && mouseX.current <= 10;
    }
  };

  const handleAnimateBackCards = () => {
    const backCard = document.querySelector(`.swapper-card${index - 1}`);

    if (backCard) {
      backCard.style.cssText = `
        transition: all .3s;
        top: 20px;
        scale: 1;
      `;
    }
  };

  const handleDrag = (e) => {
    if (!isDrag && !handleCheckIsClick(e)) {
      setIsDraged(true);
    }
    if (isDrag && !disabled) {
      const cientX = e?.touches?.length ? e?.touches[0]?.clientX : e.clientX;
      const mouseXPos = cientX - posX.current;
      mouseX.current = mouseXPos;
    }
  };

  const handleDragEnd = (e) => {
    if (handleCheckIsClick(e) && !disabled) {
      onPhotoView();
    }
    setIsDrag(false);
    setIsDraged(false);
    setDirection(null);
    mouseX.current = 0;
    mouseX.current = 0;
  };

  const handleSwipeAnimation = () => {
    const windowWidth = window.innerWidth;
    cardRef.current.style.transition = "all .4s";
    cardRef.current.style.transform = `translateX(${
      cardStatusChanged === "right" ? windowWidth : -windowWidth
    }px)`;
    setTimeout(handleAnimateBackCards, 100);
  };

  useEffect(() => {
    if (cardStatusChanged && totalCards === index) {
      handleSwipeAnimation();
    }
  }, [cardStatusChanged]);

  const handleScrollCard = (e) => {
    const scrolledHeight = e?.target?.scrollTop;
    if (isScrolled && scrolledHeight <= 50) {
      setIsScrolled(false);
    } else if (!isScrolled && scrolledHeight > 50) {
      setIsScrolled(true);
    }
  };

  return (
    <>
      <StyledCard
        ref={cardRef}
        index={index}
        onMouseDown={handleStartDrag}
        onMouseMove={handleDrag}
        onMouseUp={handleDragEnd}
        onClick={handleDragEnd}
        onTouchStart={handleStartDrag}
        onTouchMove={handleDrag}
        onTouchEnd={handleDragEnd}
        totalCards={totalCards}
        draggable={false}
        className={`swapper-card${index}`}
        onScroll={handleScrollCard}
      >
        <Price
          currency={currency}
          onChangeCurrency={onChangeCurrency}
          price={price}
        />
        <div className="tags">
          {tags?.label_recomendation ? (
            <Type type={"Рекомендовано"} className="maininfo" />
          ) : null}
          {tags?.label_showing ? (
            <Type type={"Показ"} className="maininfo" />
          ) : null}
          {tags?.label_top ? <Type type={"Топ"} className="maininfo" /> : null}
          <Type
            type={recommended ? "Рекомендація" : type ? type : ""}
            className="maininfo"
          />
        </div>
        <MainInfo
          title={title}
          location={location}
          doors={doors}
          area={area}
          isScrolled={isScrolled}
          totalSlides={images?.length}
          currentSlide={currentSlide}
          tags={tags}
        />
        <Slider
          images={images?.length === 0 ? [noPhoto] : images}
          index={index}
          onPhotoView={() => null}
          onChangeSlide={(num: number) => setCurrentSlide(num)}
        />
        <div className="more-info-wrapper">
          <div className="content-info">
            <Title title={title} />
            <div className="info-items">
              <Location location={location} />
            </div>
            <div className="flex items-center info-items ">
              <Doors doors={doors} />
              <Divider />
              <Expand area={area} />
              {box?.toString()?.length > 0 ? (
                <>
                  <Divider />
                  <Box box={box} />
                </>
              ) : null}
              <Divider />
              <Stairs stairs={stairs} />
            </div>
            <SectionTitle title="Опис" />
            <Descrioption text={description} />
            <Realtor data={data} phonesCodes={phonesCodes} />
          </div>
        </div>
      </StyledCard>
    </>
  );
};

interface StyledCardProps {
  index: number;
  totalCards: number;
}

const StyledCard = styled.div<StyledCardProps>`
  position: absolute;
  height: calc(100svh - 80px);
  /* overflow: auto; */
  font-size: 80px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  overflow: auto;
  width: 100%;
  z-index: ${({ index }) => index};
  background: #2c2c2c;
  border-radius: 13px;
  top: ${({ index, totalCards }) =>
    totalCards === index ? 20 : totalCards - 1 === index ? 0 : -20}px;
  scale: ${({ index, totalCards }) =>
    totalCards === index ? 1 : totalCards - 1 === index ? 0.95 : 0.9};
  filter: blur(
    ${({ index, totalCards }) => (totalCards === index ? 0 : 1.2)}px
  );
  .maininfo,
  .slick-arrow {
    transition: all 0.3s;
    opacity: ${({ index, totalCards }) => (totalCards === index ? 1 : 0)};
  }

  .more-info-wrapper {
    padding: 13px 15px;
    .info-items {
      font-family: "Open Sans", sans-serif;
      font-size: 13px !important;
      font-style: normal;
      line-height: normal;
      letter-spacing: 0.26px;
    }
    img {
      height: 16px;
      margin-right: 6px;
    }
    .back-btn {
      position: fixed;
      top: 10px;
      left: 10px;
    }
    .content-wrapper {
      border-radius: 13px;
      background: #464646;
      height: calc(100vh - 220px);
      overflow: auto;
      margin-bottom: 15px;
      position: relative;
      .content-info {
        padding: 14px;
      }
    }
  }
  .tags {
    position: absolute;
    top: 18px;
    right: 18px;
    display: flex;
    align-items: center;
    gap: 2px;
    @media (max-width: 600px) {
      width: 200px;
      flex-wrap: wrap;
      justify-content: end;
    }
  }
`;

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
}: Props) => {
  const [open, setOpen] = useState<boolean>(history);
  const cardRef = useRef(null);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [isDraged, setIsDraged] = useState<boolean>(false);
  const posX = useRef(0);
  const mouseX = useRef(0);
  const [direction, setDirection] = useState<string | null>(null);

  const handleStartDrag = (e) => {
    if (!open && totalCards === index) {
      setIsDrag(true);
      const cientX = e?.touches?.length ? e?.touches[0]?.clientX : e.clientX;
      const offSetLeft = cardRef.current.offsetLeft;
      posX.current = cientX - offSetLeft;
    }
  };

  const handleGetDirection = (): string => {
    const xValue = mouseX.current;
    return xValue < 0 ? "left" : "right";
  };

  const handleCheckIsClick = (e?: any) => {
    const clickableClasses = ["slick-arrow", "clickable"];
    if (
      e &&
      (e.target.classList.contains(clickableClasses[0]) ||
        e.target.classList.contains(clickableClasses[1]))
    ) {
      return false;
    } else if (mouseX.current === 0) {
      return true;
    } else if (mouseX.current <= 0) {
      return mouseX.current >= -10;
    } else {
      return mouseX.current <= 10;
    }
  };

  const handleAnimateBackCards = () => {
    const backCard = document.querySelector(`.swapper-card${index - 1}`);

    console.log(backCard, index - 1);
    if (backCard) {
      backCard.style.cssText = `
        transition: all .3s;
        top: 20px;
        scale: 1;
      `;
    }
  };

  const handleDrag = (e) => {
    if (!isDrag && !handleCheckIsClick()) {
      setIsDraged(true);
    }
    if (isDrag) {
      const cientX = e?.touches?.length ? e?.touches[0]?.clientX : e.clientX;
      const mouseXPos = cientX - posX.current;
      cardRef.current.style.transform = `translateX(${mouseXPos}px)`;
      mouseX.current = mouseXPos;
      const currentDirection = handleGetDirection();
      setDirection(currentDirection);
    }
  };

  const handleCheckIsSwiped = () => {
    const xValue = mouseX.current;
    const cardWidth = cardRef.current.offsetWidth;

    if (xValue < 0) {
      return cardWidth + xValue <= cardWidth / 2 ? "left" : false;
    } else {
      return cardWidth - xValue <= cardWidth / 2 ? "right" : false;
    }
  };

  const handleDragEnd = (e) => {
    if (!isDraged && handleCheckIsClick(e)) {
      setOpen(true);
    }
    setIsDrag(false);
    setIsDraged(false);
    setDirection(null);
    const isSwiped = handleCheckIsSwiped();
    if (isSwiped) {
      if (history) {
        onChangeStatus(isSwiped);
        cardRef.current.style.transform = `translateX(${0}px)`;
      } else {
        cardRef.current.style.transition = "all .4s";
        cardRef.current.style.opacity = `0`;
        cardRef.current.style.transform = `translateX(${
          isSwiped === "right"
            ? window.innerWidth * 1.5
            : -window.innerWidth * 2
        }px) scale(0)`;
        setTimeout(() => {
          onChangeStatus(isSwiped);
          handleAnimateBackCards();
        }, 500);
      }
    } else {
      cardRef.current.style.transform = `translateX(${0}px)`;
    }
    mouseX.current = 0;
  };

  const handleSendRealtor = () => {
    setOpen(false);
    onSendRealtor();
  };

  const handleCloseMoreInfo = () => {
    setOpen(false);
    if (history && onClose) {
      onClose();
    }
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

  return (
    <>
      {open && (
        <MoreInfo
          type={type}
          price={price}
          currency={currency}
          location={location}
          doors={doors}
          area={area}
          stairs={stairs}
          box={box}
          title={title}
          description={description}
          index={index}
          onClose={handleCloseMoreInfo}
          images={images}
          onChangeStatus={onChangeStatus}
          onSendRealtor={handleSendRealtor}
        />
      )}
      {direction === "right" && <SwipeStatus status={direction === "right"} />}
      {direction === "left" && <SwipeStatus status={direction === "right"} />}

      <StyledCard
        ref={cardRef}
        index={index}
        onMouseDown={handleStartDrag}
        onMouseMove={handleDrag}
        onClick={handleDragEnd}
        onTouchStart={handleStartDrag}
        onTouchMove={handleDrag}
        onTouchEnd={handleDragEnd}
        totalCards={totalCards}
        draggable={false}
        className={`swapper-card${index}`}
      >
        <Price
          currency={currency}
          onChangeCurrency={onChangeCurrency}
          price={price}
        />
        <Type type={type} className="maininfo" />
        <MainInfo title={title} location={location} doors={doors} area={area} />
        <Slider images={images} index={index} />
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

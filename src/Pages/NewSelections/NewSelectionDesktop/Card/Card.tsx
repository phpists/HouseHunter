import styled from "styled-components";
import { Slider } from "./Slider/Slider";
import { Title } from "./Title";
import { Location } from "./Location";
import { Tags } from "./Tags";
import { Description } from "./Description";
import { Footer } from "./Footer/Footer";
import image from "../../../../assets/images/image.png";
import image2 from "../../../../assets/images/image2.png";
import { useEffect, useRef, useState } from "react";

interface Props {
  data: any;
  onSendRealtor?: (type: string, id: string) => void;
  onSwap?: (index: number, direction: string, id: string, type: string) => void;
  hide?: boolean;
  swipeAnimation?: string | null;
  isReload?: boolean;
}

export const Card = ({
  data,
  onSendRealtor,
  onSwap,
  hide,
  swipeAnimation,
  isReload,
}: Props) => {
  const cardRef = useRef<any>(null);
  const handleAnimateBackCards = () => {
    const backCard: any = document.querySelector(`.hide-card`);

    if (backCard) {
      backCard.style.cssText = `
        transition: all .2s;
        transform: translateY(-100% );
      `;
    }
  };

  const handleSwipeAnimation = () => {
    const windowWidth = window.innerWidth;
    cardRef.current.style.transition = "all .4s";
    cardRef.current.style.transform = `translateX(${
      swipeAnimation === "right" ? windowWidth : -windowWidth
    }px)`;
    setTimeout(handleAnimateBackCards, 300);
  };

  useEffect(() => {
    if (swipeAnimation && !hide) {
      handleSwipeAnimation();
    }
  }, [swipeAnimation]);

  const handleReload = () => {
    if (hide) {
      cardRef.current.style.transition = "all .3s";
      cardRef.current.style.transform = `translateY(calc(-100% - 8px)) scale(0.98))`;
    } else {
      cardRef.current.style.transition = "all 0s";
      cardRef.current.style.transform = `translateY(10px)`;
      setTimeout(() => {
        cardRef.current.style.transition = "all .4s";
      }, 100);
    }
  };

  useEffect(() => {
    isReload && handleReload();
  }, [isReload]);

  return (
    <StyledCard hide={hide} ref={cardRef} className={`${hide && "hide-card"}`}>
      <Slider
        onOpen={() => null}
        images={data?.img?.length > 0 ? data?.img?.map((i: any) => i.name) : []}
        category={data?.rubric_name}
      />
      <div className="flex flex-col justify-between card-content">
        <div className="card-text">
          <Title
            title={
              data?.title?.length > 0
                ? data?.title
                : data?.description?.length > 100
                ? `${data?.description?.substring(0, 100)}...`
                : data?.description ?? ""
            }
          />
          <Location location={data?.location_name} />
          <Tags
            doors={data?.rooms ? `${data?.rooms}к` : "-"}
            stairs={`${data?.address_apartment_number ?? "-"} із ${
              data?.address_storey ?? "-"
            }`}
          />
          <Description description={data?.description ?? ""} />
        </div>
        <Footer
          onSendRealtor={() =>
            !onSendRealtor ? null : onSendRealtor(data?.type, data?.id)
          }
          onSwap={(direction) =>
            !onSwap ? null : onSwap(0, direction, data?.id, data?.type)
          }
        />
      </div>
    </StyledCard>
  );
};

interface StyledCardProps {
  hide?: boolean;
}

const StyledCard = styled.div<StyledCardProps>`
  display: flex;
  /* display: grid;
  grid-template-columns: 570px max-content 1fr; */
  overflow: auto;
  min-height: 400px;
  height: calc(88vh - 48px);
  padding: 24px;
  border-radius: 20px;
  background: #313131;
  flex-shrink: 0;
  transform: ${({ hide }) =>
    hide ? "translateY(calc(-100% - 8px)) scale(0.98)" : "translateY(10px)"};
  z-index: ${({ hide }) => (hide ? 0 : 10)};
  filter: blur(${({ hide }) => (hide ? 10 : 0)}px);
  position: relative;
  /* transition: all 0.3s; */

  .card-text {
    max-height: calc(70vh - 48px);
    overflow: auto;
  }
  .card-content {
    margin-left: 40px;
    width: 100%;
  }
  @media (max-width: 1220px) {
    grid-template-columns: 500px max-content 1fr;
  }
  @media (max-width: 1120px) {
    grid-template-columns: 450px max-content 1fr;
  }
`;

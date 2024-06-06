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
  currency: string;
  onChangeCurrency: (value: string) => void;
  showLike?: boolean;
  status?: boolean;
  disabled?: boolean;
}

export const Card = ({
  data,
  onSendRealtor,
  onSwap,
  hide,
  swipeAnimation,
  isReload,
  currency,
  onChangeCurrency,
  showLike,
  status,
  disabled,
}: Props) => {
  const cardRef = useRef<any>(null);

  const handleAnimateBackCards = (isDefault?: boolean) => {
    const backCard: any = document.querySelector(`.hide-card`);

    if (backCard) {
      backCard.style.cssText = `
        transition: all .5s;
        transform: ${
          isDefault
            ? `translateY(calc(-100% - 8px)) scale(0.98))`
            : "translateY(-100%)"
        };
      `;
    }
  };

  const handleSwipeAnimation = () => {
    const windowWidth = window.innerWidth;
    cardRef.current.style.transition = "all .6s";
    cardRef.current.style.transform = `translateX(${
      swipeAnimation === "right" ? windowWidth : -windowWidth
    }px)`;
    setTimeout(handleAnimateBackCards, 500);
  };

  useEffect(() => {
    if (swipeAnimation && !hide) {
      handleSwipeAnimation();
    }
  }, [swipeAnimation]);

  const handleReload = () => {
    if (hide) {
      setTimeout(() => handleAnimateBackCards(true), 400);
    } else {
      cardRef.current.style.transition = "all 0s";
      cardRef.current.style.transform = `translateY(10px)`;
      setTimeout(() => {
        cardRef.current.style.transition = "all .4s";
      }, 200);
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
        currency={currency}
        onChangeCurrency={onChangeCurrency}
        price={data?.[`price_per_object_${currency?.toLowerCase()}`] ?? 0}
        showLike={showLike}
        status={status}
        tags={data?.tags_folder}
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
            stairs={`${data?.address_storey ?? "-"} із ${
              data?.storey_count ?? "-"
            }`}
            areaTotal={data?.area_total ?? "-"}
            areaKitchen={data?.area_kitchen ?? ""}
          />
          <Description description={data?.description ?? ""} />
        </div>
        <Footer
          disabled={disabled}
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
  max-width: 1400px;
  width: calc(100vw - 16px);
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

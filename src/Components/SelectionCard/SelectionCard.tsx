import { styled } from "styled-components";
import { Banner } from "./Banner/Banner";
import { Info } from "./Info/Info";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

interface Props {
  onOpen: () => void;
  isNew?: boolean;
  onSendRealtor?: () => void;
  area: string | number;
  currency: string;
  price: number;
  title: string;
  location: string;
  doors: number | string;
  stairs: string;
  description?: string;
  images: string[];
  onSwap?: (direction: string) => void;
  className?: string;
  noAnimation?: boolean;
  like?: boolean;
  isHide?: boolean;
}

export const SelectionCard = ({
  onOpen,
  isNew,
  onSendRealtor,
  area,
  currency,
  price,
  title,
  location,
  doors,
  stairs,
  description,
  images,
  onSwap,
  className,
  noAnimation,
  like,
  isHide,
}: Props) => {
  const controls = useAnimationControls();

  const handleSwap = (direction: string) => {
    if (onSwap) {
      !noAnimation && controls.start({ scale: 0, width: 0, margin: 0 });
      onSwap(direction);
    }
  };

  //   useEffect(() => {
  //     controls.start({
  //       scale: isHide ? 0 : 1,
  //       opacity: isHide ? 0 : 1,
  //       display: isHide ? "none" : "block",
  //     });
  //   }, [isHide]);

  useEffect(() => {
    controls.start({ scale: 1, opacity: 1 });
  }, []);

  return (
    <StyledSelectionCard
      className={`${className}`}
      animate={controls}
      transition={{
        type: "linear",
        stiffness: 260,
        damping: 30,
      }}
      initial={{ scale: 0, opacity: 0 }}
    >
      <Banner
        onOpen={onOpen}
        isNew={isNew}
        currency={currency}
        price={price}
        area={area}
        images={images}
        like={like}
      />
      <Info
        onOpen={onOpen}
        isNew={isNew}
        onSendRealtor={onSendRealtor}
        title={title}
        location={location}
        currency={currency}
        price={price}
        doors={doors}
        stairs={stairs}
        description={description}
        onSwap={handleSwap}
      />
    </StyledSelectionCard>
  );
};

const StyledSelectionCard = styled(motion.div)`
  cursor: pointer;
  height: max-content;
  &:hover .selection-card-footer {
    opacity: 1;
    visibility: visible;
    transform: translateX(0px);
  }
`;

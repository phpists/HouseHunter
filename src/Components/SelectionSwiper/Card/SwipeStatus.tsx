import { ReactComponent as Like } from "../../../assets/images/thumbs-up.svg";
import { ReactComponent as Dislike } from "../../../assets/images/thumbs-down.svg";
import { styled } from "styled-components";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

interface Props {
  status: string;
}

export const SwipeStatus = ({ status }: Props) => {
  const controls = useAnimationControls();
  const INITUAL_AIMATE = status
    ? { opacity: 0, right: -200 }
    : { opacity: 0, left: -200 };
  const ANIMATION = status
    ? { opacity: 1, right: 20 }
    : { opacity: 1, left: 20 };

  useEffect(() => {
    controls.start(ANIMATION);
  }, []);

  return (
    <StyledSwipeStatus
      status={status}
      className="flex items-center justify-center"
      initial={INITUAL_AIMATE}
      animate={controls}
      transition={{
        type: "linear",
        stiffness: 260,
        damping: 30,
      }}
    >
      {status ? <Like /> : <Dislike />}
    </StyledSwipeStatus>
  );
};
const StyledSwipeStatus = styled(motion.div)<Props>`
  position: fixed;
  top: 51%;
  transform: translateY(-50%);
  ${({ status }) => (status ? `right: 20px;` : `left: 20px`)};
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(3px);
  z-index: 100;
  svg {
    height: 50px;
    width: 50px;
    path {
      stroke: ${({ status }) => (status ? "#81FB21" : "#FB3232")};
    }
  }
`;

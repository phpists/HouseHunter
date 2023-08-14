import { useEffect } from "react";
import { styled } from "styled-components";
import { ReactComponent as Like } from "../../assets/images/thumbs-up.svg";
import { ReactComponent as Dislike } from "../../assets/images/thumbs-down.svg";
import { motion } from "framer-motion";

interface Props {
  status: string;
  onEnd: () => void;
}

export const Animation = ({ status, onEnd }: Props) => {
  const INIT_ROTATE = status === "right" ? 180 : 0;
  const ROTATE_TO = status === "right" ? 0 : 180;

  useEffect(() => {
    if (status) {
      setTimeout(onEnd, 3000);
    }
  }, [status]);

  return (
    <>
      {status && (
        <StyledAnimation
          className="flex items-center justify-center flex-col"
          status={status === "right"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            type: "linear",
            stiffness: 260,
            damping: 30,
          }}
        >
          <motion.div
            initial={{ scale: 0, rotate: INIT_ROTATE }}
            animate={{ rotate: ROTATE_TO, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 30,
              delay: 0.3,
            }}
          >
            {status ? <Like /> : <Dislike />}
          </motion.div>
          <motion.div
            initial={{ scale: 0, opacity: 0, translateY: -100 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 50,
              delay: 0.6,
            }}
          >
            <div className="title">
              {status === "right" ? "Подобається" : "Не подобається"}
            </div>
            <div className="subtitle">Статус змінено</div>
          </motion.div>
        </StyledAnimation>
      )}
    </>
  );
};

interface StyledAnimationProps {
  status: boolean;
}

const StyledAnimation = styled(motion.div)<StyledAnimationProps>`
  position: absolute;
  inset: 0;
  border-radius: 13px;
  box-shadow: 0px 0px 0px 1px
    ${({ status }) =>
      status ? "rgba(129, 251, 33, 0.70)" : "rgba(251, 50, 50, 0.70)"}
    inset;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(7px);
  z-index: 1000;
  text-align: center;
  line-height: 118%;
  .title {
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0.32px;
    height: 19px;
  }
  .subtitle {
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.24px;
    opacity: 0.5;
    height: 14px;
  }
  svg {
    margin-bottom: 16px;
    height: 30px;
    path {
      stroke: ${({ status }) => (status ? "#81FB21" : "#FB3232")};
    }
  }
`;

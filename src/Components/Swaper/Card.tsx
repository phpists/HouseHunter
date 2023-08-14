// @ts-nocheck
import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
  animate,
} from "framer-motion";
import styled from "styled-components";
import { Status } from "./Status";
import { Animation } from "./Animation";

export const Card = ({
  children,
  style,
  onSubmit,
  id,
  zIndex,
  animation,
  drag,
  cardStatusChanged,
  onAnimationEnd,
  ...props
}: any) => {
  // motion stuff
  const cardElem = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const controls = useAnimation();
  const rotate = useTransform(x, [-100, 100], [-10, 10]);
  const [constrained, setConstrained] = useState(true);
  const [direction, setDirection] = useState();
  const [velocity, setVelocity] = useState();
  const [showStatus, setShowStatus] = useState(false);
  const [statusChanged, setStatusChanged] = useState<null | string>(null);
  const [dragDisabled, setDragDisabled] = useState<boolean>(false);
  const [isDraging, setIsDraging] = useState<boolean>(false);

  const getVote = (childNode, parentNode) => {
    const childRect = childNode.getBoundingClientRect();
    const parentRect = parentNode.getBoundingClientRect();
    let result =
      parentRect.left >= childRect.right
        ? false
        : parentRect.right <= childRect.left
        ? true
        : undefined;
    return result;
  };

  // determine direction of swipe based on velocity
  const getDirection = () => {
    return velocity >= 1 ? "right" : velocity <= -1 ? "left" : direction;
  };

  const getTrajectory = () => {
    setShowStatus(x.get() > 50 || x.get() < -50);
    if (x) {
      setVelocity(x?.getVelocity());
      setDirection(getDirection());
    }
  };

  useEffect(() => {
    const unsubscribeY = y.on("change", () => {
      const yValue = y.get();
      if (yValue < 0 || yValue > 0) {
        y.set(0);
      }
    });

    return () => {
      unsubscribeY();
    };
  });

  const handleCheckIsSwiped = () => {
    const xValue = x.get();

    if (xValue < 0) {
      return window.innerWidth + x.get() <= 150;
    } else {
      return window.innerWidth - x.get() <= 150;
    }
  };

  const handleSwapHideAnimation = () => {
    const xValue = x.get();

    if (xValue < 0) {
      animate(x, -window.innerWidth - 100);
    } else {
      animate(x, window.innerWidth + 100);
    }
  };

  const onDragEnd = () => {
    setShowStatus(false);
    animate(x, 0);
    setIsDraging(false);
    const isSwiped = handleCheckIsSwiped();
    if (isSwiped && !cardStatusChanged) {
      handleSwapHideAnimation();
      setTimeout(() => onSubmit(direction), 100);
      if (animation) {
        animate(x, 0);
        setShowStatus(false);
        setTimeout(() => setDragDisabled(true), 500);
        setTimeout(() => setStatusChanged(direction), 1000);
      }
    }
  };

  const handleToggleDraggin = (isDragable: boolean) => {
    setDragDisabled(!isDragable);
    if (!isDragable) {
      animate(x, 0, 0);
    }
  };

  const handleRate = (type: boolean) => {
    console.log(type);
  };

  useEffect(() => {
    if (!animation && cardStatusChanged) {
      setDragDisabled(true);
      animate(
        x,
        cardStatusChanged === "right" ? window.innerWidth : -window.innerWidth
      );
      setTimeout(() => {
        animate(x, 0);
        setDragDisabled(false);
        onAnimationEnd(cardStatusChanged);
      }, 200);
    }
  }, [cardStatusChanged]);

  return (
    <>
      <StyledCard
        animate={controls}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0, left: 1, right: 1 }}
        ref={cardElem}
        style={{
          x,
          zIndex,
          rotate,
          borderRadius: 13,
          y,
        }}
        onDrag={getTrajectory}
        onDragStart={() => setIsDraging(true)}
        onDragEnd={() => onDragEnd()}
        onTouchEnd={() => animate("y", 0)}
        drag={drag && !dragDisabled}
        {...props}
        className="card-swipe"
      >
        {(statusChanged || cardStatusChanged) && animation && (
          <Animation
            status={statusChanged || cardStatusChanged}
            onEnd={() => {
              setStatusChanged(null);
              setDragDisabled(false);
              onAnimationEnd(cardStatusChanged);
            }}
          />
        )}
        {React.cloneElement(children, {
          onToggleDragging: handleToggleDraggin,
          isDraging,
        })}
      </StyledCard>
      {showStatus && !statusChanged && <Status status={x.get() > 50} />}
    </>
  );
};

const StyledCard = styled(motion.div)`
  position: absolute;
  border-radius: 13px;
  background: #2c2c2c;
  height: 100%;
  width: 100%;
`;

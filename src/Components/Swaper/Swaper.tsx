// @ts-nocheck
import { styled } from "styled-components";
import { Children } from "react";
import { Card } from "./Card";
import { Empty } from "./Empty";

interface Props {
  onSubmit: () => voidl;
  cardStatusChanged: null | string;
  onAnimationEnd: (direction: string) => void;
}

export const Swapper = ({
  onSubmit,
  animation,
  cardStatusChanged,
  onAnimationEnd,
  children,
}: any) => {
  return (
    <StyledCards>
      {Children.toArray(children)?.length > 0 ? (
        Children.toArray(children).map((item, index) => {
          let isTop = index === Children.toArray(children).length - 1;
          return (
            <Card
              drag={isTop}
              key={item.key || index}
              onSubmit={(result) => onSubmit(item, result)}
              zIndex={index}
              animation={animation}
              cardStatusChanged={cardStatusChanged}
              onAnimationEnd={onAnimationEnd}
            >
              {item}
            </Card>
          );
        })
      ) : (
        <Empty />
      )}
    </StyledCards>
  );
};

const StyledCards = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 1px dashed rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.3);
  border-radius: 13px;
`;

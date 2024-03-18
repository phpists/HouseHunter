import { styled } from "styled-components";
import { ShowMore } from "./ShowMore";
import { useState } from "react";

interface Props {
  description: string;
}

export const Descrioption = ({ description }: Props) => {
  const [showAll, setShowAll] = useState<boolean>(true);
  return (
    <>
      <StyledDescrioption draggable={false}>
        {description.slice(0, showAll ? description.length : 100)}
        {!showAll && "..."}
      </StyledDescrioption>
      {!showAll && (
        <ShowMore title="Показати більше" onClick={() => setShowAll(true)} />
      )}
    </>
  );
};

const StyledDescrioption = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: 130%; /* 26px */
  letter-spacing: 0.4px;
  opacity: 0.8;
  margin-bottom: 20px;
  @media (max-width: 1000px) {
    font-family: "Open Sans", sans-serif;
    font-size: 15px;
    font-weight: 400;
    letter-spacing: 0.3px;
  }
`;

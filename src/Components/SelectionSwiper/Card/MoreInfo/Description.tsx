import { styled } from "styled-components";
import { ShowMore } from "./ShowMore";
import { useState } from "react";

interface Props {
  text: string;
}

export const Descrioption = ({ text }: Props) => {
  const [showAll, setShowAll] = useState<boolean>(text.length < 100);
  return (
    <>
      <StyledDescrioption draggable={false}>
        {text.slice(0, showAll ? text.length : 100)}
      </StyledDescrioption>
      {!showAll && (
        <ShowMore title="Показати більше" onClick={() => setShowAll(true)} />
      )}
    </>
  );
};

const StyledDescrioption = styled.div`
  font-family: "Open Sans", sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.3px;
  margin-bottom: 20px;
`;

import { styled } from "styled-components";
import { ShowMore } from "./ShowMore";
import { useState } from "react";

interface Props {
  data: { title: string; icon: string }[];
  moreTitle?: string;
}

export const List = ({ data, moreTitle }: Props) => {
  const [showAll, setShowAll] = useState<boolean>(data.length <= 5);
  const count = data.length;

  return (
    <>
      <StyledList>
        {data.slice(0, showAll ? data.length : 5).map((item, i) => (
          <div key={i} className="flex items-center">
            <img src={item.icon} alt="" className="mr-4" />
            <span>{item.title}</span>
          </div>
        ))}
      </StyledList>
      {!showAll && (
        <ShowMore
          title={`Ще ${count - 5} ${moreTitle}`}
          onClick={() => setShowAll(true)}
        />
      )}
    </>
  );
};

const StyledList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: 10px 60px;
  margin-bottom: 20px;
  font-family: "Overpass", sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    font-size: 15px;
    letter-spacing: 0.3px;
    img {
      margin-right: 10px;
    }
  }
`;

import { styled } from "styled-components";
import { ShowMore } from "./ShowMore";

interface Props {
  data: { title: string; icon: string }[];
}

export const AmenitiesList = ({ data }: Props) => (
  <>
    <StyledAmenitiesList>
      {data.map((item, i) => (
        <div key={i} className="flex items-center">
          <img src={item.icon} alt="" className="mr-4" />
          <span>{item.title}</span>
        </div>
      ))}
    </StyledAmenitiesList>
    <ShowMore title="Ще 4 зручності" onClick={() => null} />
  </>
);

const StyledAmenitiesList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: 10px 60px;
  margin-bottom: 20px;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: 118%;
  letter-spacing: 0.4px;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    font-size: 15px;
    letter-spacing: 0.3px;
    img {
      margin-right: 10px;
    }
  }
`;

import { styled } from "styled-components";
import { addZero } from "../../../../../helpers";

interface Props {
  currentSlide: number;
  total: number;
}

export const SlideCount = ({ currentSlide, total }: Props) => (
  <StyledSlideCount className="flex items-center">
    <div>{addZero(currentSlide)}</div> /<div>{addZero(total)}</div>
  </StyledSlideCount>
);

const StyledSlideCount = styled.div`
  position: absolute;
  left: 20px;
  bottom: 20px;
  font-family: Overpass;
  font-size: 15px;
  font-weight: 300;
  line-height: 19px;
  letter-spacing: 0.02em;
  text-align: left;
  z-index: 4;
  background: #2c2c2c80;
  height: 24px;
  padding: 3px 6px 2px 6px;
  border-radius: 5px;
  border: solid 1px #ffffff26;
  backdrop-filter: blur(18px);
  @media (max-width: 1000px) {
    display: none;
  }
`;

import { styled } from "styled-components";
import { addZero } from "../../../../helpers";

interface Props {
  currentSlide: number;
  total: number;
}

export const SlideCount = ({ currentSlide, total }: Props) => (
  <StyledSlideCount className="flex items-center">
    <div>{addZero(currentSlide)}</div> <span>/</span>{" "}
    <div>{addZero(total)}</div>
  </StyledSlideCount>
);

const StyledSlideCount = styled.div`
  position: absolute;
  left: 10px;
  bottom: 10px;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: 118%;
  letter-spacing: 0.3px;
  z-index: 4;
  span {
    color: rgba(255, 255, 255, 0.4);
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;

import { styled } from "styled-components";
import { addZero } from "../../../helpers";

interface Props {
  currentSlide: number;
  total: number;
}

export const SlideCount = ({ currentSlide, total }: Props) => (
  <StyledSlideCount className="flex items-center justify-center">
    {addZero(currentSlide)}/{addZero(total)}
  </StyledSlideCount>
);

const StyledSlideCount = styled.div`
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: 1;
  letter-spacing: 0.3px;
  z-index: 4;
  padding: 5px 10px;
  border-radius: 100px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  height: 24px;
  width: max-content;
`;

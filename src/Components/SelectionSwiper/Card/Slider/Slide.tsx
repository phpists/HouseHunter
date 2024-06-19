import { styled } from "styled-components";

interface Props {
  image: string;
  active: boolean;
  onPhotoView: () => void;
  index: number;
}

export const Slide = ({ image, active, onPhotoView, index }: Props) => (
  <StyledSlide
    image={active ? image : ""}
    className="clickable"
    onClick={onPhotoView}
    index={index}
  >
    <div className="shadow clickable"></div>
  </StyledSlide>
);

interface StyledSlideProps {
  image: string;
  index: number;
}

const StyledSlide = styled.div<StyledSlideProps>`
  transition: all 0.3s;
  background: url(${({ image }) => image}) center/cover no-repeat;
  height: calc(100svh - 80px);
  position: relative;
  .shadow {
    content: "";
    transition: all 0.3s;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      11deg,
      #2c2c2c 7.62%,
      rgba(44, 44, 44, 0) 47.6%
    );
    opacity: 1;
    z-index: ${({ index }) => index};
  }
`;

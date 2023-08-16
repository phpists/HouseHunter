import { styled } from "styled-components";

interface Props {
  image: string;
}

export const Slide = ({ image }: Props) => (
  <StyledSlide image={image} className="clickable" />
);

interface StyledSlideProps {
  image: string;
}

const StyledSlide = styled.div<StyledSlideProps>`
  transition: all 0.3s;
  background: url(${({ image }) => image}) center/cover no-repeat;
  height: calc(100svh - 240px);
`;

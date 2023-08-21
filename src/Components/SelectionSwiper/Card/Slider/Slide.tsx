import { styled } from "styled-components";

interface Props {
  image: string;
  active: boolean;
}

export const Slide = ({ image, active }: Props) => (
  <StyledSlide image={active ? image : ""} className="clickable" />
);

interface StyledSlideProps {
  image: string;
}

const StyledSlide = styled.div<StyledSlideProps>`
  transition: all 0.3s;
  background: url(${({ image }) => image}) center/cover no-repeat;
  height: calc(100svh - 240px);
`;

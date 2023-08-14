import { styled } from "styled-components";

interface Props {
  image: string;
  isNew?: boolean;
  onOpen: () => void;
}

export const Slide = ({ image, isNew, onOpen }: Props) => (
  <StyledSlide image={image} isNew={isNew} onClick={onOpen} />
);

interface StyledSlideProps {
  image: string;
  isNew?: boolean;
}

const StyledSlide = styled.div<StyledSlideProps>`
  height: ${({ isNew }) => (isNew ? 320 : 227)}px;
  background: url(${({ image }) => image}) center/cover no-repeat;
  @media (max-width: 1000px) {
    height: 25vw;
  }
  @media (max-width: 800px) {
    height: 40vw;
  }
`;

import { styled } from "styled-components";

interface Props {
  image: string;
  isNew?: boolean;
  onOpen: () => void;
  active: boolean;
}

export const Slide = ({ image, isNew, onOpen, active }: Props) => (
  <StyledSlide image={active ? image : ""} isNew={isNew} onClick={onOpen} />
);

interface StyledSlideProps {
  image: string;
  isNew?: boolean;
}

const StyledSlide = styled.div<StyledSlideProps>`
  height: ${({ isNew }) => (isNew ? "35vh" : "227px")};
  max-height: 320px;
  background: url(${({ image }) => image}) center/cover no-repeat;
  @media (max-width: 1000px) {
    height: 25vw;
  }
  @media (max-width: 800px) {
    height: 40vw;
  }
`;

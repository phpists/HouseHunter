import { styled } from "styled-components";

interface Props {
  image: string;
  onOpen: () => void;
}

export const Slide = ({ image, onOpen }: Props) => (
  <StyledSlide image={image} onClick={onOpen} />
);

interface StyledSlideProps {
  image: string;
  isNew?: boolean;
}

const StyledSlide = styled.div<StyledSlideProps>`
  min-height: 400px;
  height: calc(85vh - 46px);
  background: url(${({ image }) => image}) center/cover no-repeat;
  width: 570px;
  flex-shrink: 0;

  @media (max-width: 1220px) {
    width: 500px;
  }
  @media (max-width: 1120px) {
    width: 450px;
  }
  @media (max-width: 1080px) {
    width: 400px;
  }
`;

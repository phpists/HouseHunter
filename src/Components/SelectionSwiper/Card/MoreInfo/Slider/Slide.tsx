import { styled } from "styled-components";

interface Props {
  image: string;
  onPhotoView: () => void;
}

export const Slide = ({ image, onPhotoView }: Props) => (
  <StyledSlide image={image} onClick={onPhotoView} />
);

interface StyledSlideProps {
  image: string;
}

const StyledSlide = styled.div<StyledSlideProps>`
  height: 222px;
  background: url(${({ image }) => image}) center/cover no-repeat;
  border-radius: 13px 13px 0 0;
`;

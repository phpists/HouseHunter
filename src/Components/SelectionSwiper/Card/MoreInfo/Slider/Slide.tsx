import { styled } from "styled-components";

interface Props {
  image: string;
  onPhotoView: () => void;
  active: boolean;
}

export const Slide = ({ image, onPhotoView, active }: Props) => (
  <StyledSlide
    image={active ? image : ""}
    className="clickable"
    onClick={onPhotoView}
  />
);

interface StyledSlideProps {
  image: string;
}

const StyledSlide = styled.div<StyledSlideProps>`
  height: 222px;
  background: url(${({ image }) => image}) center/cover no-repeat;
  border-radius: 13px 13px 0 0;
`;

import styled from "styled-components";
import { Photo } from "./Photo";

interface Props {
  images: string[];
  onChangeSlide: (num: number) => void;
}

export const Photos = ({ images, onChangeSlide }: Props) => (
  <StyledPhotos className="hide-scroll">
    {images?.map((photo, i) => (
      <Photo key={i} photo={photo} onClick={() => onChangeSlide(1 + i)} />
    ))}
  </StyledPhotos>
);

const StyledPhotos = styled.div`
  margin-left: 8px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  gap: 8px;
  min-height: 400px;
  height: 81vh;
  overflow: auto;
`;

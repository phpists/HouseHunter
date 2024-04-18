import styled from "styled-components";
import { Photo } from "./Photo";
import { useEffect, useRef } from "react";

interface Props {
  images: string[];
  onChangeSlide: (num: number) => void;
}

export const Photos = ({ images, onChangeSlide }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTo({ top: 0 });
    }
  }, [images]);

  return (
    <StyledPhotos className="hide-scroll" ref={wrapperRef}>
      {images?.map((photo, i) => (
        <Photo key={i} photo={photo} onClick={() => onChangeSlide(1 + i)} />
      ))}
    </StyledPhotos>
  );
};

const StyledPhotos = styled.div`
  margin-left: 8px;
  display: grid;
  grid-template-columns: 100px;
  grid-auto-rows: max-content;
  gap: 8px;
  min-height: 400px;
  height: calc(80vh - 40px);
  overflow: auto;
  flex-shrink: 0;
  width: 100px;
`;

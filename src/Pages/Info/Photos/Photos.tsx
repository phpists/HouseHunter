import { styled } from "styled-components";
import { Photo } from "./Photo";
import { ShowButton } from "./ShowButton";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoSlider } from "react-photo-view";
import { useState } from "react";
import noPhoto from "../../../assets/images/no-photo.svg";
import { BackButton } from "../../../Components/BackButton";
import { PhotosView } from "./PhotosView/Photos";

interface Props {
  onClose: () => void;
  photos: string[];
}

export const Photos = ({ photos, onClose }: Props) => {
  const [viewPhoto, setViewPhoto] = useState<boolean>(false);
  const [defaultPhoto, setDefaultPhoto] = useState<number | null>(null);

  const handleCloseViewPhoto = () => {
    setViewPhoto(false);
    setDefaultPhoto(null);
  };

  const handleOpenViewPhoto = (index: number) => {
    setViewPhoto(true);
    setDefaultPhoto(index);
  };

  return (
    <>
      <PhotosView
        open={viewPhoto}
        onClose={handleCloseViewPhoto}
        images={photos}
        defaultPhoto={defaultPhoto}
      />
      <StyledPhotos photosCount={photos.length}>
        <BackButton onClick={onClose} classes="back-btn" />
        {photos.length > 0 && <ShowButton onClick={() => setViewPhoto(true)} />}
        <div className="grid">
          {photos?.length === 0 ? (
            <Photo photo={noPhoto} className={`photo-card-1`} />
          ) : (
            photos
              .slice(0, 5)
              .map((photo, i: number) => (
                <Photo
                  key={i}
                  photo={photo}
                  className={`photo-card-${1 + i}`}
                  onOpen={() => handleOpenViewPhoto(i)}
                />
              ))
          )}
        </div>
      </StyledPhotos>
    </>
  );
};

interface StyledPhotosProps {
  photosCount: number;
}

const StyledPhotos = styled.div<StyledPhotosProps>`
  position: relative;
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 206px;
    gap: 8px;
    border-radius: 12px;
    overflow: hidden;
    div {
      &:first-child {
        grid-column: 1/3;
        grid-row: 1/3;
      }
    }
    ${({ photosCount }) => {
      if (photosCount === 4) {
        return `
           .photo-card-4 {
                grid-column: 3/5;
            }
          `;
      } else if (photosCount === 3) {
        return `
           .photo-card-2,
           .photo-card-3{
                grid-column: 3/5;
            }
          `;
      } else if (photosCount === 2) {
        return `
            .photo-card-2 {
                grid-column: 3/5;
                grid-row: 1/3;
            }
          `;
      } else if (photosCount === 1 || photosCount === 0) {
        return `
            .photo-card-1 {
                grid-column: 1/5 !important;
                grid-row: 1/3 !important;
                height: 420px;
            }
          `;
      }
      return "";
    }}
  }
  .back-btn {
    position: absolute;
    top: 15px;
    left: 12px;
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;

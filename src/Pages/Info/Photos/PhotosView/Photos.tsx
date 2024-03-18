import { styled } from "styled-components";
import { BackButton } from "./BackButton";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PhotoProvider, PhotoSlider, PhotoView } from "react-photo-view";

interface Props {
  open: boolean;
  onClose: () => void;
  images: string[];
  defaultPhoto: number | null;
  preview?: boolean;
}

export const PhotosView = ({
  open,
  onClose,
  images,
  defaultPhoto,
  preview,
}: Props) => {
  const [openView, setOpenView] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const photosViewRef = useRef<HTMLDivElement>(null);

  const handleCheckWidth = () => {
    if (window.innerWidth > 1000) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleCheckWidth);
    return () => window.removeEventListener("resize", handleCheckWidth);
  }, []);

  useEffect(() => {
    if (open && defaultPhoto?.toString() && photosViewRef.current) {
      const photo: any = photosViewRef.current.children[1 + defaultPhoto];
      const photoOffsetTop = photo?.offsetTop ?? 0;
      photosViewRef.current.scroll({
        top: photoOffsetTop,
      });
    }
  }, [open]);

  const handleOpenPhoto = (index: number) => {
    setOpenView(true);
    setIndex(index);
  };

  return (
    <div>
      {preview && <BackButton onClick={onClose} />}
      {open && (
        <StyledPhotosView
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 30,
          }}
          ref={photosViewRef}
          className="overlay"
          onClick={(e: any) =>
            e.target.classList?.contains("overlay") && onClose()
          }
        >
          <PhotoSlider
            images={images.map((item) => ({ src: item, key: item }))}
            visible={openView}
            onClose={() => setOpenView(false)}
            index={index}
            onIndexChange={(index: number) => setIndex(index)}
          />
          {images.map((image, i) => (
            <img
              key={i}
              src={image}
              alt=""
              onClick={() => handleOpenPhoto(i)}
            />
          ))}
        </StyledPhotosView>
      )}
    </div>
  );
};

const StyledPhotosView = styled(motion.div)`
  position: fixed;
  z-index: 500;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: #45454587;
  overflow: auto;
  backdrop-filter: blur(10px);
  overflow: auto;
  img {
    margin: 20px auto;
    height: 90vh;
  }
`;

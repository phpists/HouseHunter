import { styled } from "styled-components";
import { BackButton } from "./BackButton";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PhotoProvider, PhotoSlider, PhotoView } from "react-photo-view";

interface Props {
  open: boolean;
  onClose: () => void;
  images: string[];
  defaultPhoto: number | null;
}

export const PhotosView = ({ open, onClose, images, defaultPhoto }: Props) => {
  const [openView, setOpenView] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

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
    if (open && defaultPhoto?.toString()) {
      setOpenView(true);
      setIndex(defaultPhoto);
    }
  }, [open]);

  const handleOpenPhoto = (index: number) => {
    setOpenView(true);
    setIndex(index);
  };

  return (
    <>
      {open && (
        <StyledPhotosView
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 30,
          }}
        >
          <BackButton onClick={onClose} />
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
    </>
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
  background: #454545;
  overflow: auto;
  img {
    width: 100%;
  }
`;

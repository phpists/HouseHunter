import { styled } from "styled-components";
import { BackButton } from "./BackButton";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";

interface Props {
  open: boolean;
  onClose: () => void;
  images: string[];
}

export const PhotosView = ({ open, onClose, images }: Props) => {
  const handleCheckWidth = () => {
    if (window.innerWidth > 1000) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleCheckWidth);
    return () => window.removeEventListener("resize", handleCheckWidth);
  }, []);

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
          <PhotoProvider bannerVisible={false} photoClosable>
            {images.map((image, i) => (
              <PhotoView src={image}>
                <img src={image} alt="" />
              </PhotoView>
            ))}
          </PhotoProvider>
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
  &::-webkit-scrollbar {
    display: none !important;
  }
  img {
    width: 90%;
    margin: 20px auto;
  }
`;

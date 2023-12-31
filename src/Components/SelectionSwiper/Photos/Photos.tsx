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

export const Photos = ({ open, onClose, images }: Props) => {
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
        <StyledPhotos
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
        </StyledPhotos>
      )}
    </>
  );
};

const StyledPhotos = styled(motion.div)`
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

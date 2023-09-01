import { styled } from "styled-components";
import closeIcon from "../../../assets/images/close-.svg";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import noPhoto from "../../../assets/images/no-photo.svg";

interface Props {
  selectedMessage: any;
  onCloseSelectedMessage: () => void;
  rieltorName: string;
}

export const SelectedMessage = ({
  selectedMessage,
  onCloseSelectedMessage,
  rieltorName,
}: Props) => {
  const controls = useAnimationControls();
  const isOwner = selectedMessage.user === 0;
  const isPhoto =
    selectedMessage?.messege?.title || selectedMessage?.messege?.img;

  useEffect(() => {
    controls.start({ opacity: 1, translateY: 0 });
  }, []);

  const handleClose = () => {
    controls.start({ opacity: 0, translateY: 20 });
    setTimeout(onCloseSelectedMessage, 400);
  };

  return (
    <StyledSelectedMessage
      className="flex items-center justify-between"
      animate={controls}
      transition={{
        type: "linear",
        stiffness: 260,
        damping: 30,
      }}
      initial={{ translateY: 20, opacity: 0 }}
      isOwner={isOwner}
      isPhoto={isPhoto}
      photo={
        selectedMessage?.messege?.img?.length > 0
          ? selectedMessage?.messege?.img
          : noPhoto
      }
    >
      <div className="flex items-center">
        {isPhoto && <div className="photo" />}
        <div>
          <div className="name">{isOwner ? "Ви" : rieltorName}</div>
          <span>{isPhoto ? "Фотографія" : selectedMessage?.messege}</span>
        </div>
      </div>
      <img src={closeIcon} alt="" onClick={handleClose} className="close" />
    </StyledSelectedMessage>
  );
};

interface StyledSelectedMessageProps {
  isOwner: boolean;
  isPhoto: boolean;
  photo?: string;
}

const StyledSelectedMessage = styled(motion.div)<StyledSelectedMessageProps>`
  position: absolute;
  bottom: calc(100% + 2px);
  background: #343434;
  width: 100%;
  padding: 10px;
  border-radius: 9px 9px 0 0;
  z-index: 101;
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
  font-weight: 400;
  line-height: 118%;
  letter-spacing: 0.3px;
  left: 0;
  .name {
    color: ${({ isOwner }) => (isOwner ? "#81fb21" : "#98F9FF")};
    text-overflow: ellipsis;
    whitespace: nowrap;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    height: 18px;
  }
  span {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    max-width: 280px;
  }
  .photo {
    width: 36px;
    height: 36px;
    border-radius: 4px;
    margin-right: 9px;
    background: url(${({ photo }) => photo}) center/cover no-repeat;
  }
  .close {
    cursor: pointer;
  }
`;

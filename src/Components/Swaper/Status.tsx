import { styled } from "styled-components";
import likeIcon from "../../assets/images/thumbs-up.svg";
import dislikeIcon from "../../assets/images/thumbs-down.svg";

interface Props {
  status: boolean;
}

export const Status = ({ status }: Props) => (
  <StyledStatus className="flex items-center justify-center" status={status}>
    <img src={status ? likeIcon : dislikeIcon} alt="" />
  </StyledStatus>
);

interface StyledStatusProps {
  status: boolean;
}

const StyledStatus = styled.div<StyledStatusProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 80px;
  width: 80px;
  border-radius: 8px;
  background: ${({ status }) => (status ? "#5A9E49" : "#D15B5B")};
  z-index: 10000;
  opacity: 0.7;
  img {
    height: 80%;
  }
`;

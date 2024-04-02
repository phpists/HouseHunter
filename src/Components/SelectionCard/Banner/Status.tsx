import { styled } from "styled-components";
import { ReactComponent as LikeIcon } from "../../../assets/images/thumbs-up.svg";
import { ReactComponent as DislikeIcon } from "../../../assets/images/thumbs-down.svg";

interface Props {
  status: boolean;
  onOpen: () => void;
}

export const Status = ({ status, onOpen }: Props) => (
  <StyledStatus
    className="flex items-center justify-center"
    status={status}
    onClick={onOpen}
  >
    {status ? <LikeIcon /> : <DislikeIcon />}
  </StyledStatus>
);

interface StyledStatusProps {
  status: boolean;
}

const StyledStatus = styled.div<StyledStatusProps>`
  height: 40px;
  width: 40px;
  border-radius: 8px;
  background: ${({ status }) => (status ? "#5A9E49" : "#D15B5B")};
  z-index: 4;
  @media (max-width: 1000px) {
    width: 26px;
    height: 26px;
    border-radius: 6px;
    background: #464646;
    svg {
      height: 18px;
      path {
        stroke: ${({ status }) => (status ? "#81FB21" : "#ED3838")};
      }
    }
  }
`;

import { styled } from "styled-components";
import downloadIcon from "../../../assets/images/download.svg";
import { handleDownload } from "../../../helpers";

interface Props {
  photo: string;
}

export const Download = ({ photo }: Props) => (
  <StyledDownload
    className="flex items-center justify-center chat"
    onClick={() => handleDownload(photo)}
  >
    <img src={downloadIcon} alt="" className="chat" />
  </StyledDownload>
);

const StyledDownload = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  padding: 8px;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(3px);
  cursor: pointer;
`;

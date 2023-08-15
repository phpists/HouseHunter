import { styled } from "styled-components";
import sendIcon from "../../../assets/images/arrow-right.svg";

interface Props {
  onSend: () => void;
  loading: boolean;
}

export const SendButton = ({ onSend, loading }: Props) => (
  <StyledSendButton
    className={`flex items-center justify-center ${
      loading && "cursor-not-allowed opacity-90"
    }`}
    onClick={onSend}
  >
    <img src={sendIcon} alt="" />
  </StyledSendButton>
);

const StyledSendButton = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 10px;
  background: rgba(93, 99, 255, 0.7);
  margin-left: 4px;
  flex-shrink: 0;
  transition: all 0.3s;
  &:hover {
    background: rgba(93, 99, 255, 1);
  }
`;

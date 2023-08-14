import likeIcon from "../../../../assets/images/thumbs-up.svg";
import dislikeIcon from "../../../../assets/images/thumbs-down.svg";
import { SendButton } from "./SendButton";
import { ActionButton } from "./ActionButton";
import { styled } from "styled-components";

interface Props {
  onSendRealtor?: () => void;
  onSwap?: (direction: string) => void;
}

export const Footer = ({ onSendRealtor, onSwap }: Props) => (
  <StyledFooter className="selection-card-footer">
    <ActionButton
      icon={dislikeIcon}
      onClick={() => (onSwap ? onSwap("left") : null)}
      status={false}
    />
    <SendButton onClick={onSendRealtor} />
    <ActionButton
      icon={likeIcon}
      onClick={() => (onSwap ? onSwap("right") : null)}
      status={true}
    />
  </StyledFooter>
);

const StyledFooter = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  gap: 15px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  transform: translateY(30px);
  text-align: center;
`;

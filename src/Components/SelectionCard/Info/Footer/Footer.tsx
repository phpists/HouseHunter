import likeIcon from "../../../../assets/images/thumbs-up.svg";
import dislikeIcon from "../../../../assets/images/thumbs-down.svg";
import { SendButton } from "./SendButton";
import { ActionButton } from "./ActionButton";
import { styled } from "styled-components";

interface Props {
  onSendRealtor?: () => void;
  onSwap?: (direction: string) => void;
  disabled?: boolean;
}

export const Footer = ({ onSendRealtor, onSwap, disabled }: Props) => (
  <StyledFooter className="selection-card-footer">
    <ActionButton
      icon={dislikeIcon}
      onClick={() => (onSwap && !disabled ? onSwap("left") : null)}
      status={false}
      disabled={disabled}
    />
    <SendButton onClick={onSendRealtor} />
    <ActionButton
      icon={likeIcon}
      onClick={() => (onSwap && !disabled ? onSwap("right") : null)}
      status={true}
      disabled={disabled}
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
  margin-top: 27px;
`;

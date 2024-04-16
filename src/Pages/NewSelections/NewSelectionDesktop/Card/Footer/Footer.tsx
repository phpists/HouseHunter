import styled from "styled-components";
import { ActionButton } from "./ActionButton";
import { SendButton } from "./SendButton";

interface Props {
  onSendRealtor?: () => void;
  onSwap?: (direction: string) => void;
  disabled?: boolean;
}

export const Footer = ({ onSendRealtor, onSwap, disabled }: Props) => (
  <StyledFooter>
    <ActionButton
      type="dislike"
      onClick={() => (onSwap ? onSwap("left") : null)}
      disabled={disabled}
    />
    <ActionButton
      type="like"
      onClick={() => (onSwap ? onSwap("right") : null)}
      disabled={disabled}
    />
    <SendButton onClick={onSendRealtor} />
  </StyledFooter>
);

const StyledFooter = styled.div`
  display: grid;
  grid-template-columns: max-content max-content 1fr;
  gap: 10px;
  width: 100%;
`;

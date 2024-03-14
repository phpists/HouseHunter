import styled from "styled-components";
import { ActionButton } from "./ActionButton";
import { SendButton } from "./SendButton";

interface Props {
  onSendRealtor: () => void;
  onSwap: (direction: string) => void;
}

export const Footer = ({ onSendRealtor, onSwap }: Props) => (
  <StyledFooter>
    <ActionButton type="dislike" onClick={() => onSwap("left")} />
    <ActionButton type="like" onClick={() => onSwap("right")} />
    <SendButton onClick={onSendRealtor} />
  </StyledFooter>
);

const StyledFooter = styled.div`
  display: grid;
  grid-template-columns: max-content max-content 1fr;
  gap: 10px;
`;

import { styled } from "styled-components";
import messageIcon from "../../../assets/images/message-circle.svg";
import { Badge } from "./Badge";

interface Props {
  chatOpen: boolean;
  onToggleChat: () => void;
}

export const ChatButton = ({ chatOpen, onToggleChat }: Props) => (
  <StyledChatButton
    className={`flex items-center justify-center btn ${chatOpen && "active"}`}
    onClick={onToggleChat}
  >
    <Badge />
    <img src={messageIcon} alt="" />
  </StyledChatButton>
);

const StyledChatButton = styled.button`
  margin-left: 12px;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  position: relative;
  &.active {
    background: rgba(47, 161, 18, 0.18);
  }
  &:hover > .badge {
    border: 1.2px solid #8c8c8c;
  }
  &.active:hover > .badge {
    border: 1.2px solid #3d6832;
  }

  &.active > .badge {
    border: 1.2px solid #41563c;
  }
  @media (max-width: 1000px) {
    margin-left: 50px;
    &:hover > .badge {
      border: 1.2px solid #454545;
    }
  }
`;

import { styled } from "styled-components";

interface Props {
  onClick?: () => void;
}

export const SendButton = ({ onClick }: Props) => (
  <StyledSendButton
    className="flex items-center justify-center"
    onClick={onClick}
  >
    Надіслати ріелтору в чат
  </StyledSendButton>
);

const StyledSendButton = styled.div`
  height: 44px;
  flex-shrink: 0;
  border-radius: 9px;
  background: rgba(93, 99, 255, 0.7);
  transition: all 0.3s;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 118%;
  letter-spacing: 0.3px;
  width: 100%;
  &:hover {
    background: rgba(93, 99, 255, 1);
  }
`;

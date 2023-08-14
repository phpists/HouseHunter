import { styled } from "styled-components";

interface Props {
  onClick: () => void;
}

export const SendButton = ({ onClick }: Props) => (
  <StyledSendButton onClick={onClick}>
    Надіслати ріелтору в чат
  </StyledSendButton>
);

const StyledSendButton = styled.button`
  height: 44px;
  border-radius: 9px;
  width: 100%;
  margin: 0 15px;
  font-size: 15px;
  font-style: normal;
  line-height: 118%;
  letter-spacing: 0.3px;
  background: rgba(93, 99, 255, 0.7);
  transition: all 0.3s;
  &:hover {
    background: rgba(93, 99, 255, 1);
  }
`;

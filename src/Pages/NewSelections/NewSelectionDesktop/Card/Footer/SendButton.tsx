import styled from "styled-components";

interface Props {
  onClick: () => void;
}

export const SendButton = ({ onClick }: Props) => (
  <StyledSendButton
    className="flex items-center justify-center"
    onClick={onClick}
  >
    Надіслати в чат
  </StyledSendButton>
);

const StyledSendButton = styled.div`
  background: #5d63ffb2;
  height: 54px;
  border-radius: 9px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;

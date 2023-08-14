import { styled } from "styled-components";

interface Props {
  onClick: () => void;
}

export const ShowButton = ({ onClick }: Props) => (
  <StyledShowButton
    className="flex items-center justify-center"
    onClick={onClick}
  >
    Показати всі фото
  </StyledShowButton>
);

const StyledShowButton = styled.button`
  position: absolute;
  bottom: 12px;
  right: 12px;
  height: 39px;
  padding: 0 24px;
  flex-shrink: 0;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(18.5px);
  transition: all 0.3s;
  &:hover {
    background: #fff;
    color: #2c2c2c;
  }
`;

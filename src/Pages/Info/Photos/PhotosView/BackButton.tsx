import { styled } from "styled-components";
import { ReactComponent as ArrowIcon } from "../../../../assets/images/chevron-left.svg";

interface Props {
  onClick: () => void;
}

export const BackButton = ({ onClick }: Props) => (
  <StyledBackButton
    className="flex items-center justify-center"
    onClick={onClick}
  >
    <ArrowIcon />
  </StyledBackButton>
);

const StyledBackButton = styled.button`
  position: fixed;
  top: 15px;
  left: 12px;
  width: 34px;
  height: 37px;
  flex-shrink: 0;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(18.5px);
  transition: all 0.3s;
  z-index: 10000;
  &:hover {
    background: #fff;
    path {
      stroke: #2c2c2c;
    }
  }
`;

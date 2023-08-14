import { styled } from "styled-components";
import { ReactComponent as ArrowIcon } from "../assets/images/chevron-left.svg";

interface Props {
  onClick: () => void;
  classes?: string;
}

export const BackButton = ({ onClick, classes }: Props) => (
  <StyledBackButton
    className={`flex items-center justify-center ${classes}`}
    onClick={onClick}
  >
    <ArrowIcon />
  </StyledBackButton>
);

const StyledBackButton = styled.button`
  width: 34px;
  height: 37px;
  flex-shrink: 0;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(18.5px);
  transition: all 0.3s;
  &:hover {
    background: #fff;
    path {
      stroke: #2c2c2c;
    }
  }
`;

import { styled } from "styled-components";
import arrrowIcon from "../../../../assets/images/arrow.svg";
import closeIcon from "../../../../assets/images/close.svg";

interface Props {
  open: boolean;
}

export const Arrow = ({ open }: Props) => (
  <StyledArrow className="flex items-center justify-center arrow clickable">
    <img src={open ? closeIcon : arrrowIcon} alt="" className="clickable" />
  </StyledArrow>
);

const StyledArrow = styled.div`
  width: 24px;
  height: 25px;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
`;

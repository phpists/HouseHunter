import { styled } from "styled-components";
import arrowIcon from "../../../assets/images/arrow-right.svg";

interface Props {
  onClick: () => void;
  prev?: boolean;
}

export const Button = ({ onClick, prev }: Props) => (
  <StyledButton onClick={onClick}>
    <img src={arrowIcon} alt="" className={`${prev && "prev"}`} />{" "}
  </StyledButton>
);

const StyledButton = styled.button`
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
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    &.prev {
      transform: rotate(180deg);
    }
  }
  &:hover {
    background: rgba(93, 99, 255, 1);
  }
`;

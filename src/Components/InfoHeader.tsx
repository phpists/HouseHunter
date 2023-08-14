import { styled } from "styled-components";
import arrowBack from "../assets/images/chevron-left.svg";
import { Avatar } from "./Avatar";

interface Props {
  onClose: () => void;
}

export const InfoHeader = ({ onClose }: Props) => (
  <StyledInfoHeader className="flex items-center justify-between">
    <img src={arrowBack} alt="" onClick={onClose} />
    <span>22 000₴</span>
    <Avatar small />
  </StyledInfoHeader>
);

const StyledInfoHeader = styled.div`
  height: 60px;
  padding: 10px 10px 10px 14px;
  border-radius: 13px;
  background: #454545;
  margin-top: 7px;
  font-size: 20px;
  font-weight: 500;
  line-height: 118%;
  letter-spacing: 0.4px;
  margin-bottom: 15px;
  img {
    cursor: pointer;
  }
  @media (min-width: 1000px) {
    display: none;
  }
`;

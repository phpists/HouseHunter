import { styled } from "styled-components";
import checkIcon from "../../../assets/images/check.svg";

interface Props {
  time: string;
}

export const Time = ({ time }: Props) => (
  <StyledTime className="flex items-center justify-center chat">
    <div className="time chat">{time}</div>{" "}
    <img src={checkIcon} alt="" className="chat" />
  </StyledTime>
);

const StyledTime = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  padding: 4px;
  font-size: 12px;
  font-weight: 300;
  line-height: 100%;
  letter-spacing: 0.24px;
  height: 17px;
  img {
    margin-left: 3px;
  }
  .time {
    height: 10px;
  }
`;

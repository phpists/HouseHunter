import { styled } from "styled-components";
import checkIcon from "../../assets/images/check-check.svg";
import { getHours } from "../../helpers";

interface Props {
  date: number;
}

export const MessageFooter = ({ date }: Props) => (
  <StyledMessageFooter className="flex items-center justify-end message">
    {getHours(date)} <img src={checkIcon} alt="" />
  </StyledMessageFooter>
);
const StyledMessageFooter = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: 100%; /* 12px */
  letter-spacing: 0.24px;
  img {
    margin-left: 3px;
  }
`;

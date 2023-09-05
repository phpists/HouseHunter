import { styled } from "styled-components";
import { ReactComponent as CheckIcon } from "../../assets/images/check-check.svg";
import { getHours } from "../../helpers";
import replyIcon from "../../assets/images/reply.svg";

interface Props {
  date: number;
  isOwner: boolean;
  isSelected: boolean;
}

export const MessageFooter = ({ date, isOwner, isSelected }: Props) => (
  <StyledMessageFooter
    className="flex items-center justify-end message"
    isOwner={isOwner}
  >
    {getHours(date)}
    {isSelected ? <img src={replyIcon} alt="" /> : <CheckIcon />}
  </StyledMessageFooter>
);

interface StyledMessageFooterProps {
  isOwner: boolean;
}

const StyledMessageFooter = styled.div<StyledMessageFooterProps>`
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: 100%; /* 12px */
  letter-spacing: 0.24px;
  svg,
  img {
    margin-left: 3px;
  }
  ${({ isOwner }) =>
    isOwner &&
    `
    path {
        stroke: #67CB4E;
    }
  `}
`;

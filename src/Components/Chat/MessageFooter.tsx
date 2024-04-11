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
    className="flex items-center justify-end message chat"
    isOwner={isOwner}
  >
    {getHours(date)}
    {isSelected ? (
      <img src={replyIcon} alt="" className="message chat" />
    ) : (
      <>
        <CheckIcon className="message chat" />
        <img src={replyIcon} alt="" className="reply-icon message chat" />
      </>
    )}
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
  min-height: 16px;
  svg,
  img {
    margin-left: 3px;
  }
  .reply-icon {
    display: none;
  }
  &:hover {
    svg {
      display: none;
    }
    .reply-icon {
      display: block;
    }
  }

  ${({ isOwner }) =>
    isOwner &&
    `
    path {
        stroke: #67CB4E;
    }
  `}
`;

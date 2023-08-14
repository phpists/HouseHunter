import { styled } from "styled-components";
import { MessageFooter } from "../MessageFooter";

interface Props {
  text: string;
  isOwner?: boolean;
  first?: boolean;
  last?: boolean;
  between?: boolean;
  date: number;
}

export const Message = ({
  text,
  isOwner,
  first,
  last,
  between,
  date,
}: Props) => (
  <StyledMessage isOwner={isOwner} first={first} last={last} between={between}>
    <div>
      {text}
      {/* {first && "first"} {last && "last"} {between && "between"} */}
    </div>
    <MessageFooter date={date} />
  </StyledMessage>
);

interface StyledMessageProps {
  isOwner?: boolean;
  first?: boolean;
  last?: boolean;
  between?: boolean;
}

const StyledMessage = styled.div<StyledMessageProps>`
  max-width: 80%;
  width: max-content;
  padding: ${({ isOwner }) =>
    isOwner ? "8px 10px 5px 10px" : `8px 10px 5px 10px`};
  border-radius: ${({ isOwner, last, between }) =>
    isOwner
      ? `12px ${last || between ? 0 : 12}px 0px 12px`
      : `${last || between ? 0 : 12}px 12px 12px 2px`};
  background: ${({ isOwner }) => (isOwner ? "#5D63FF" : "#5c5c5c")};
  margin: ${({ isOwner }) => (isOwner ? "0 11px 0 auto" : "0 auto 0 11px")};
  position: relative;
  margin-bottom: ${({ first, between }) => (first || between ? 2 : 12)}px;
  word-wrap: break-word;
  &::before {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    ${({ isOwner }) => (isOwner ? "right: -12.3px;" : "left: -12.3px;")}
    width: 0;
    height: 0;
    border-left: 13px solid transparent;
    border-right: 13px solid transparent;
    border-bottom: 13px solid
      ${({ isOwner }) => (isOwner ? "#5D63FF" : "#5c5c5c")};
  }
  &::after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0px;
    ${({ isOwner }) => (isOwner ? "right: -24px;" : "left: -24px;")}
    height: 26px;
    width: 24px;
    border-radius: 100%;
    z-index: 100;
    background: ${({ isOwner }) => (isOwner ? "#5D63FF" : "#454545")};
  }
  ${({ first, between }) =>
    (first || between) &&
    `
    &::before, 
    &::after {
        display: none;
    }
  `}
  @media(max-width: 1000px) {
    background: ${({ isOwner }) => (isOwner ? "#5D63FF" : "#454545")};
    &::before {
      border-bottom: 13px solid
        ${({ isOwner }) => (isOwner ? "#5D63FF" : "#454545")};
    }
  }
`;

import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

interface Props {
  title: string;
  link: string;
  onClick: () => void;
  active: boolean;
}

export const Tab = ({ title, link, onClick, active }: Props) => (
  <StyledTab
    to={link}
    onClick={onClick}
    className="flex items-center justify-center cursor-pointer"
    active={active}
  >
    <div>{title}</div>
  </StyledTab>
);

interface StyledTabProps {
  active: boolean;
}

const StyledTab = styled(NavLink)<StyledTabProps>`
  color: #fff;
  font-size: 14px;
  font-style: normal;
  line-height: 118%; /* 16.52px */
  letter-spacing: 0.28px;
  text-transform: uppercase;
  transition: all 0.3s;
  padding: 10px;
  height: 30px;
  div {
    height: 12px;
  }
  ${({ active }) =>
    active
      ? `
         background: rgba(255, 255, 255, 0.25);
        border-radius: 4px;
    `
      : "opacity: 0.5;"}
`;

import styled from "styled-components";
import like from "../../../../../assets/images/thumbs-up.svg";
import dislike from "../../../../../assets/images/thumbs-down.svg";

interface Props {
  type: "like" | "dislike";
  onClick: () => void;
  disabled?: boolean;
}

const TYPES = {
  like: {
    color: "#5A9E49",
    icon: like,
  },
  dislike: {
    color: "#D15B5B",
    icon: dislike,
  },
};

export const ActionButton = ({ type, onClick, disabled }: Props) => (
  <StyledActionButton
    className="flex items-center justify-center"
    color={TYPES[type]?.color}
    onClick={onClick}
    disabled={disabled}
  >
    <img src={TYPES[type]?.icon} alt="" />
  </StyledActionButton>
);

interface StyledActionButtonProps {
  color: string;
}

const StyledActionButton = styled.button<StyledActionButtonProps>`
  padding: 15px 47px;
  border-radius: 8px;
  height: 54px;
  background: ${({ color }) => color};
  width: max-content;
  cursor: pointer;
  transition: all 0.3s;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover {
    opacity: 0.8;
  }
  img {
    height: 27px;
  }
`;

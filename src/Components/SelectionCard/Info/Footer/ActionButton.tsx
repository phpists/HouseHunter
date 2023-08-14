import { styled } from "styled-components";

interface Props {
  icon: string;
  onClick: () => void;
  status: boolean;
}

export const ActionButton = ({ icon, onClick, status }: Props) => (
  <StyledActionButton
    className="flex items-center justify-center"
    onClick={onClick}
    status={status}
  >
    <img src={icon} alt="" />
  </StyledActionButton>
);

interface StyledActionButtonProps {
  status: boolean;
}

const StyledActionButton = styled.div<StyledActionButtonProps>`
  width: 44px;
  height: 44px;
  border-radius: 9px;
  background: rgba(93, 99, 255, 0.7);
  transition: all 0.3s;
  flex-shrink: 0;
  background: ${({ status }) => (status ? "#5A9E49" : "#D15B5B")};
  img {
    height: 22px;
  }
`;

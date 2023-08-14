import { styled } from "styled-components";
import avatarIcon from "../assets/images/avatar.png";

interface Props {
  small?: boolean;
}

export const Avatar = ({ small }: Props) => (
  <StyledAvatar avatar={avatarIcon} small={small} />
);

interface StyledAvatarProps {
  avatar: string;
  small?: boolean;
}

const StyledAvatar = styled.div<StyledAvatarProps>`
  width: ${({ small }) => (small ? 40 : 50)}px;
  height: ${({ small }) => (small ? 40 : 50)}px;
  border-radius: 100px;
  background: url(${({ avatar }) => avatar}) center/cover no-repeat;
`;

import { styled } from "styled-components";
import avatarIcon from "../assets/images/avatar.png";

interface Props {
  small?: boolean;
  photo?: string;
}

export const Avatar = ({ small, photo }: Props) => (
  <StyledAvatar avatar={photo ?? avatarIcon} small={small} />
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
  flex-shrink: 0;
`;

import { styled } from "styled-components";
import { Avatar } from "../Avatar";

interface Props {
  small?: boolean;
  rieltor: { name: string };
}

export const Profile = ({ small, rieltor }: Props) => (
  <StyledProfile small={small} className="flex items-center">
    <Avatar small={small} />
    <div className="profile-info">
      <div className="name">{rieltor.name}</div>
      <div className="role">Рієлтор</div>
    </div>
  </StyledProfile>
);

interface StyledProfileProps {
  small?: boolean;
}

const StyledProfile = styled.div<StyledProfileProps>`
  color: #fff;
  .profile-info {
    margin-left: ${({ small }) => (small ? 7 : 12)}px;
  }
  .name {
    font-size: ${({ small }) => (small ? 16 : 18)}px;
    line-height: 118%;
    letter-spacing: 0.36px;
  }
  .role {
    font-size: ${({ small }) => (small ? 12 : 14)}px;
    font-weight: 400;
    line-height: 118%;
    letter-spacing: 0.28px;
    opacity: 0.5;
  }
`;

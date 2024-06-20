import { styled } from "styled-components";
import { Avatar } from "../Avatar";

interface Props {
  small?: boolean;
  rieltor: any;
}

export const Profile = ({ small, rieltor }: Props) => (
  <StyledProfile small={small} className="flex items-center chat">
    <Avatar
      small={small}
      photo={rieltor?.img?.length > 0 ? rieltor?.img : rieltor?.company_img}
      className="chat"
    />
    <div className="profile-info chat">
      <div className="name chat" title={rieltor?.full_name}>
        {rieltor?.full_name}
      </div>
      {/* <div className="role chat">Рієлтор</div> */}
    </div>
  </StyledProfile>
);

interface StyledProfileProps {
  small?: boolean;
}

const StyledProfile = styled.div<StyledProfileProps>`
  color: #fff;
  justify-content: center;
  .profile-info {
    margin-left: ${({ small }) => (small ? 7 : 12)}px;
  }
  .name {
    font-size: ${({ small }) => (small ? 16 : 18)}px;
    line-height: 118%;
    letter-spacing: 0.36px;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .role {
    font-size: ${({ small }) => (small ? 12 : 14)}px;
    font-weight: 400;
    line-height: 118%;
    letter-spacing: 0.28px;
    opacity: 0.5;
  }
`;

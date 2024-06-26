import { styled } from "styled-components";
import noPhoto from "../../assets/images/no-photo.svg";

interface Props {
  onClick: () => void;
  parentMsg: any;
  rieltorName: string;
}

export const Response = ({ onClick, parentMsg, rieltorName }: Props) => {
  const isOwner = parentMsg.user === 0;
  const isPhoto = parentMsg?.messege?.title || parentMsg?.messege?.img;

  return (
    <StyledResponse
      onClick={onClick}
      isOwner={isOwner}
      isPhoto={isPhoto}
      photo={
        parentMsg?.messege?.img?.length > 0 ? parentMsg?.messege?.img : noPhoto
      }
      className="flex items-center chat"
    >
      {isPhoto && <div className="photo chat" />}
      <div className="chat">
        <div className="name chat">{isOwner ? "Ви" : rieltorName}</div>
        <span className="chat">
          {isPhoto ? "Фотографія" : parentMsg?.messege}
        </span>
      </div>
    </StyledResponse>
  );
};

interface StyledResponseProps {
  isOwner: boolean;
  isPhoto: boolean;
  photo?: string;
}

const StyledResponse = styled.div<StyledResponseProps>`
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.12);
  padding: ${({ isPhoto }) => (isPhoto ? "2px 7px 2px 2px" : "4px 7px 2px")};
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.5);
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  .name {
    color: ${({ isOwner }) => (isOwner ? "#81fb21" : "#98F9FF")};
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    height: 18px;
    width: 100%;
    max-width: 200px;
    overflow: hidden;
  }
  span {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    max-width: 200px;
  }
  .photo {
    width: 36px;
    height: 36px;
    border-radius: 4px;
    margin-right: 9px;
    background: url(${({ photo }) => photo}) center/cover no-repeat;
  }
`;

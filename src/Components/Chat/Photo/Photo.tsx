import { styled } from "styled-components";
import { Time } from "./Time";
import { Download } from "./Download";
import { Text } from "./Text";
import { getHours } from "../../../helpers";
import noPhoto from "../../../assets/images/no-photo.svg";
import { Spinner } from "../../Spinner";

interface Props {
  photo?: string;
  text?: string;
  isOwner?: boolean;
  date: number;
  onOpenObject: any;
  loading: boolean;
}

export const Photo = ({
  photo,
  text,
  isOwner,
  date,
  onOpenObject,
  loading,
}: Props) => {
  return (
    <StyledPhoto
      photo={photo ?? noPhoto}
      text={text}
      isOwner={isOwner}
      onClick={onOpenObject ?? null}
      className={`${!!onOpenObject && "cursor-pointer"}`}
      loading={loading}
    >
      {loading && <Spinner className="loading-spinner" />}
      {photo && <Download photo={photo} />}
      <div className="image" />
      {text && <Text text={text} isOwner={isOwner} date={date} />}
      {!text && <Time time={getHours(date)} />}
    </StyledPhoto>
  );
};

interface StyledPhotoProps {
  photo: string;
  text?: string;
  isOwner?: boolean;
  loading: boolean;
}

const StyledPhoto = styled.div<StyledPhotoProps>`
  position: relative;
  width: 273px;
  min-height: 270px;
  flex-shrink: 0;
  border-radius: 12px;
  background: ${({ isOwner }) => (isOwner ? "#5D63FF" : "#5c5c5c")};
  margin: ${({ isOwner }) => (isOwner ? "0 11px 0 auto" : "0 auto 0 11px")};
  padding: 1px;
  margin-bottom: 14px;
  .image {
    width: 271px;
    height: 268px;
    background: url(${({ photo }) => photo}) center/cover no-repeat, #000;
    border-radius: ${({ text }) => (text ? "12px 12px 0 0" : "12px")};
    ${({ loading }) => loading && "filter: blur(2px);"}
  }
  .loading-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
`;

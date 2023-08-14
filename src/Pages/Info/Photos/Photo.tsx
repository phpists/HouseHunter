import { styled } from "styled-components";

interface Props {
  photo: string;
  className: string;
  onOpen?: () => void;
}

export const Photo = ({ photo, className, onOpen }: Props) => (
  <StyledPhoto photo={photo} className={className} onClick={onOpen} />
);

interface StyledPhotoProps {
  photo: string;
}

const StyledPhoto = styled.div<StyledPhotoProps>`
  width: 100%;
  height: 100%;
  background: url(${({ photo }) => photo}) center/cover no-repeat;
  cursor: pointer;
`;

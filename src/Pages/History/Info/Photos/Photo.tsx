import { styled } from "styled-components";

interface Props {
  photo: string;
  className: string;
}

export const Photo = ({ photo, className }: Props) => (
  <StyledPhoto photo={photo} className={className} />
);

interface StyledPhotoProps {
  photo: string;
}

const StyledPhoto = styled.div<StyledPhotoProps>`
  width: 100%;
  height: 100%;
  background: url(${({ photo }) => photo}) center/cover no-repeat;
`;

import styled from "styled-components";

interface Props {
  photo: string;
  onClick?: () => void;
}

export const Photo = ({ photo, onClick }: Props) => (
  <StyledPhoto photo={photo} onClick={onClick} />
);

const StyledPhoto = styled.div<Props>`
  width: 100px;
  height: 106px;
  background: url(${({ photo }) => photo}) center/cover no-repeat;
  cursor: pointer;
`;

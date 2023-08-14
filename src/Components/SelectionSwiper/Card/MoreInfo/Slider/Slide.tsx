import { styled } from "styled-components";

interface Props {
  image: string;
}

export const Slide = ({ image }: Props) => <StyledSlide image={image} />;

const StyledSlide = styled.div<Props>`
  height: 222px;
  background: url(${({ image }) => image}) center/cover no-repeat;
  border-radius: 13px 13px 0 0;
`;

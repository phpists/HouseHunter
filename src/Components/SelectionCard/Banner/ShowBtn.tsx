import { styled } from "styled-components";

interface Props {
  tag: string;
}

export const ShowBtn = ({ tag }: Props) => (
  <StyledShowButton className="flex items-center justify-center">
    <div>{tag}</div>
  </StyledShowButton>
);

const StyledShowButton = styled.div`
  position: absolute;
  top: 6px;
  left: 6px;
  padding: 8px 13px 5px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.75);
  background: rgba(70, 70, 70, 0.8);
  backdrop-filter: blur(6px);
  cursor: pointer;
  font-family: "Overpass", sans-serif;
  font-size: 11px;
  line-height: 118%; /* 12.98px */
  letter-spacing: 0.22px;
  text-transform: uppercase;
  z-index: 3;
  height: 26px;
  transition: all 0.3s;
  &:hover {
    background: rgba(255, 255, 255, 0.75);
    color: rgba(70, 70, 70, 0.8);
  }
`;

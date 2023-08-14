import { styled } from "styled-components";
import { Text } from "./Text";

interface Props {
  data: { symbol: string; title: string } | undefined;
}

export const Active = ({ data }: Props) => (
  <StyledActive className="flex items-center justify-center">
    <Text symbol={data?.symbol ?? ""} title={data?.title ?? ""} />
  </StyledActive>
);

const StyledActive = styled.div`
  width: 73px;
  height: 38px;
  border-radius: 8px;
  background: #343434;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background: #888;
  }
`;

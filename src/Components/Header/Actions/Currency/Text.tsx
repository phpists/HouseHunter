import { styled } from "styled-components";

interface Props {
  symbol: string;
  title: string;
}

export const Text = ({ symbol, title }: Props) => (
  <StyledText className="flex items-center">
    <span className="symbol">{symbol}</span>
    {title}
  </StyledText>
);

const StyledText = styled.div`
  color: #fff;
  text-align: center;
  font-size: 14px;
  letter-spacing: 0.28px;
  cursor: pointer;
  .symbol {
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.32px;
    text-transform: uppercase;
    display: block;
    margin-right: 6px;
  }
`;

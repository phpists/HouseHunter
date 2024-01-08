import { styled } from "styled-components";
import { formatNumber } from "../../../helpers/numbers";
import { getCurrencySymbol } from "../../../helpers";

interface Props {
  price: number;
  currency: string;
  onOpen: () => void;
}

export const Price = ({ price, currency, onOpen }: Props) => (
  <StyledPice onClick={onOpen}>
    {formatNumber(Number(price))} {getCurrencySymbol(currency)}
  </StyledPice>
);

const StyledPice = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background: #2c2c2c;
  color: #81fb21;
  text-align: right;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: 118%;
  letter-spacing: 0.4px;
  background: #2c2c2c;
  z-index: 4;
  padding: 6px 0 2px;
  &:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    width: 0;
    height: 0;
    border-left: 35px solid transparent;
    border-right: 35px solid transparent;
    border-bottom: 35px solid #2c2c2c;
    left: -34.9px;
    z-index: -1;
    bottom: -2.5px;
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;

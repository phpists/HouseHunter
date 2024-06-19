import { styled } from "styled-components";
import arrowBack from "../../../../assets/images/chevron-left.svg";
import { Avatar } from "../../../Avatar";
import { formatNumber } from "../../../../helpers/numbers";
import { getCurrencySymbol } from "../../../../helpers";

interface Props {
  onClose: () => void;
  price: number;
  currency: string;
}

export const Header = ({ onClose, price, currency }: Props) => (
  <StyledHeader className="flex items-center justify-between select-none">
    <img src={arrowBack} alt="" onClick={onClose} />
    <span>
      {formatNumber(Number(price))} {getCurrencySymbol(currency)}
    </span>
  </StyledHeader>
);

const StyledHeader = styled.div`
  height: 60px;
  padding: 10px 10px 10px 14px;
  border-radius: 13px;
  background: #454545;
  margin-top: 7px;
  font-size: 20px;
  font-weight: 500;
  line-height: 118%;
  letter-spacing: 0.4px;
  margin-bottom: 15px;
  img {
    cursor: pointer;
    height: 24px !important;
  }
  @media (min-width: 1000px) {
    display: none;
  }
`;

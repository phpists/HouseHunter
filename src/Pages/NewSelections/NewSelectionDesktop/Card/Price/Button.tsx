import { styled } from "styled-components";
import { Arrow } from "./Arrow";
import { formatNumber } from "../../../../../helpers/numbers";

interface Props {
  open: boolean;
  onToggleOpen: () => void;
  activeCurrency: string;
  price: number;
}
export const Button = ({
  open,
  onToggleOpen,
  activeCurrency,
  price,
}: Props) => (
  <StyledButton onClick={onToggleOpen} className="flex items-center ">
    <div className="price-value ">
      {formatNumber(Number(price))}
      {activeCurrency}
    </div>
    <Arrow open={open} />
  </StyledButton>
);

const StyledButton = styled.div`
  border-radius: 7px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  height: 27px;
  .price-value {
    padding: 10px 9px 7px 10px;
    line-height: 0;
  }
  &:active {
    .arrow {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 0px 6px 6px 0px;
    }
  }
  @media (max-width: 1000px) {
    backdrop-filter: none;
  }
`;

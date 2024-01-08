import { styled } from "styled-components";
import { Location } from "./Location";
import { Doors } from "./Doors";
import { Stairs } from "./Stairs";
import { Divider } from "./Divider";
import { Descrioption } from "./Descrioption";
import { Title } from "./Title";
import { Footer } from "./Footer/Footer";
import { getCurrencySymbol } from "../../../helpers";
import { formatNumber } from "../../../helpers/numbers";

interface Props {
  onOpen: () => void;
  isNew?: boolean;
  onSendRealtor?: () => void;
  title: string;
  currency: string;
  price: number;
  location: string;
  doors: number | string;
  stairs: string;
  description?: string;
  onSwap?: (direction: string) => void;
  disabled?: boolean;
}

export const Info = ({
  onOpen,
  isNew,
  onSendRealtor,
  title,
  currency,
  price,
  location,
  doors,
  stairs,
  description,
  onSwap,
  disabled,
}: Props) => (
  <StyledInfo>
    <div className="full-info">
      <div onClick={onOpen}>
        {isNew && <Title title={title} />}
        <Location location={location} />
      </div>
      <div className="flex items-center" onClick={onOpen}>
        <Doors doors={doors} />
        <Divider />
        <Stairs stairs={stairs} />
      </div>
      {isNew && <Descrioption description={description} />}
      <Footer
        onSendRealtor={onSendRealtor}
        onSwap={onSwap}
        disabled={disabled}
      />
    </div>
    <div
      className="mobile-info flex items-center flex-wrap gap-1"
      onClick={onOpen}
    >
      <div>
        {location?.length > 25 ? `${location.substring(0, 25)}...` : location}
      </div>
      <div>
        • {formatNumber(Number(price))}
        {getCurrencySymbol(currency)}
      </div>{" "}
      <div> • {doors}к</div>
    </div>
  </StyledInfo>
);

const StyledInfo = styled.div`
  color: #fff;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  margin-top: 24px;
  .mobile-info {
    display: none;
    margin-top: 12px;
  }
  @media (max-width: 1000px) {
    margin-top: 8px;
    .full-info {
      display: none;
    }
    .mobile-info {
      display: flex;
    }
  }
`;

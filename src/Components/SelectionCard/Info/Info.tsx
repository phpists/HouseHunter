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
import { Expand } from "./Stairs copy";

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
  category?: string;
  expand: string;
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
  category,
  expand,
}: Props) => (
  <StyledInfo>
    <div className="full-info">
      <div className="main-info hide-scroll">
        <div onClick={onOpen}>
          {isNew && <Title title={title} />}
          <Location location={location} />
          {category ? <div className="my-2 ml-1">{category}</div> : null}
        </div>
        <div className="flex items-center" onClick={onOpen}>
          <Doors doors={doors} />
          <Divider />
          <Expand expand={expand} />
          <Divider />
          <Stairs stairs={stairs} />
        </div>
        {isNew && <Descrioption description={description} />}
      </div>
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
  .main-info {
    max-height: 30vh;
    overflow: auto;
  }
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
    .main-info {
      max-height: 10vh;
      overflow: auto;
    }
  }
`;

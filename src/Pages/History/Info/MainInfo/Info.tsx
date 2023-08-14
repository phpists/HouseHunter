import { styled } from "styled-components";
import { Location } from "./Location";
import { Doors } from "./Doors";
import { Stairs } from "./Stairs";
import { Divider } from "./Divider";

export const Info = () => (
  <StyledInfo>
    <div className="full-info">
      {/* <Location /> */}
      <div className="flex items-center">
        {/* <Doors /> */}
        <Divider />
        {/* <Stairs /> */}
      </div>
    </div>
    <div className="mobile-info">Львів, ул. Харьківськa, 12 22 000₴ • 2к</div>
  </StyledInfo>
);

const StyledInfo = styled.div`
  color: #fff;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  margin-top: 12px;
  .mobile-info {
    display: none;
  }
  @media (max-width: 1000px) {
    margin-top: 8px;
    .full-info {
      display: none;
    }
    .mobile-info {
      display: block;
    }
  }
`;

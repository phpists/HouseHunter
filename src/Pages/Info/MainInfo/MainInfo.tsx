import { styled } from "styled-components";
import { Title } from "./Title";
import { Location } from "./Location";
import { Divider } from "./Divider";
import { Doors } from "./Doors";
import { Stairs } from "./Stairs";
import { Expand } from "./Expand";
import { getLocation } from "../../../helpers";

interface Props {
  infoOpen: any;
}

export const MainInfo = ({ infoOpen }: Props) => (
  <StyledMainInfo>
    <Title
      title={
        infoOpen?.title?.length > 0
          ? infoOpen?.title
          : infoOpen?.description
          ? `${infoOpen?.description.substring(0, 30)}...`
          : ""
      }
    />
    <div className="flex items-center info">
      <Location location={getLocation(infoOpen?.location)} />
      <div className="flex items-center info-items">
        <Divider className="location-divider" />
        <Doors doors={infoOpen?.rooms ?? "-"} />
        <Divider />
        <Expand area={infoOpen?.total_house_area ?? "-"} />
        <Divider />
        <Stairs
          stairs={`${infoOpen?.storey ?? "-"} із ${
            infoOpen?.storey_count ?? "-"
          }`}
        />
      </div>
    </div>
  </StyledMainInfo>
);

const StyledMainInfo = styled.div`
  margin: 24px 0 0;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: 118%;
  letter-spacing: 0.4px;
  img {
    height: 24px;
  }
  @media (max-width: 1000px) {
    margin: 14px 0 0;
    font-family: " Open Sans", sans-serif;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.26px;
    .info {
      display: block;
    }
    .location-divider {
      display: none;
    }
    .info-items {
      margin-top: 10px;
    }
    img {
      height: 16px;
    }
  }
`;

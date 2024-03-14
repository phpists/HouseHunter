import styled from "styled-components";
import locationIcon from "../../../../assets/images/location-2.svg";

interface Props {
  location: string;
}

export const Location = ({ location }: Props) => (
  <StyledLocation className="flex items-center">
    <img src={locationIcon} alt="" />
    {location}
  </StyledLocation>
);

const StyledLocation = styled.div`
  margin-bottom: 8px;
  font-family: Overpass;
  font-size: 15px;
  font-weight: 300;
  line-height: 18px;
  letter-spacing: 0.02em;
  text-align: left;
  color: #ffffff;
  img {
    height: 20px;
    width: 20px;
    margin-right: 8px;
  }
`;

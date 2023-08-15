import { styled } from "styled-components";
import locationIcon from "../../../../assets/images/location-2.svg";

interface Props {
  location: string;
}

export const Location = ({ location }: Props) => (
  <StyledLocation className="flex items-end">
    <img src={locationIcon} alt="" className="mr-2" /> <span>{location}</span>
  </StyledLocation>
);

const StyledLocation = styled.div`
  width: 60%;
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

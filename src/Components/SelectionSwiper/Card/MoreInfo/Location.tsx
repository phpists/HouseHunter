import { styled } from "styled-components";
import locationIcon from "../../../../assets/images/location-2.svg";

interface Props {
  location: string;
}
export const Location = ({ location }: Props) => (
  <StyledLocation className="flex items-center">
    <img src={locationIcon} alt="" className="mr-2" /> {location}
  </StyledLocation>
);

const StyledLocation = styled.div`
  margin-bottom: 10px;
`;

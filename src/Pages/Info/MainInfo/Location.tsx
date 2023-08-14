import locationIcon from "../../../assets/images/location-2.svg";

interface Props {
  location: string;
}

export const Location = ({ location }: Props) => (
  <div className="flex items-end">
    <img src={locationIcon} alt="" className="mr-2" /> {location}
  </div>
);

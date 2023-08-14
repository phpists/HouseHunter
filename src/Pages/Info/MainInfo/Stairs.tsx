import stairsIcon from "../../../assets/images/stairs.svg";

interface Props {
  stairs: string;
}

export const Stairs = ({ stairs }: Props) => (
  <div className="flex items-end">
    <img src={stairsIcon} alt="" className="mr-2" />
    {stairs}
  </div>
);

import expandIcon from "../../../../assets/images/expand.svg";

interface Props {
  area: string | number;
}

export const Expand = ({ area }: Props) => (
  <div className="flex items-center">
    <img src={expandIcon} alt="" className="mr-2" />
    {area} м²
  </div>
);

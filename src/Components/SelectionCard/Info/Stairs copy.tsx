import expandIcon from "../../../assets/images/expand.svg";

interface Props {
  expand: string;
}

export const Expand = ({ expand }: Props) => (
  <div className="flex items-end">
    <img src={expandIcon} alt="" className="mr-2" />
    {expand}
  </div>
);

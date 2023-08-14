import doorIcon from "../../../../assets/images/door-closed.svg";

interface Props {
  doors: string | number;
}
export const Doors = ({ doors }: Props) => (
  <div className="flex items-end">
    <img src={doorIcon} alt="" className="mr-2" />
    {doors}к
  </div>
);

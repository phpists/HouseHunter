import boxIcon from "../../../../assets/images/box-select.svg";

interface Props {
  box: string | number;
}

export const Box = ({ box }: Props) => (
  <div className="flex items-center">
    <img src={boxIcon} alt="" className="mr-2" />
    {box} м²
  </div>
);

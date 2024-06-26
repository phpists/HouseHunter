import styled from "styled-components";
import doorsIcon from "../../../../assets/images/door-closed.svg";
import stairsIcon from "../../../../assets/images/stairs.svg";
import expandIcon from "../../../../assets/images/expand.svg";
import boxIcon from "../../../../assets/images/box-select.svg";

interface Props {
  doors: string;
  stairs: string;
  areaTotal: string;
  areaKitchen: string;
}

export const Tags = ({ doors, stairs, areaTotal, areaKitchen }: Props) => (
  <StyledTags className="flex items-center">
    <img src={doorsIcon} alt="" /> {doors} <div className="divider" />
    <img src={expandIcon} alt="" />
    {areaTotal}
    {Number(areaKitchen) > 0 ? (
      <>
        <div className="divider" />
        <img src={boxIcon} alt="" />
        {areaKitchen}{" "}
      </>
    ) : null}
    <div className="divider" />
    <img src={stairsIcon} alt="" />
    {stairs}
  </StyledTags>
);

const StyledTags = styled.div`
  font-family: Open Sans;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.02em;
  text-align: left;
  color: #ffffff;
  margin-bottom: 40px;
  img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
  .divider {
    width: 1px;
    height: 16px;
    border-radius: 10;
    opacity: 0.32;
    margin: 0 12px;
    background: #ffffff;
  }
`;

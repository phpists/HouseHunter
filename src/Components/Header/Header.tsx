import { styled } from "styled-components";
import { Realtor } from "./Realtor/Realtor";
import { Actions } from "./Actions/Actions";

interface Props {
  rieltor: any;
  phonesCodes: any;
}

export const Header = ({ rieltor, phonesCodes }: Props) => (
  <StyledHeader isHide={false}>
    <div className="header-wrapper flex items-center justify-between select-none">
      <Realtor data={rieltor} phonesCodes={phonesCodes} />
    </div>
  </StyledHeader>
);

interface StyledHeaderProps {
  isHide: boolean;
}

const StyledHeader = styled.div<StyledHeaderProps>`
  /* margin: 28px 0 0px; */
  position: fixed;
  width: 100%;
  z-index: 15;
  top: 0px;
  background: #2c2c2c;
  .header-wrapper {
    border-radius: 12px;
    background: #454545;
    padding: 12px;
    height: 74px;
    max-width: 1400px;
    width: calc(100% - 16px);
    margin: 10px auto;
    @media (max-width: 1000px) {
      ${({ isHide }) => isHide && "display: none;"}
    }
  }
`;

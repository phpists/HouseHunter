import styled from "styled-components";
import { ActionButton } from "./ActionButton";
import { SendButton } from "./SendButton";
import { Realtor } from "../../../../../Components/Header/Realtor/Realtor";

interface Props {
  data: any;
  phonesCodes: any;
}

export const Footer = ({ data, phonesCodes }: Props) => (
  <StyledFooter>
    <Realtor data={data} phonesCodes={phonesCodes} />
  </StyledFooter>
);

const StyledFooter = styled.div`
  width: 100%;
  margin-top: 20px;
`;

import { styled } from "styled-components";
import callIcon from "../../../assets/images/call.svg";

interface Props {
  phone: string;
}

export const CallButton = ({ phone }: Props) => (
  <a href={`tel:${phone}`}>
    <StyledCallButton className="flex items-center justify-center btn">
      <img src={callIcon} alt="" />
    </StyledCallButton>
  </a>
);

const StyledCallButton = styled.button`
  margin-left: 50px;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  @media (max-width: 1200px) {
    margin-left: 30px;
  }
  @media (max-width: 1000px) {
    margin-left: 15px;
  }
`;

import { styled } from "styled-components";
import viber from "../../../assets/images/viber.svg";
import telegram from "../../../assets/images/telegram.svg";

interface Props {
  phone: string;
  type: string;
}

export const Socmedia = ({ phone, type }: Props) => (
  <a
    href={`${
      type === "telegram" ? "https://t.me/" : "viber://chat?number="
    }${phone}`}
    target="_blank"
    rel="noreferrer"
  >
    <StyledSocmedia className="flex items-center justify-center btn">
      <img src={type === "telegram" ? telegram : viber} alt="" />
    </StyledSocmedia>
  </a>
);

const StyledSocmedia = styled.button`
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

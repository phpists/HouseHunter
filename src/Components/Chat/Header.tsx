import { styled } from "styled-components";
import { Profile } from "../Profile/Profile";
import closeIcon from "../../assets/images/close-.svg";
import closeMobileIcon from "../../assets/images/chevron-left.svg";
import callIcon from "../../assets/images/call.svg";

interface Props {
  onCloseChat: () => void;
  rieltor: { name: string; photo: string | undefined; phone: any };
  phonesCodes: any;
}

export const Header = ({ onCloseChat, rieltor, phonesCodes }: Props) => (
  <StyledHeader className="flex items-center justify-between chat">
    <div className="flex items-center chat">
      <img
        src={closeMobileIcon}
        alt=""
        className="cursor-pointer mobile-close chat" 
        onClick={onCloseChat}
      />
      <Profile small rieltor={rieltor} />
    </div>
    <a
      href={`tel:${
        `${
          phonesCodes?.find(
            (c: any) => c?.id === rieltor.phone[0]?.id_phone_code
          )?.code
        }${rieltor.phone[0]?.phone}` ?? ""
      }`}
    >
      <img
        src={callIcon}
        alt=""
        className="cursor-pointer call-btn"
        onClick={onCloseChat}
      />
    </a>
    <img
      src={closeIcon}
      alt=""
      className="cursor-pointer close-btn"
      onClick={onCloseChat}
    />
  </StyledHeader>
);

interface StyledHeaderProps {
  mobile?: boolean;
}

const StyledHeader = styled.div<StyledHeaderProps>`
  border-radius: 10px;
  background: ${({ mobile }) => (mobile ? "#454545" : "#343434")};
  height: 60px;
  padding: 10px 14px 10px 10px;
  .mobile-close {
    margin-right: 18px;
  }
  .call-btn {
    display: block;
  }
  .close-btn {
    display: none;
  }
  @media (min-width: 1000px) {
    margin: 0 4px;
    .mobile-close,
    .call-btn {
      display: none;
    }
    .close-btn {
      display: block;
    }
  }
`;

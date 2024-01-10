import { styled } from "styled-components";
import { Profile } from "../../Profile/Profile";
import { CallButton } from "./CallButton";
import { ChatButton } from "./ChatButton";
import { Socmedia } from "./Socmedia";

interface Props {
  chatOpen: boolean;
  onToggleChat: () => void;
  rieltor: { name: string; photo: string | undefined; phone: any };
  phonesCodes: any;
}

export const Realtor = ({
  chatOpen,
  onToggleChat,
  rieltor,
  phonesCodes,
}: Props) => (
  <StyledRealtor className="flex items-center">
    <Profile rieltor={rieltor} />
    <div className="btns flex items-center">
      <div className="flex items-center">
        {rieltor.phone[0]?.viber === "1" && (
          <Socmedia
            type="viber"
            phone={
              `${
                phonesCodes?.find(
                  (c: any) => c?.id === rieltor.phone[0]?.id_phone_code
                )?.code
              }${rieltor.phone[0]?.phone}` ?? ""
            }
          />
        )}
        {rieltor.phone[0]?.telegram === "1" && (
          <Socmedia
            type="telegram"
            phone={
              `${
                phonesCodes?.find(
                  (c: any) => c?.id === rieltor.phone[0]?.id_phone_code
                )?.code
              }${rieltor.phone[0]?.phone}` ?? ""
            }
          />
        )}
        <CallButton
          phone={
            `${
              phonesCodes?.find(
                (c: any) => c?.id === rieltor.phone[0]?.id_phone_code
              )?.code
            }${rieltor.phone[0]?.phone}` ?? ""
          }
        />
      </div>
      <ChatButton chatOpen={chatOpen} onToggleChat={onToggleChat} />
    </div>
  </StyledRealtor>
);

const StyledRealtor = styled.div`
  .btns {
    width: max-content;
    margin-left: 20px;
  }
  a {
    display: block;
    margin: 0 20px 0 0 !important;
  }

  button {
    margin: 0;
  }

  @media (max-width: 1000px) {
    width: 100%;
    margin-bottom: 14px;
    justify-content: space-between;
    .btns {
      flex-direction: row-reverse;
      button {
        background: none;
        margin: 0;
      }
      a {
        margin: 0 0 0 20px !important;
      }
    }
  }
`;

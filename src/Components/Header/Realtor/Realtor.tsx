import { styled } from "styled-components";
import { Profile } from "../../Profile/Profile";
import { CallButton } from "./CallButton";
import { ChatButton } from "./ChatButton";

interface Props {
  chatOpen: boolean;
  onToggleChat: () => void;
  rieltor: { name: string; photo: string | undefined; phones: string[] };
}

export const Realtor = ({ chatOpen, onToggleChat, rieltor }: Props) => (
  <StyledRealtor className="flex items-center">
    <Profile rieltor={rieltor} />
    <div className="btns flex items-center">
      <CallButton phone={rieltor.phones[0] ?? ""} />
      <ChatButton chatOpen={chatOpen} onToggleChat={onToggleChat} />
    </div>
  </StyledRealtor>
);

const StyledRealtor = styled.div`
  .btns {
    width: max-content;
  }
  @media (max-width: 1000px) {
    width: 100%;
    margin-bottom: 14px;
    justify-content: space-between;
    .btns {
      flex-direction: row-reverse;
      button {
        background: none;
      }
    }
  }
`;

import { styled } from "styled-components";
import { Realtor } from "./Realtor/Realtor";
import { Actions } from "./Actions/Actions";

interface Props {
  activeTab: number;
  onChangeTab: (index: number) => void;
  filterLiked: boolean;
  onToggleFilterLiked: () => void;
  chatOpen: boolean;
  onToggleChat: () => void;
  infoOpen?: boolean;
  currency: string;
  onChangeCurrency: (value: string) => void;
  rieltor: { name: string; photo: string | undefined; phone: any };
  phonesCodes: any;
}

export const Header = ({
  activeTab,
  onChangeTab,
  filterLiked,
  onToggleFilterLiked,
  chatOpen,
  onToggleChat,
  infoOpen,
  currency,
  onChangeCurrency,
  rieltor,
  phonesCodes,
}: Props) => (
  <StyledHeader isHide={!!chatOpen}>
    <div className="header-wrapper flex items-center justify-between select-none">
      <Realtor
        chatOpen={chatOpen}
        onToggleChat={onToggleChat}
        rieltor={rieltor}
        phonesCodes={phonesCodes}
      />
      <Actions
        activeTab={activeTab}
        onChangeTab={onChangeTab}
        filterLiked={filterLiked}
        onToggleFilterLiked={onToggleFilterLiked}
        chatOpen={chatOpen}
        infoOpen={infoOpen}
        currency={currency}
        onChangeCurrency={onChangeCurrency}
      />
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
      flex-direction: column;
      height: auto;
      ${({ isHide }) => isHide && "display: none;"}
    }
  }
`;

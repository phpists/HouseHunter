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
  rieltor: { name: string };
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
}: Props) => (
  <StyledHeader
    className="flex items-center justify-between select-none"
    isHide={!!chatOpen}
  >
    <Realtor
      chatOpen={chatOpen}
      onToggleChat={onToggleChat}
      rieltor={rieltor}
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
  </StyledHeader>
);

interface StyledHeaderProps {
  isHide: boolean;
}

const StyledHeader = styled.div<StyledHeaderProps>`
  margin: 28px 0 0px;
  border-radius: 12px;
  background: #454545;
  padding: 12px;
  height: 74px;
  @media (max-width: 1000px) {
    flex-direction: column;
    height: auto;
    margin: 7px 0 0px;
    ${({ isHide }) => isHide && "display: none;"}
  }
`;

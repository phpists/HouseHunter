import { styled } from "styled-components";
import { Currency } from "./Currency/Currency";
import { Divider } from "./Divider";
import { LikedFilter } from "./LikedFilter";
import { Tabs } from "./Tabs/Tabs";

interface Props {
  activeTab: number;
  onChangeTab: (index: number) => void;
  filterLiked: boolean;
  onToggleFilterLiked: () => void;
  chatOpen?: boolean;
  infoOpen?: boolean;
  currency: string;
  onChangeCurrency: (value: string) => void;
}

export const Actions = ({
  activeTab,
  onChangeTab,
  filterLiked,
  onToggleFilterLiked,
  chatOpen,
  infoOpen,
  currency,
  onChangeCurrency,
}: Props) => (
  <StyledActions className="flex items-center" chatOpen={chatOpen}>
    {/* {activeTab === 0 && !infoOpen && (
      <>
        <div className="mobile-footer">
          <LikedFilter
            filterLiked={filterLiked}
            onToggleFilterLiked={onToggleFilterLiked}
          />
        </div>
        <Divider />
      </>
    )} */}
    <Currency currency={currency} onChangeCurrency={onChangeCurrency} />
    <Tabs activeTab={activeTab} onChangeTab={onChangeTab} />
  </StyledActions>
);

interface StyledActionsProps {
  chatOpen?: boolean;
}

const StyledActions = styled.div<StyledActionsProps>`
  @media (max-width: 1000px) {
    width: 100%;
    .mobile-footer {
      position: fixed;
      bottom: 0;
      width: 100vw;
      height: 72px;
      background: #2c2c2c;
      z-index: 6;
      left: 0;
      right: 0;
      ${({ chatOpen }) => chatOpen && "display: none;"}
    }
  }
`;

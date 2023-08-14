import { styled } from "styled-components";
import { Tab } from "./Tab";
import { useLocation } from "react-router-dom";

interface Props {
  activeTab: number;
  onChangeTab: (index: number) => void;
}

export const Tabs = ({ onChangeTab }: Props) => {
  const handleChangeTab = (tabIndex: number) => onChangeTab(tabIndex);
  const TABS = [
    { title: "Історія", link: "/history" },
    { title: "Нові", link: "/" },
  ];
  const { pathname } = useLocation();

  return (
    <StyledTabs className="select-none">
      {TABS.map((tab, i) => (
        <Tab
          key={i}
          title={tab.title}
          link={tab.link}
          onClick={() => handleChangeTab(i)}
          active={tab.link === pathname}
        />
      ))}
    </StyledTabs>
  );
};

const StyledTabs = styled.div`
  padding: 3px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.25);
  width: 230px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  position: relative;
  @media (max-width: 1200px) {
    width: 180px;
  }
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

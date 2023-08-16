import { styled } from "styled-components";
import { Header } from "./Components/Header/Header";
import { useState, useEffect } from "react";
import { History } from "./Pages/History/History";
import { Chat } from "./Components/Chat/Chat";
import { NewSelections } from "./Pages/NewSelections/NewSelections";
import { getRieltor, sendMessage } from "./api/methods";
import { Route, Routes, useLocation } from "react-router-dom";
import { Spinner } from "./Components/Spinner";
import { Info } from "./Pages/Info/Info";

export const App = () => {
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState<number>(
    pathname === "/history" ? 0 : 1
  );
  const [filterLiked, setFilterLiked] = useState<boolean>(false);
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [infoOpen, setInfoOpen] = useState<null | any>(null);
  const [currency, setCurrency] = useState<string>(
    localStorage.getItem("currency") ?? "UAH"
  );
  const [rieltor, setRieltor] = useState<{
    name: string;
    photo: string | undefined;
    phones: string[];
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeCurrency = (value: string) => {
    setCurrency(value);
    localStorage.setItem("currency", value);
  };

  const handleChangeTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
    setInfoOpen(false);
    setFilterLiked(false);
  };
  const handleToggleFilterLiked = () => setFilterLiked(!filterLiked);
  const handleToggleChat = () => {
    setChatOpen(!chatOpen);
    setInfoOpen(null);
  };
  const handleOpenInfo = (card: any) => setInfoOpen(card);

  const handleSendSelection = (type: string, id: string) => {
    setChatOpen(false);
    sendMessage("", undefined, type, id).then(() => setChatOpen(true));
  };

  const handleGetRieltor = () => {
    setLoading(true);
    getRieltor().then((resp) => {
      resp?.data?.result &&
        setRieltor({
          name: resp?.data?.result?.name,
          photo: resp?.data?.result?.img,
          phones: resp?.data?.result?.phones ?? [],
        });
      setLoading(false);
    });
  };

  useEffect(() => {
    handleGetRieltor();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner className="app-spinner" />
      ) : rieltor ? (
        <StyledApp chatOpen={!!chatOpen} infoOpen={infoOpen}>
          <Header
            activeTab={activeTab}
            onChangeTab={handleChangeTab}
            filterLiked={filterLiked}
            onToggleFilterLiked={handleToggleFilterLiked}
            chatOpen={chatOpen}
            onToggleChat={handleToggleChat}
            infoOpen={infoOpen}
            currency={currency}
            onChangeCurrency={handleChangeCurrency}
            rieltor={rieltor}
          />
          <Chat
            open={chatOpen}
            onCloseChat={() => setChatOpen(false)}
            rieltor={rieltor}
          />
          {infoOpen && (
            <Info
              infoOpen={infoOpen}
              onClose={() => setInfoOpen(null)}
              onSendRealtor={handleSendSelection}
              currency={currency}
              onChangeCurrency={handleChangeCurrency}
            />
          )}
          <div
            className={`content ${!!chatOpen && "chat-opened"}`}
            style={{ display: !!infoOpen ? "none" : "block" }}
          >
            <Routes>
              <Route
                path="/history"
                element={
                  <History
                    onOpenInfo={handleOpenInfo}
                    currency={currency}
                    onSendRealtor={handleSendSelection}
                    filterLiked={filterLiked}
                    infoOpen={!!infoOpen}
                  />
                }
              />
              <Route
                path="*"
                element={
                  <NewSelections
                    onOpenInfo={handleOpenInfo}
                    onSendRealtor={handleSendSelection}
                    currency={currency}
                    onChangeCurrency={handleChangeCurrency}
                  />
                }
              />
            </Routes>
          </div>
        </StyledApp>
      ) : (
        <div className="empty-title">Підбірку не знайдено</div>
      )}
    </>
  );
};

interface StyledAppProps {
  chatOpen: boolean;
  infoOpen: boolean;
}

const StyledApp = styled.div<StyledAppProps>`
  max-width: 1400px;
  width: calc(100% - 16px);
  margin: 0 auto;
  @media (max-width: 1000px) {
    .chat-opened {
      display: none !important;
    }
  }
`;

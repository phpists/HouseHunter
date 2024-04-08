import { styled } from "styled-components";
import { Header } from "./Components/Header/Header";
import { useState, useEffect } from "react";
import { History } from "./Pages/History/History";
import { Chat } from "./Components/Chat/Chat";
import { NewSelections } from "./Pages/NewSelections/NewSelections";
import {
  getInfoObject,
  getPhonesCodes,
  getRieltor,
  sendMessage,
} from "./api/methods";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "./Components/Spinner";
import { Info } from "./Pages/Info/Info";
import { checkIsBrowserSupportTouch } from "./helpers";

export const App = () => {
  const navigate = useNavigate();
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
    phone: any;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInfoMore, setLoadingInfoMore] = useState<string | null>(null);
  const [appendObjectToList, setAppendObjectToList] = useState<any | null>(
    null
  );
  const [phonesCodes, setPhonesCodes] = useState<any>([]);

  useEffect(() => {
    getPhonesCodes().then((resp) =>
      setPhonesCodes(
        resp?.data
          ? Object.entries(resp?.data)
              ?.map((e) => e[1])
              ?.filter((e) => e !== 0)
          : []
      )
    );
  }, []);

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
  const handleOpenInfo = (card: any) =>
    setInfoOpen({ ...card, id: card?.id_hash });
  const handleCloseInfo = () => {
    setInfoOpen(null);
    setAppendObjectToList(null);
  };

  const handleSendSelection = (type: string, id: string) => {
    setChatOpen(false);
    sendMessage(undefined, undefined, type, id).then(() => {
      setChatOpen(true);
      setInfoOpen(null);
    });
  };

  const handleGetRieltor = () => {
    setLoading(true);
    getRieltor().then((resp) => {
      resp?.data &&
        setRieltor({
          name: resp?.data?.name,
          photo:
            resp?.data?.img?.length > 0
              ? resp?.data?.img
              : resp?.data?.company_img,
          phone: resp?.data?.phone ?? [],
        });
      setLoading(false);
    });
  };

  useEffect(() => {
    handleGetRieltor();
    checkIsBrowserSupportTouch();
  }, []);

  const handleChangeOpenObjectStatus = (objectInfo: any, like: number) => {
    setAppendObjectToList({ ...objectInfo, like });
    navigate("/history");
    setActiveTab(0);
  };

  const handleOpenObjectFromChat = (
    id_hash: string,
    type: string,
    state: string
  ) => {
    setLoadingInfoMore(id_hash);
    getInfoObject(id_hash, type).then((resp: any) => {
      setLoadingInfoMore(null);
      const objectInfo = resp?.data?.data ?? null;
      if (objectInfo) {
        setChatOpen(false);
        setInfoOpen({
          ...objectInfo,
          history: true,
          id: id_hash,
          onChangeStatus: (like: number) =>
            handleChangeOpenObjectStatus(objectInfo, like),
        });
        // navigate(state === "new" ? "/" : "/history");
        // setActiveTab(state === "new" ? 1 : 0);
        // setAppendObjectToList({ ...objectInfo, id: id_hash });
      }
    });
  };

  return (
    <>
      {loading ? (
        <Spinner className="app-spinner" />
      ) : rieltor ? (
        <>
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
            rieltor={rieltor ?? null}
            phonesCodes={phonesCodes}
          />
          <StyledApp chatOpen={!!chatOpen} infoOpen={infoOpen}>
            <Chat
              open={chatOpen}
              onCloseChat={() => setChatOpen(false)}
              rieltor={rieltor}
              onOpenObject={handleOpenObjectFromChat}
              loadingInfoMore={loadingInfoMore}
              phonesCodes={phonesCodes}
            />
            {infoOpen && (
              <Info
                infoOpen={infoOpen}
                onClose={handleCloseInfo}
                onSendRealtor={handleSendSelection}
                currency={currency}
                onChangeCurrency={handleChangeCurrency}
                rieltor={rieltor}
              />
            )}
            <div
              className={`content main-app-content ${
                !!chatOpen && "chat-opened"
              }`}
              style={{
                display: !!infoOpen && infoOpen?.history ? "none" : "block",
              }}
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
                      appendObjectToList={appendObjectToList}
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
                      rieltor={rieltor}
                      appendObjectToList={appendObjectToList}
                    />
                  }
                />
              </Routes>
            </div>
          </StyledApp>
        </>
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
  .main-app-content {
    padding-top: 73px;
  }
  @media (max-width: 1000px) {
    .chat-opened {
      display: none !important;
    }
    .main-app-content {
      padding-top: 140px;
    }
  }
`;

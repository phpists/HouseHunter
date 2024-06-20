import { styled } from "styled-components";
import { Header } from "./Components/Header/Header";
import { useState, useEffect, useRef } from "react";
import { History } from "./Pages/History/History";
import { Chat } from "./Components/Chat/Chat";
import { NewSelections } from "./Pages/NewSelections/NewSelections";
import {
  getInfoObject,
  getObject,
  getPhonesCodes,
  getRieltor,
  sendMessage,
} from "./api/methods";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "./Components/Spinner";
import { Info } from "./Pages/Info/Info";
import { checkIsBrowserSupportTouch } from "./helpers";
import logo from "./assets/images/logo.png";

export const App = () => {
  const { pathname } = useLocation();
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [infoOpen, setInfoOpen] = useState<null | any>(null);
  const [currency, setCurrency] = useState<string>(
    localStorage.getItem("currency") ?? "UAH"
  );
  const [object, setObject] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInfoMore, setLoadingInfoMore] = useState<string | null>(null);
  const [appendObjectToList, setAppendObjectToList] = useState<any | null>(
    null
  );
  const [phonesCodes, setPhonesCodes] = useState<any>([]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      getPhonesCodes().then((resp) =>
        setPhonesCodes(
          resp?.data
            ? Object.entries(resp?.data)
                ?.map((e) => e[1])
                ?.filter((e) => e !== 0)
            : []
        )
      );
      handleGetObject();
    }
  }, []);

  const handleChangeCurrency = (value: string) => {
    setCurrency(value);
    localStorage.setItem("currency", value);
  };

  const handleOpenInfo = (card: any) =>
    setInfoOpen({ ...card, id: card?.id ?? card?.id_hash });

  const handleSendSelection = (type: string, id: string) => {
    setChatOpen(false);
    sendMessage(undefined, undefined, type, id).then(() => {
      setChatOpen(true);
      setInfoOpen(null);
    });
  };

  const handleGetObject = () => {
    setLoading(true);
    if (!loading) {
      getObject().then((resp) => {
        setObject(
          resp?.data?.data
            ? { ...resp?.data?.data, img: resp?.data?.data?.photos }
            : resp?.data?.data
        );
        setLoading(false);
      });
    }
  };
  const handleClearCacheData = () => {
    caches.keys().then((names: any) => {
      names.forEach((name: any) => {
        caches.delete(name);
      });
    });
  };

  useEffect(() => {
    checkIsBrowserSupportTouch();
    handleClearCacheData();
  }, []);

  useEffect(() => {
    document.addEventListener("gesturestart", function (e) {
      e.preventDefault();
    });
  }, []);

  return (
    <>
      {loading ? (
        <Spinner className="app-spinner" />
      ) : object ? (
        <>
          <StyledApp chatOpen={!!chatOpen} infoOpen={infoOpen}>
            <div
              className={`content main-app-content ${
                !!chatOpen && "chat-opened"
              }`}
              style={{
                display: !!infoOpen && infoOpen?.history ? "none" : "block",
              }}
            >
              <NewSelections
                onOpenInfo={handleOpenInfo}
                onSendRealtor={handleSendSelection}
                currency={currency}
                onChangeCurrency={handleChangeCurrency}
                appendObjectToList={appendObjectToList}
                object={object}
                phonesCodes={phonesCodes}
              />
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
  }
  @media (max-width: 1000px) {
    .chat-opened {
      display: none !important;
    }
    .main-app-content {
      /* padding-top: 140px; */
    }
  }
`;

import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Header } from "./Header";
import { Footer } from "./Footer/Footer";
import { Content } from "./Content";
import { getChat } from "../../api/methods";

interface Props {
  open: boolean;
  className?: string;
  onCloseChat: () => void;
  rieltor: { name: string; photo: string | undefined; phones: string[] };
  onOpenObject: (id_object_hash: string, type: string, state: string) => void;
  loadingInfoMore: string | null;
}

export const Chat = ({
  open,
  className,
  onCloseChat,
  rieltor,
  onOpenObject,
  loadingInfoMore,
}: Props) => {
  const [data, setData] = useState<any>([]);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  const handleSelectMessage = (msg: any) =>
    setSelectedMessage(msg === selectedMessage ? null : msg);

  const handleGetMessages = () => {
    getChat().then((resp: any) => setData(resp?.data ?? []));
  };

  useEffect(() => {
    handleGetMessages();
    setSelectedMessage(null);
  }, [open]);

  return (
    <StyledChat
      className={`flex flex-col justify-between ${className} ${
        open && "active"
      }`}
    >
      <Header onCloseChat={onCloseChat} rieltor={rieltor} />
      <Content
        open={open}
        data={data}
        onOpenObject={onOpenObject}
        loadingInfoMore={loadingInfoMore}
        selected={selectedMessage}
        onSelect={handleSelectMessage}
        rieltorName={rieltor?.name ?? "Рієлтор"}
      />
      <Footer
        onRefreshData={handleGetMessages}
        selectedMessage={selectedMessage}
        onCloseSelectedMessage={() => setSelectedMessage(null)}
        rieltorName={rieltor?.name ?? "Рієлтор"}
      />
    </StyledChat>
  );
};

const StyledChat = styled.div`
  padding: 7px 0;
  border-radius: 12px;
  background: #454545;
  position: fixed;
  z-index: 100000;
  width: 332px;
  bottom: 3vh;
  right: 3vh;
  transform: translateX(100vw);
  transition: all 0.4s;
  &.active {
    transform: translateX(0);
  }
  @media (max-width: 1000px) {
    background: #2c2c2c;
    display: none;
    transform: translateX(0);
    position: unset;
    width: 100%;
    bottom: unset;
    right: unset;
    &.active {
      display: block;
    }
  }
`;

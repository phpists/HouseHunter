import { useState } from "react";
import { styled } from "styled-components";
import { Input } from "./Input";
import { SendButton } from "./SendButton";
import { sendMessage } from "../../../api/methods";

interface Props {
  onRefreshData: () => void;
  selectedMessage: any;
  onCloseSelectedMessage: () => void;
  rieltorName: string;
}

export const Footer = ({
  onRefreshData,
  selectedMessage,
  onCloseSelectedMessage,
  rieltorName,
}: Props) => {
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendMessage = () => {
    if (!loading && value.length > 0) {
      setLoading(true);
      const parentId = selectedMessage?.id.toString();
      if (parentId?.length > 0) {
        sendMessage(value, undefined, undefined, undefined, parentId).then(
          (resp) => {
            setValue("");
            onRefreshData();
            setLoading(false);
            onCloseSelectedMessage();
          }
        );
      } else {
        sendMessage(value).then((resp) => {
          setValue("");
          onRefreshData();
          setLoading(false);
        });
      }
    }
  };

  return (
    <StyledFooter className="flex items-center">
      <Input
        value={value}
        onChange={(value: string) => setValue(value)}
        onRefreshData={onRefreshData}
        loading={loading}
        selectedMessage={selectedMessage}
        onCloseSelectedMessage={onCloseSelectedMessage}
        rieltorName={rieltorName}
      />
      <SendButton onSend={handleSendMessage} loading={loading} />
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  margin: 0 4px;
  position: relative;
`;

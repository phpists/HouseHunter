import { useState } from "react";
import { styled } from "styled-components";
import { Input } from "./Input";
import { SendButton } from "./SendButton";
import { sendMessage } from "../../../api/methods";

interface Props {
  onRefreshData: () => void;
}

export const Footer = ({ onRefreshData }: Props) => {
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendMessage = () => {
    if (!loading && value.length > 0) {
      setLoading(true);
      sendMessage(value).then((resp) => {
        setValue("");
        onRefreshData();
        setLoading(false);
      });
    }
  };

  return (
    <StyledFooter className="flex items-center">
      <Input
        value={value}
        onChange={(value: string) => setValue(value)}
        onRefreshData={onRefreshData}
        loading={loading}
      />
      <SendButton onSend={handleSendMessage} loading={loading} />
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  margin: 0 4px;
`;

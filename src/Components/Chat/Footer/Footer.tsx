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

  const handleSendMessage = () => {
    sendMessage(value).then((resp) => {
      console.log("yes");
      setValue("");
      onRefreshData();
    });
  };

  return (
    <StyledFooter className="flex items-center">
      <Input
        value={value}
        onChange={(value: string) => setValue(value)}
        onRefreshData={onRefreshData}
      />
      <SendButton onSend={handleSendMessage} />
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  margin: 0 4px;
`;

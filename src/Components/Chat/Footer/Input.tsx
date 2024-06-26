import { useEffect, useRef } from "react";
import { styled } from "styled-components";
// import fileIcon from "../../../assets/images/file-text.svg";
import imageIcon from "../../../assets/images/image.svg";
import { sendMessage } from "../../../api/methods";
import { SelectedMessage } from "./SelectedMessage";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onRefreshData: () => void;
  loading: boolean;
  selectedMessage: any;
  onCloseSelectedMessage: () => void;
  rieltorName: string;
  onSend: () => void;
  open: boolean;
}

export const Input = ({
  value,
  onChange,
  onRefreshData,
  loading,
  selectedMessage,
  onCloseSelectedMessage,
  rieltorName,
  onSend,
  open,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSelectPhoto = () => {
    if (fileInputRef.current && !loading) {
      fileInputRef.current.click();
    }
  };

  const handleUploadPhoto = (e: any) => {
    const file = e?.target?.files[0];

    if (file) {
      sendMessage(undefined, file).then((resp: any) => {
        if (resp === "success") {
          onRefreshData();
        }
      });
    }
  };

  const handleResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${
        value?.length === 0
          ? 18
          : textareaRef.current.scrollHeight > 54
          ? 54
          : textareaRef.current.scrollHeight
      }px`;
    }
  };

  useEffect(() => {
    handleResizeTextarea();
  }, [value]);

  const textAreaAdjust = (e: any) => {
    e.target.style.height = "1px";
    e.target.style.height = e.target.scrollHeight + "px";
    onChange(e.target.value);
  };

  useEffect(() => {
    if (open && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [open]);

  return (
    <StyledInput
      className={`flex items-center chat ${
        loading && "cursor-not-allowed opacity-90"
      }`}
    >
      {!!selectedMessage && (
        <SelectedMessage
          selectedMessage={selectedMessage}
          onCloseSelectedMessage={onCloseSelectedMessage}
          rieltorName={rieltorName}
          loading={loading}
        />
      )}
      <textarea
        value={value}
        onChange={textAreaAdjust}
        placeholder="Повідомлення"
        disabled={!open}
        ref={textareaRef}
        onKeyDown={(e) => e?.keyCode === 13 && !e?.shiftKey && onSend()}
        onBlur={(e) => e.target.focus()}
        className="chat"
      />
      {!selectedMessage && (
        <>
          <input
            type="file"
            ref={fileInputRef}
            value=""
            className="file-input chat"
            onChange={handleUploadPhoto}
            accept="image/png, image/jpg, image/jpeg"
          />
          <img
            src={imageIcon}
            alt=""
            onClick={handleSelectPhoto}
            className="chat"
          />
        </>
      )}
      {/* <img src={fileIcon} alt="" className="file-btn" /> */}
    </StyledInput>
  );
};

const StyledInput = styled.div`
  border-radius: 9px;
  background: #343434;
  min-height: 40px;
  padding: 12px 10px 10px 14px;
  color: #fff;
  text-overflow: ellipsis;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  width: 100%;
  z-index: 2;
  input {
    width: 100%;
    padding-right: 10px;
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
  textarea {
    width: 100%;
    padding-right: 10px;
    resize: none;
    height: 20px;
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
  img {
    cursor: pointer;
  }
  .file-btn {
    margin-right: 10px;
  }
  .file-input {
    display: none;
  }
`;

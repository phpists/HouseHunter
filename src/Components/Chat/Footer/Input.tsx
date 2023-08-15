import { useRef } from "react";
import { styled } from "styled-components";
// import fileIcon from "../../../assets/images/file-text.svg";
import imageIcon from "../../../assets/images/image.svg";
import { sendMessage } from "../../../api/methods";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onRefreshData: () => void;
}

export const Input = ({ value, onChange, onRefreshData }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectPhoto = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const handleUploadPhoto = (e: any) => {
    const file = e?.target?.files[0];

    if (file) {
      sendMessage(undefined, file).then((resp) => {
        console.log(resp);
        onRefreshData();
      });
    }
  };

  return (
    <StyledInput className="flex items-center">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Повідомлення"
      />
      <input
        type="file"
        ref={fileInputRef}
        value=""
        className="file-input"
        onChange={handleUploadPhoto}
      />
      {/* <img src={fileIcon} alt="" className="file-btn" /> */}
      <img src={imageIcon} alt="" onClick={handleSelectPhoto} />
    </StyledInput>
  );
};

const StyledInput = styled.div`
  border-radius: 9px;
  background: #343434;
  height: 40px;
  padding: 12px 10px 10px 14px;
  color: #fff;
  text-overflow: ellipsis;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  width: 100%;
  input {
    width: 100%;
    padding-right: 10px;
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

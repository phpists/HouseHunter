import { SendButton } from "./SendButton";
import likeIcon from "../../../assets/images/thumbs-up.svg";
import dislikeIcon from "../../../assets/images/thumbs-down.svg";
import { ActionButton } from "./ActionButton";

interface Props {
  onChangeStatus: (value: string | null) => void;
  onSendRealtor: () => void;
  disabled?: boolean;
}

export const Footer = ({ onChangeStatus, onSendRealtor, disabled }: Props) => (
  <div className="flex items-center">
    <ActionButton
      icon={dislikeIcon}
      onClick={() => (disabled ? null : onChangeStatus("left"))}
      status={false}
      disabled={disabled}
    />
    <SendButton onClick={onSendRealtor} />
    <ActionButton
      icon={likeIcon}
      onClick={() => (disabled ? null : onChangeStatus("right"))}
      status={true}
      disabled={disabled}
    />
  </div>
);

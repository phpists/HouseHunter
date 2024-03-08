import { styled } from "styled-components";
import { MessageFooter } from "../MessageFooter";
import { Response } from "../Response";

interface Props {
  text: string;
  isOwner?: boolean;
  first?: boolean;
  last?: boolean;
  between?: boolean;
  date: number;
  isSelected: boolean;
  onSelect: () => void;
  idParent?: string;
  onScrollToResponseMessage: () => any;
  id: number;
  parentMsg: any;
  rieltorName: string;
}

export const Message = ({
  text,
  isOwner,
  first,
  last,
  between,
  date,
  isSelected,
  onSelect,
  idParent,
  parentMsg,
  onScrollToResponseMessage,
  id,
  rieltorName,
}: Props) => {
  const handleCheckIsMobile = () => {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
      // @ts-ignore
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };

  const handleSelectMessage = (e: any) =>
    !handleCheckIsMobile() &&
    e.target.classList.contains("message") &&
    onSelect();

  const handleSelectTouchMessage = (e: any) =>
    handleCheckIsMobile() &&
    e.target.classList.contains("message") &&
    onSelect();

  return (
    <StyledMessage
      isOwner={isOwner}
      first={first}
      last={last}
      between={between}
      onClick={handleSelectMessage}
      onTouchEnd={handleSelectTouchMessage}
      isSelected={isSelected}
      className="message"
      data-id={id}
    >
      {idParent && parentMsg && (
        <Response
          onClick={onScrollToResponseMessage}
          parentMsg={parentMsg}
          rieltorName={rieltorName}
        />
      )}
      <div className="message">
        {text?.split("\r\n")?.map((t, i) => (
          <div key={i}>{t}</div>
        ))}
        {/* {first && "first"} {last && "last"} {between && "between"} */}
      </div>
      <MessageFooter date={date} isOwner={!!isOwner} isSelected={isSelected} />
    </StyledMessage>
  );
};
interface StyledMessageProps {
  isOwner?: boolean;
  first?: boolean;
  last?: boolean;
  between?: boolean;
  isSelected: boolean;
}

const StyledMessage = styled.div<StyledMessageProps>`
  max-width: 80%;
  width: max-content;
  padding: ${({ isOwner }) =>
    isOwner ? "8px 10px 5px 10px" : `8px 10px 5px 10px`};
  border-radius: ${({ isOwner, last, between }) =>
    isOwner
      ? `12px ${last || between ? 2 : 12}px 2px 12px`
      : `${last || between ? 2 : 12}px 12px 12px 2px`};
  background: ${({ isOwner }) => (isOwner ? "#5D63FF" : "#5c5c5c")};
  margin: ${({ isOwner, isSelected }) =>
    isOwner
      ? `0 ${isSelected ? 25 : 11}px 0 auto`
      : `0 auto 0 ${isSelected ? 25 : 11}px`};
  position: relative;
  margin-bottom: ${({ first, between }) => (first || between ? 2 : 12)}px;
  word-wrap: break-word;
  cursor: pointer;
  transition: all 0.3s;
  &::before {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    ${({ isOwner }) => (isOwner ? "right: -12.3px;" : "left: -12.3px;")}
    width: 0;
    height: 0;
    border-left: 13px solid transparent;
    border-right: 13px solid transparent;
    border-bottom: 13px solid
      ${({ isOwner }) => (isOwner ? "#5D63FF" : "#5c5c5c")};
  }
  &::after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0px;
    ${({ isOwner }) => (isOwner ? "right: -24px;" : "left: -24px;")}
    height: 26px;
    width: 24px;
    border-radius: 100%;
    z-index: 100;
    background: ${({ isOwner }) => (isOwner ? "#5D63FF" : "#454545")};
  }
  ${({ first, between }) =>
    (first || between) &&
    `
    &::before, 
    &::after {
        display: none;
    }
  `}
  @media(max-width: 1000px) {
    background: ${({ isOwner }) => (isOwner ? "#5D63FF" : "#454545")};
    &::before {
      border-bottom: 13px solid
        ${({ isOwner }) => (isOwner ? "#5D63FF" : "#454545")};
    }
  }
`;

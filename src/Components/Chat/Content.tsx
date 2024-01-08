import { styled } from "styled-components";
import { Message } from "./Message/Message";
import { Photo } from "./Photo/Photo";
import { useEffect, useRef } from "react";
import { formatNumber } from "../../helpers/numbers";
import noPhoto from "../../assets/images/no-photo.svg";

interface Props {
  open: boolean;
  data: any;
  onOpenObject: (id_hash: string, type: string, state: string) => void;
  loadingInfoMore: string | null;
  selected: any;
  onSelect: (msg: any) => void;
  rieltorName: string;
}

export const Content = ({
  open,
  data,
  onOpenObject,
  loadingInfoMore,
  selected,
  onSelect,
  rieltorName,
}: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScrollToMessage = (id: any, toBottom?: boolean) => {
    if (contentRef.current) {
      Array.from(contentRef.current.children).forEach((e: any, i: number) => {
        const elementId = Number(e.getAttribute("data-id"));
        if (elementId === Number(id) && e?.offsetTop && contentRef.current) {
          const isToBottom =
            toBottom && i === Array.from(contentRef.current.children).length - 1
              ? e.offsetHeight
              : 0;

          contentRef.current.scroll({
            top: e?.offsetTop - 100 + isToBottom,
          });
          e.classList.add("show-animation");
          setTimeout(() => e.classList.remove("show-animation"), 600);
        }
      });
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scroll({
        top: contentRef.current.scrollHeight,
      });
    }
  }, [open, data]);

  const handleClickOnContent = (e: any) => {
    if (e.target.classList.contains("content-wrapper")) {
      onSelect(null);
    }
  };

  useEffect(() => {
    if (selected) {
      handleScrollToMessage(selected?.id, true);
    }
  }, [selected]);

  return (
    <StyledContent
      ref={contentRef}
      className="content-wrapper"
      onClick={handleClickOnContent}
      selected={!!selected}
    >
      {data?.length > 0
        ? data.map((msg: any, i: number) => {
            if (
              msg?.messege?.title ||
              msg?.messege?.img?.img ||
              msg?.messege?.object
            ) {
              const text =
                msg?.messege?.title || msg?.messege?.price
                  ? `${msg?.messege?.title ?? "-"}, ${formatNumber(
                      msg?.messege?.price
                    )}`
                  : undefined;
              return (
                <Photo
                  key={i}
                  photo={
                    msg?.messege?.object?.photo?.length > 0
                      ? msg?.messege?.object?.photo
                      : msg?.messege?.img?.img?.length > 0
                      ? msg?.messege?.img?.img
                      : noPhoto
                  }
                  text={text}
                  date={msg?.time}
                  isOwner={!msg?.id_user}
                  onOpenObject={
                    msg?.messege?.object?.id && !loadingInfoMore
                      ? () =>
                          onOpenObject(
                            msg?.messege?.object?.id,
                            msg?.messege?.object?.type,
                            msg?.messege?.object?.state
                          )
                      : null
                  }
                  loading={loadingInfoMore === msg?.messege?.object?.id}
                  onSelect={() =>
                    i === selected?.id
                      ? onSelect(null)
                      : onSelect({ ...msg, text, id: i })
                  }
                  isSelected={selected?.id === msg.id}
                  id={i}
                  idParent={msg?.id_parent}
                  onScrollToResponseMessage={() =>
                    handleScrollToMessage(msg?.id_parent)
                  }
                  isObject={!!msg?.messege?.object?.id}
                />
              );
            } else if (msg?.messege) {
              return (
                <Message
                  key={i}
                  text={msg?.messege ?? ""}
                  date={msg?.time}
                  isOwner={!msg?.id_user}
                  first={
                    (!data[i - 1]?.messege?.image &&
                      !data[1 + i]?.messege?.image &&
                      data[i - 1]?.user !== msg?.user &&
                      data[1 + i]?.user === msg?.user) ||
                    ((data[i - 1]?.messege?.img ||
                      data[i - 1]?.messege?.title) &&
                      data[i - 1]?.user === msg.user)
                  }
                  between={
                    data[i - 1]?.user === msg?.user &&
                    data[1 + i]?.user === msg?.user &&
                    !data[i - 1]?.messege?.img &&
                    !data[1 + i]?.messege?.img &&
                    !data[i - 1]?.messege?.image &&
                    !data[1 + i]?.messege?.image
                  }
                  last={
                    data[i - 1]?.user === msg?.user &&
                    (data[1 + i]?.user !== msg?.user ||
                      data[1 + i]?.messege?.img) &&
                    !data[i - 1]?.messege?.image &&
                    !data[1 + i]?.messege?.image
                  }
                  isSelected={selected?.id === i}
                  onSelect={() =>
                    i === selected?.id
                      ? onSelect(null)
                      : onSelect({ ...msg, text: msg?.messege ?? "", id: i })
                  }
                  idParent={msg?.id_parent}
                  parentMsg={data.find(
                    (m: any, j: number) =>
                      j.toString() === msg?.id_parent?.toString()
                  )}
                  onScrollToResponseMessage={() =>
                    handleScrollToMessage(msg?.id_parent)
                  }
                  id={i}
                  rieltorName={rieltorName}
                />
              );
            }

            return null;
          })
        : null}
    </StyledContent>
  );
};

interface StyledContentProps {
  selected: boolean;
}

const StyledContent = styled.div<StyledContentProps>`
  height: 490px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 13px 0;
  ${({ selected }) => selected && "padding-bottom: 61px;"}
  div {
    &::after {
      background: #454545;
    }
  }
  @media (max-width: 1000px) {
    height: calc(100svh - 150px);
    div {
      &::after {
        background: #2c2c2c;
      }
    }
  }
  .show-animation {
    opacity: 0.5;
  }
`;

import { styled } from "styled-components";
import { Message } from "./Message/Message";
import { Photo } from "./Photo/Photo";
import { useEffect, useRef } from "react";
import { formatNumber } from "../../helpers/numbers";
import noPhoto from "../../assets/images/no-photo.svg";

interface Props {
  open: boolean;
  data: any;
  onOpenObject: (id_object_hash: string, type: string, state: string) => void;
  loadingInfoMore: string | null;
}

export const Content = ({
  open,
  data,
  onOpenObject,
  loadingInfoMore,
}: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scroll({
        top: contentRef.current.scrollHeight,
      });
    }
  }, [open, data]);

  return (
    <StyledContent ref={contentRef}>
      {data?.length > 0
        ? data.map((msg: any, i: number) => {
            if (msg?.messege?.title || msg?.messege?.img) {
              return (
                <Photo
                  key={i}
                  photo={
                    msg?.messege?.img?.length > 0 ? msg?.messege?.img : noPhoto
                  }
                  text={
                    msg?.messege?.title || msg?.messege?.price
                      ? `${msg?.messege?.title ?? "-"}, ${formatNumber(
                          msg?.messege?.price
                        )}`
                      : undefined
                  }
                  date={msg?.date}
                  isOwner={msg?.user === 0}
                  onOpenObject={
                    msg?.messege?.id_object_hash &&
                    msg?.messege?.type &&
                    !loadingInfoMore
                      ? () =>
                          onOpenObject(
                            msg?.messege?.id_object_hash,
                            msg?.messege?.type,
                            msg?.messege?.state
                          )
                      : null
                  }
                  loading={loadingInfoMore === msg?.messege?.id_object_hash}
                />
              );
            } else if (msg?.messege) {
              return (
                <Message
                  key={i}
                  text={msg?.messege ?? ""}
                  date={msg?.date}
                  isOwner={msg?.user === 0}
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
                />
              );
            }

            return null;
          })
        : null}
    </StyledContent>
  );
};

const StyledContent = styled.div`
  height: 490px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 13px 0;
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
`;

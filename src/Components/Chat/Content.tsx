import { styled } from "styled-components";
import { Message } from "./Message/Message";
import { Photo } from "./Photo/Photo";
import { useEffect, useRef } from "react";
import { formatNumber } from "../../helpers/numbers";

interface Props {
  open: boolean;
  data: any;
}

export const Content = ({ open, data }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scroll({
        top: contentRef.current.scrollHeight,
        behavior: "smooth",
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
                  photo={msg?.messege?.img}
                  text={`${msg?.messege?.title ?? "-"}, ${formatNumber(
                    msg?.messege?.price
                  )}$`}
                  date={msg?.date}
                  isOwner={msg?.user === 0}
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
      {/* <Message
        text="Доброго дня! Я шукаю квартиру в Україні. Чи можете мені допомогти з цим?"
        isOwner
      />
      <Message text="Звичайно! Радий допомогти з пошуком квартири." first />
      <Message
        text="Можете розповісти мені більше про ваші вимоги та бюджет?"
        last
      />
      <Message text="Звичайно." isOwner first />
      <Message
        text="Я шукаю 2-кімнатну квартиру в центрі міста. Бажано з балконом та паркінгом."
        isOwner
        between
      />
      <Message text="Мій бюджет складає до $1000 на місяць." isOwner last />
      <Message text="Розумію ваші вимоги. Я розпочну пошук та надішлю вам пропозиції найближчим часом. Якщо ви маєте якісь додаткові побажання, будь ласка, повідомте мене." />
      <Photo photo={testImage} isOwner />
      <Photo
        photo={testImage}
        text="Буду вам повідомляти про нові варіанти квартир та задавати питання, якщо потрібно буде додаткове уточнення."
        isOwner
      />
      <Photo photo={testImage} text="Ось наприклад" /> */}
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
    height: calc(100vh - 115px);
    div {
      &::after {
        background: #2c2c2c;
      }
    }
  }
`;

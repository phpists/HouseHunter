import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Card } from "./Card/Card";
import { Empty } from "../Swaper/Empty";
import { Animation } from "./Animation";
import { getLocation } from "../../helpers";
import { MoreInfo } from "./Card/MoreInfo/MoreInfo";
import noPhoto from "../../assets/images/no-photo.svg";
import { CardList } from "./CardList";
import { PhotosView } from "./PhotosView/Photos";

interface Props {
  cards: any[];
  history?: boolean;
  cardStatusChanged: null | string;
  onChangeStatus: (
    index: number,
    direction: string | null,
    id: string,
    type: string
  ) => void;
  onSendRealtor: (type: string, id: string) => void;
  currency: string;
  onChangeCurrency: (value: string) => void;
  onClose?: () => void;
  disabled?: boolean;
  phonesCodes?: any;
}

export const Cards = ({
  cards,
  history,
  cardStatusChanged,
  onChangeStatus,
  onSendRealtor,
  currency,
  onChangeCurrency,
  onClose,
  disabled,
  phonesCodes,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [openPhotoView, setOpenPhotoView] = useState<boolean>(false);
  const [photosView, setPhotosView] = useState<string[]>([]);

  const handleOpenPhotoView = (photos: string[]) => {
    setOpenPhotoView(true);
    setPhotosView(photos?.length > 0 ? photos : []);
  };

  const handleClosePhotoView = () => {
    setOpenPhotoView(false);
    setPhotosView([]);
  };

  useEffect(() => {
    setLoading(true);
    setData(cards?.slice(0, 3)?.reverse() ?? []);
    setTimeout(() => setLoading(false), 100);
  }, [cards]);

  return (
    <>
      <PhotosView
        open={openPhotoView}
        onClose={handleClosePhotoView}
        images={photosView}
      />
      <StyledCards
        className={`flex items-center justify-center `}
        isEmpty={cards.length === 0}
      >
        {cardStatusChanged && history && (
          <Animation status={cardStatusChanged} />
        )}
        <CardList
          cards={data}
          history={history}
          cardStatusChanged={cardStatusChanged}
          onChangeStatus={onChangeStatus}
          onSendRealtor={onSendRealtor}
          currency={currency}
          onChangeCurrency={onChangeCurrency}
          onClose={onClose}
          loading={loading}
          onPhotoView={handleOpenPhotoView}
          disabled={disabled}
          phonesCodes={phonesCodes}
        />
      </StyledCards>
    </>
  );
};

interface StyledCardsProps {
  isEmpty: boolean;
}

const StyledCards = styled.div<StyledCardsProps>`
  height: calc(100svh - 80px);
  width: 100%;
  margin-bottom: 15px;
  border-radius: 13px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  overflow-x: hidden;
  ${({ isEmpty }) =>
    isEmpty &&
    `
  border: 1px dashed rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.3);
  `}
  ::-webkit-scrollbar {
    display: none;
  }
  &.loading-cards {
    opacity: 0;
  }
`;
